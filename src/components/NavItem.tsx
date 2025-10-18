"use client";

import Link from "next/link";
import React from "react";

type Props = {
  href?: string;
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
};

export default function NavItem({
  href,
  onClick,
  className = "",
  children,
}: Props) {
  const base = "hover:text-copper uppercase tracking-wider cursor-pointer";
  if (href) {
    return (
      <Link href={href} className={`${base} ${className}`}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={`${base} ${className}`}>
      {children}
    </button>
  );
}
