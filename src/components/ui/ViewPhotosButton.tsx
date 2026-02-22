"use client";

import { isValidUrl } from "@/lib/url-helpers";

interface ViewPhotosButtonProps {
  url: string | null | undefined;
}

export function ViewPhotosButton({ url }: ViewPhotosButtonProps) {
  if (!url || !isValidUrl(url)) {
    return null;
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="v2-see-all-button"
    >
      VIEW PHOTOS
    </a>
  );
}
