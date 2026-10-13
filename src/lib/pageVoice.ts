import { usePathname } from "next/navigation";
import { useSyncExternalStore } from "react";
import { voiceForPath, voices, type VoiceKey } from "@/content/voices";

const keys = Object.keys(voices) as VoiceKey[];

function subscribe(): () => void {
  return () => {};
}

export function readPageVoice(pathname: string): VoiceKey {
  const value = document.querySelector<HTMLElement>("[data-whatsapp-float]")?.dataset.voice;
  return keys.includes(value as VoiceKey) ? (value as VoiceKey) : voiceForPath(pathname);
}

export function usePageVoice(): VoiceKey {
  const pathname = usePathname();
  return useSyncExternalStore(
    subscribe,
    () => readPageVoice(pathname),
    () => voiceForPath(pathname),
  );
}
