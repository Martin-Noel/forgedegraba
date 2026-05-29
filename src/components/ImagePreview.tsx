"use client";

import React from "react";
import Image from "next/image";

export type GalleryItem = { src: string; alt: string; rotate90?: boolean };

type Props = {
  src: string;
  alt: string;
  gallery?: GalleryItem[];
  galleryIndex?: number;
  className?: string;
  rotate90?: boolean;
};

export default function ImagePreview({
  src,
  alt = "",
  gallery,
  galleryIndex,
  className = "",
  rotate90 = false,
}: Props) {
  const open = () => {
    window.dispatchEvent(
      new CustomEvent("open-image", {
        detail: { src, alt, rotate90, gallery: gallery ?? [], galleryIndex: galleryIndex ?? 0 },
      })
    );
  };

  return (
    <button
      type="button"
      onClick={open}
      className={`relative block w-full overflow-hidden ${
        rotate90 ? "rotate-knife" : ""
      } ${className}`}
      aria-label={`Agrandir ${alt}`}
      title={`Agrandir ${alt}`}
      style={{
        cursor: "zoom-in",
        ...(rotate90 ? { aspectRatio: "1 / 1" } : { minHeight: 220 }),
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 639px) 72vw, 33vw"
        className={`object-contain ${rotate90 ? "rotated-90" : ""}`}
      />
    </button>
  );
}
