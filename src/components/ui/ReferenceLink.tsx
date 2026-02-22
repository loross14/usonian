import { getSourceName } from "@/lib/url-helpers";

interface ReferenceLinkProps {
  url: string;
  label?: string;
  variant?: "default" | "compact";
}

export function ReferenceLink({ url, label, variant = "default" }: ReferenceLinkProps) {
  const sourceName = label || getSourceName(url);

  if (variant === "compact") {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-[10px] tracking-[0.1em] opacity-60 hover:opacity-100 transition-opacity"
      >
        <span className="uppercase">{sourceName}</span>
        <ExternalLinkIcon />
      </a>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center justify-between gap-4 py-3 px-4 border border-black/20 hover:border-black hover:bg-black/[0.02] transition-all"
    >
      <span className="text-xs tracking-[0.05em] uppercase font-bold group-hover:underline underline-offset-4">
        {sourceName}
      </span>
      <ExternalLinkIcon />
    </a>
  );
}

function ExternalLinkIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="opacity-40 group-hover:opacity-100 transition-opacity"
    >
      <path
        d="M10.5 1.5L1.5 10.5M10.5 1.5H4.5M10.5 1.5V7.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
