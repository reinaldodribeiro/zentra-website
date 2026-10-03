import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const lineProps = {
  viewBox: "0 0 48 48",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

export function WhatsAppIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2Zm0 18.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.22 8.22 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 4.54 0 8.24 3.7 8.24 8.24 0 4.55-3.7 8.24-8.24 8.24Zm4.52-6.17c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.78.98-.15.16-.29.18-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.43.12-.15.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.42h-.48c-.17 0-.43.06-.66.31-.22.25-.86.84-.86 2.05 0 1.21.88 2.38 1 2.55.13.16 1.74 2.65 4.21 3.72.59.25 1.05.41 1.41.52.59.19 1.13.16 1.55.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.07-.1-.23-.16-.48-.29Z" />
    </svg>
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M4 12h16m0 0-6-6m6 6-6 6" />
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </svg>
  );
}

export function TargetIcon(props: IconProps) {
  return (
    <svg {...lineProps} {...props}>
      <circle cx="24" cy="24" r="18" />
      <circle cx="24" cy="24" r="11.5" />
      <circle cx="24" cy="24" r="5" stroke="var(--gold)" />
      <path d="M24 3v7M24 38v7M3 24h7M38 24h7" />
    </svg>
  );
}

export function SheetIcon(props: IconProps) {
  return (
    <svg {...lineProps} {...props}>
      <rect x="7" y="6" width="34" height="36" rx="3" />
      <path d="M7 16h34M7 26h34M7 35h34M19 16v26" />
      <path d="M23 26h14" stroke="var(--gold)" strokeWidth={2.5} />
    </svg>
  );
}

export function StampIcon(props: IconProps) {
  return (
    <svg {...lineProps} {...props}>
      <circle cx="24" cy="24" r="18" />
      <circle cx="24" cy="24" r="13" strokeDasharray="2 3" />
      <path d="m16.5 24.5 5 5 10-11" stroke="var(--gold)" strokeWidth={2} />
    </svg>
  );
}

export function PlusIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <svg {...lineProps} {...props}>
      <rect x="14" y="4" width="20" height="40" rx="4" />
      <path d="M21 9h6" />
      <circle cx="24" cy="37" r="1.5" stroke="var(--gold)" />
      <path d="M19 20h10M19 26h10" stroke="var(--gold)" strokeWidth={2.5} />
    </svg>
  );
}

export function BuildingIcon(props: IconProps) {
  return (
    <svg {...lineProps} {...props}>
      <rect x="9" y="6" width="22" height="36" rx="2" />
      <path d="M31 18h8v24H9M15 14h10M15 22h10M15 30h10" />
      <path d="M21 42v-6" stroke="var(--gold)" strokeWidth={2.5} />
    </svg>
  );
}

export function LayersIcon(props: IconProps) {
  return (
    <svg {...lineProps} {...props}>
      <path d="m24 6 18 9-18 9-18-9 18-9Z" />
      <path d="m6 24 18 9 18-9M6 33l18 9 18-9" />
      <path d="m15 15 9 4.5 9-4.5" stroke="var(--gold)" />
    </svg>
  );
}

export function KeyIcon(props: IconProps) {
  return (
    <svg {...lineProps} {...props}>
      <circle cx="16" cy="24" r="9" />
      <path d="M25 24h18M36 24v7M42 24v5" />
      <circle cx="16" cy="24" r="3" stroke="var(--gold)" />
    </svg>
  );
}

export function ContractIcon(props: IconProps) {
  return (
    <svg {...lineProps} {...props}>
      <path d="M12 5h17l9 9v29H12V5Z" />
      <path d="M29 5v9h9M18 22h14M18 29h14" />
      <path d="M18 36h8" stroke="var(--gold)" strokeWidth={2.5} />
    </svg>
  );
}

export function ShieldIcon(props: IconProps) {
  return (
    <svg {...lineProps} {...props}>
      <path d="M24 4 8 10v12c0 10 7 18 16 22 9-4 16-12 16-22V10L24 4Z" />
      <path d="m17 24 5 5 9-10" stroke="var(--gold)" strokeWidth={2} />
    </svg>
  );
}

export function ClockIcon(props: IconProps) {
  return (
    <svg {...lineProps} {...props}>
      <circle cx="24" cy="24" r="18" />
      <path d="M24 12v12l8 5" />
      <path d="M24 24h0" stroke="var(--gold)" strokeWidth={3} />
    </svg>
  );
}

export function BriefcaseIcon(props: IconProps) {
  return (
    <svg {...lineProps} {...props}>
      <rect x="6" y="14" width="36" height="26" rx="3" />
      <path d="M17 14v-4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v4M6 26h36" />
      <path d="M21 26v4h6v-4" stroke="var(--gold)" strokeWidth={2} />
    </svg>
  );
}

export function BankIcon(props: IconProps) {
  return (
    <svg {...lineProps} {...props}>
      <path d="m6 18 18-11 18 11H6Z" />
      <path d="M10 22v14M19 22v14M29 22v14M38 22v14M6 41h36" />
      <path d="M24 13h0" stroke="var(--gold)" strokeWidth={3} />
    </svg>
  );
}

export function ScaleIcon(props: IconProps) {
  return (
    <svg {...lineProps} {...props}>
      <path d="M24 7v33M14 40h20M10 14h28" />
      <path d="m10 14-6 13a6 6 0 0 0 12 0l-6-13Zm28 0-6 13a6 6 0 0 0 12 0l-6-13Z" />
      <circle cx="24" cy="7" r="1.5" stroke="var(--gold)" />
    </svg>
  );
}

export function CoinsIcon(props: IconProps) {
  return (
    <svg {...lineProps} {...props}>
      <ellipse cx="20" cy="13" rx="12" ry="5" />
      <path d="M8 13v10c0 2.8 5.4 5 12 5M8 23v10c0 2.8 5.4 5 12 5" />
      <circle cx="31" cy="30" r="10" />
      <path d="M31 25v10M27.5 28.5h5a1.8 1.8 0 0 1 0 3.5h-5" stroke="var(--gold)" strokeWidth={2} />
    </svg>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg {...lineProps} {...props}>
      <rect x="6" y="6" width="36" height="36" rx="10" />
      <circle cx="24" cy="24" r="8.5" />
      <circle cx="34" cy="14" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function SpeechIcon(props: IconProps) {
  return (
    <svg {...lineProps} {...props}>
      <path d="M8 10h32a3 3 0 0 1 3 3v19a3 3 0 0 1-3 3H22l-9 8v-8H8a3 3 0 0 1-3-3V13a3 3 0 0 1 3-3Z" />
      <path d="M16 20h16M16 26h9" stroke="var(--gold)" strokeWidth={2.5} />
    </svg>
  );
}

export function DeviceIcon(props: IconProps) {
  return (
    <svg {...lineProps} {...props}>
      <rect x="4" y="9" width="30" height="21" rx="3" />
      <path d="M13 38h12M19 30v8" />
      <rect x="32" y="18" width="12" height="22" rx="3" />
      <path d="M36 22h4" stroke="var(--gold)" strokeWidth={2.5} />
    </svg>
  );
}
