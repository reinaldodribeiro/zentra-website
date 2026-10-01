"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Deferred } from "@/components/ui/Deferred";
import {
  gaCookieExpirations,
  isPosthogStorageKey,
  measurementConfig,
  type MeasurementConfig,
} from "@/lib/measurement";
import { isEventName, registerSink, track, trackPageview, unregisterSink, type EventOrigin, type Sink } from "@/lib/track";

declare global {
  interface Window {
    dataLayer: unknown[];
  }
}

const START_DELAY_MS = 2500;

const config = measurementConfig({
  posthogKey: process.env.NEXT_PUBLIC_POSTHOG_KEY,
  posthogHost: process.env.NEXT_PUBLIC_POSTHOG_HOST,
  gaId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
});

const gtag = function () {
  // eslint-disable-next-line prefer-rest-params
  window.dataLayer.push(arguments);
} as (...args: unknown[]) => void;

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

async function startMeasurement({ posthogKey, posthogHost, gaId }: MeasurementConfig): Promise<() => void> {
  const { default: posthog } = await import("posthog-js");
  posthog.init(posthogKey, {
    api_host: posthogHost || "https://eu.i.posthog.com",
    persistence: "localStorage",
    autocapture: false,
    capture_pageview: false,
    capture_pageleave: false,
    person_profiles: "identified_only",
    respect_dnt: true,
    disable_session_recording: true,
  });
  posthog.opt_in_capturing();

  window.dataLayer = window.dataLayer ?? [];
  gtag("js", new Date());
  gtag("consent", "default", {
    analytics_storage: "granted",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  gtag("consent", "update", { analytics_storage: "granted" });
  gtag("config", gaId, { send_page_view: false });

  const sink: Sink = {
    event: (name, props) => {
      posthog.capture(name, props);
      gtag("event", name, props);
    },
    pageview: (path) => {
      posthog.capture("$pageview", { $current_url: window.location.href, pagina: path });
      gtag("event", "page_view", { page_path: path, page_location: window.location.href });
    },
  };
  registerSink(sink);
  document.addEventListener("click", onClick);

  return () => {
    document.removeEventListener("click", onClick);
    unregisterSink(sink);
    posthog.opt_out_capturing();
    posthog.reset();
    gtag("consent", "update", { analytics_storage: "denied" });
    clearGaCookies();
    clearPosthogStorage();
  };
}

function MeasurementRuntime({ settings }: { settings: MeasurementConfig }) {
  const pathname = usePathname();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let active = true;
    let stop: (() => void) | null = null;
    startMeasurement(settings).then((teardown) => {
      if (!active) {
        teardown();
        return;
      }
      stop = teardown;
      setReady(true);
    });
    return () => {
      active = false;
      setReady(false);
      stop?.();
    };
  }, [settings]);

  useEffect(() => {
    if (ready) trackPageview(pathname);
  }, [ready, pathname]);

  return (
    <Script src={`https://www.googletagmanager.com/gtag/js?id=${settings.gaId}`} strategy="lazyOnload" />
  );
}

const loadRuntime = () => Promise.resolve(MeasurementRuntime);

export function Measurement() {
  if (!config) return null;
  return <Deferred load={loadRuntime} props={{ settings: config }} delayMs={START_DELAY_MS} />;
}
