"use client";

import React from "react";

type Props = {
  subject?: string;
  className?: string;
  children: React.ReactNode;
};

export default function OpenContactButton({
  subject,
  className,
  children,
}: Props) {
  const handle = () =>
    window.dispatchEvent(
      new CustomEvent("open-contact", { detail: { subject } })
    );

  return (
    <button type="button" className={className} onClick={handle}>
      {children}
    </button>
  );
}
