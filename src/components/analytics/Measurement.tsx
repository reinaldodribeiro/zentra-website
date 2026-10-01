"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useCookieConsent } from "@/components/consent/CookieConsentProvider";
import { Deferred } from "@/components/ui/Deferred";
import {
  gaConsent,
  gaCookieExpirations,
  gaMeasurementId,
  isPosthogStorageKey,
  posthogConfig,
  type PosthogConfig,
} from "@/lib/measurement";
import { isEventName, registerSink, track, unregisterSink, type EventOrigin, type Sink } from "@/lib/track";

declare global {
  interface Window {
    dataLayer: unknown[];
  }
}

const START_DELAY_MS = 2500;

const env = {
  posthogKey: process.env.NEXT_PUBLIC_POSTHOG_KEY,
  posthogHost: process.env.NEXT_PUBLIC_POSTHOG_HOST,
  gaId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
};

const gaId = gaMeasurementId(env);
const posthogSettings = posthogConfig(env);

const gtag = function () {
  // eslint-disable-next-line prefer-rest-params
  window.dataLayer.push(arguments);
} as (...args: unknown[]) => void;

let clickListeners = 0;

function clearGaCookies() {
  for (const line of gaCookieExpirations(document.cookie, window.location.hostname)) document.cookie = line;
}

function clearPosthogStorage() {
  for (const storage of [window.localStorage, window.sessionStorage]) {
    for (const key of Object.keys(storage).filter(isPosthogStorageKey)) storage.removeItem(key);
  }
}

function onClick(event: MouseEvent) {
  if (!(event.target instanceof Element)) return;
  if (event.target.closest("[data-whatsapp-float]")) {
    track("whatsapp_flutuante_clicado", { origem: "flutuante" });
    return;
  }
  const marked = event.target.closest<HTMLElement>("[data-track]");
  const name = marked?.dataset.track;
  if (isEventName(name)) track(name, { origem: marked?.dataset.trackOrigin as EventOrigin | undefined });
}

function listenClicks(): () => void {
  if (clickListeners++ === 0) document.addEventListener("click", onClick);
  return () => {
    if (--clickListeners === 0) document.removeEventListener("click", onClick);
  };
}

function useSinkPageviews(sink: Sink | null) {
  const pathname = usePathname();
  useEffect(() => {
    if (sink) sink.pageview(pathname);
  }, [sink, pathname]);
}

const gaSink: Sink = {
  event: (name, props) => gtag("event", name, props),
  pageview: (path) => gtag("event", "page_view", { page_path: path, page_location: window.location.href }),
};

function GoogleAnalyticsRuntime({ measurementId }: { measurementId: string }) {
  const { isAllowed } = useCookieConsent();
  const allowed = isAllowed("analytics");

  useEffect(() => {
    window.dataLayer = window.dataLayer ?? [];
    gtag("consent", "default", gaConsent(false));
    gtag("set", "ads_data_redaction", true);
    gtag("js", new Date());
    gtag("config", measurementId, { send_page_view: false });
    registerSink(gaSink);
    const stopClicks = listenClicks();
    return () => {
      stopClicks();
      unregisterSink(gaSink);
    };
  }, [measurementId]);

  useEffect(() => {
    gtag("consent", "update", gaConsent(allowed));
    if (!allowed) clearGaCookies();
  }, [allowed]);

  useSinkPageviews(gaSink);

  return <Script src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} strategy="lazyOnload" />;
}

async function startPosthog({ posthogKey, posthogHost }: PosthogConfig): Promise<{ sink: Sink; stop: () => void }> {
  const { default: posthog } = await import("posthog-js");
  posthog.init(posthogKey, {
    api_host: posthogHost,
    persistence: "localStorage",
    autocapture: false,
    capture_pageview: false,
    capture_pageleave: false,
    person_profiles: "identified_only",
    respect_dnt: true,
    disable_session_recording: true,
  });
  posthog.opt_in_capturing();

  const sink: Sink = {
    event: (name, props) => posthog.capture(name, props),
    pageview: (path) => posthog.capture("$pageview", { $current_url: window.location.href, pagina: path }),
  };
  registerSink(sink);
  const stopClicks = listenClicks();

  return {
    sink,
    stop: () => {
      stopClicks();
      unregisterSink(sink);
      posthog.opt_out_capturing();
      posthog.reset();
      clearPosthogStorage();
    },
  };
}

function ProductAnalyticsRuntime({ settings }: { settings: PosthogConfig }) {
  const [sink, setSink] = useState<Sink | null>(null);

  useEffect(() => {
    let active = true;
    let stop: (() => void) | null = null;
    startPosthog(settings).then((started) => {
      if (!active) {
        started.stop();
        return;
      }
      stop = started.stop;
      setSink(started.sink);
    });
    return () => {
      active = false;
      setSink(null);
      stop?.();
    };
  }, [settings]);

  useSinkPageviews(sink);

  return null;
}

const loadGoogleAnalytics = () => Promise.resolve(GoogleAnalyticsRuntime);
const loadProductAnalytics = () => Promise.resolve(ProductAnalyticsRuntime);

export function GoogleAnalytics() {
  if (!gaId) return null;
  return <Deferred load={loadGoogleAnalytics} props={{ measurementId: gaId }} delayMs={START_DELAY_MS} />;
}

export function ProductAnalytics() {
  if (!posthogSettings) return null;
  return <Deferred load={loadProductAnalytics} props={{ settings: posthogSettings }} delayMs={START_DELAY_MS} />;
}
