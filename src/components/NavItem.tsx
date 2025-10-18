"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

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
  const base = "nav-item uppercase tracking-wider cursor-pointer";
  const pathname = usePathname();

  if (href) {
    // consider active when pathname equals href or starts with href (for subroutes)
    const isActive =
      pathname === href ||
      pathname === href + "/" ||
      pathname?.startsWith(href + "/");
    return (
      <Link
        href={href}
        onClick={onClick}
        className={`${base} ${
          isActive ? "opacity-100" : "opacity-90"
        } ${className}`}
        aria-current={isActive ? "page" : undefined}
      >
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
