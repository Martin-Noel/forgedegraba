"use client";

import React from "react";
import Image from "next/image";

type Props = {
  src: string;
  alt?: string;
  className?: string;
  rotate90?: boolean;
};

export default function ImagePreview({
  src,
  alt = "",
  className = "",
  rotate90 = false,
}: Props) {
  const open = () => {
    window.dispatchEvent(
      new CustomEvent("open-image", { detail: { src, alt, rotate90 } })
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
      {/* hidden native img for gallery src discovery by ImageModal */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" aria-hidden="true" className="sr-only" />
    </button>
  );
}
