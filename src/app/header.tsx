"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import NavItem from "../components/NavItem";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    // detect desktop (wide + fine pointer). Avoid hiding native scrollbar on desktop
    // to prevent layout shift of header/nav.
    const isDesktop = window.matchMedia(
      "(min-width: 1024px) and (pointer: fine)"
    ).matches;
    let didLock = false;
    let onTouchMove: ((e: TouchEvent) => void) | null = null;
    if (!isDesktop) {
      document.body.style.overflow = "hidden";
      didLock = true;

      onTouchMove = (e: TouchEvent) => {
        e.preventDefault();
      };
      window.addEventListener("touchmove", onTouchMove, { passive: false });
    }

    return () => {
      if (didLock) document.body.style.overflow = prev;
      if (onTouchMove)
        window.removeEventListener("touchmove", onTouchMove as EventListener);
    };
  }, [menuOpen]);

  // attach swipe-to-close directly to overlay for consistent behavior on mobile
  useEffect(() => {
    if (!menuOpen) return;
    const overlay = document.querySelector<HTMLDivElement>(
      ".mobile-menu-overlay"
    );
    if (!overlay) return;

    let start: { x: number; y: number } | null = null;
    const onTouchStart = (e: TouchEvent) => {
      const t = e.touches?.[0];
      if (!t) return;
      start = { x: t.clientX, y: t.clientY };
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!start) return;
      const t = e.touches?.[0];
      if (!t) return;
      const dx = t.clientX - start.x;
      const dy = t.clientY - start.y;
      const threshold = 40;
      if (Math.abs(dy) > threshold && Math.abs(dy) > Math.abs(dx)) {
        setMenuOpen(false);
        start = null;
      }
    };

    overlay.addEventListener("touchstart", onTouchStart, { passive: true });
    overlay.addEventListener("touchmove", onTouchMove, { passive: true });

    return () => {
      overlay.removeEventListener("touchstart", onTouchStart as EventListener);
      overlay.removeEventListener("touchmove", onTouchMove as EventListener);
      start = null;
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      if (menuOpen) setMenuOpen(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [menuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled ? "backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <nav className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto relative z-50">
        {/* Logo + title */}
        <Link
          href="/"
          className="flex items-center space-x-3 group relative z-50"
          onClick={() => setMenuOpen(false)}
        >
          <div className="relative w-10 h-10 md:w-14 md:h-14">
            <Image
              src="/stamps/stamp_white.png"
              alt="Logo La forge de Graba - poinçon artisanal"
              fill
              className="object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="text-xl md:text-2xl font-cinzel tracking-wide group-hover:text-copper transition-colors">
            La forge de <span className="text-copper">Graba</span>
          </div>
        </Link>

        {/* Right cluster: desktop nav + socials; mobile toggle */}
        <div className="flex items-center gap-3">
          {/* Desktop menu */}
          <ul className="hidden md:flex items-center space-x-6 text-sm">
            <li>
              <NavItem href="/creations">Créations</NavItem>
            </li>
            <li>
              <NavItem href="/stages">Stages</NavItem>
            </li>
            <li>
              <NavItem
                onClick={() =>
                  window.dispatchEvent(
                    new CustomEvent("open-contact", { detail: {} })
                  )
                }
              >
                Contact
              </NavItem>
            </li>
          </ul>

          {/* Socials desktop (tight spacing) */}
          <div className="hidden md:flex items-center gap-2 text-copper ml-2">
            {/* Instagram */}
            <a
              href="https://www.instagram.com/grabaistos/"
              aria-label="Instagram - La forge de Graba"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="26"
                height="26"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="3" width="18" height="18" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.5" y2="6.5" />
              </svg>
            </a>
            {/* Facebook */}
            <a
              href="https://www.facebook.com/p/Graba%C3%AFstos-100071274200419/"
              aria-label="Facebook - La forge de Graba"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="26"
                height="26"
                fill="currentColor"
              >
                <path d="M22 12a10 10 0 1 0-11.6 9.9v-7h-2.3V12h2.3V9.8c0-2.3 1.4-3.6 3.5-3.6 1 0 2 .2 2 .2v2.2h-1.1c-1.1 0-1.4.7-1.4 1.3V12h2.4l-.4 2.9h-2v7A10 10 0 0 0 22 12z" />
              </svg>
            </a>
            {/* Threads (SVG from /public/socials/threads.svg) */}
            <a
              href="https://www.threads.com/@grabaistos?xmt=AQF0Sjb68iko5e4sI8_UDWVNym6LDC_X8mCY-pIdkmNnzlM"
              aria-label="Threads - La forge de Graba"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              <svg
                aria-label="Threads"
                viewBox="0 0 192 192"
                width="22"
                height="22"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="currentColor"
                  d="M141.537 88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C97.4484 44.7443 97.3355 44.7443 97.222 44.7443C82.2364 44.7443 69.7731 51.1409 62.102 62.7807L75.881 72.2328C81.6116 63.5383 90.6052 61.6848 97.2286 61.6848C97.3051 61.6848 97.3819 61.6848 97.4576 61.6855C105.707 61.7381 111.932 64.1366 115.961 68.814C118.893 72.2193 120.854 76.925 121.825 82.8638C114.511 81.6207 106.601 81.2385 98.145 81.7233C74.3247 83.0954 59.0111 96.9879 60.0396 116.292C60.5615 126.084 65.4397 134.508 73.775 140.011C80.8224 144.663 89.899 146.938 99.3323 146.423C111.79 145.74 121.563 140.987 128.381 132.296C133.559 125.696 136.834 117.143 138.28 106.366C144.217 109.949 148.617 114.664 151.047 120.332C155.179 129.967 155.42 145.8 142.501 158.708C131.182 170.016 117.576 174.908 97.0135 175.059C74.2042 174.89 56.9538 167.575 45.7381 153.317C35.2355 139.966 29.8077 120.682 29.6052 96C29.8077 71.3178 35.2355 52.0336 45.7381 38.6827C56.9538 24.4249 74.2039 17.11 97.0132 16.9405C119.988 17.1113 137.539 24.4614 149.184 38.788C154.894 45.8136 159.199 54.6488 162.037 64.9503L178.184 60.6422C174.744 47.9622 169.331 37.0357 161.965 27.974C147.036 9.60668 125.202 0.195148 97.0695 0H96.9569C68.8816 0.19447 47.2921 9.6418 32.7883 28.0793C19.8819 44.4864 13.2244 67.3157 13.0007 95.9325L13 96L13.0007 96.0675C13.2244 124.684 19.8819 147.514 32.7883 163.921C47.2921 182.358 68.8816 191.806 96.9569 192H97.0695C122.03 191.827 139.624 185.292 154.118 170.811C173.081 151.866 172.51 128.119 166.26 113.541C161.776 103.087 153.227 94.5962 141.537 88.9883ZM98.4405 129.507C88.0005 130.095 77.1544 125.409 76.6196 115.372C76.2232 107.93 81.9158 99.626 99.0812 98.6368C101.047 98.5234 102.976 98.468 104.871 98.468C111.106 98.468 116.939 99.0737 122.242 100.233C120.264 124.935 108.662 128.946 98.4405 129.507Z"
                />
              </svg>
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden z-50 text-white"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile overlay menu using portal + AnimatePresence */}
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                className="fixed inset-0 z-40 flex items-center justify-center bg-black/90 backdrop-blur-md mobile-menu-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                onClick={() => setMenuOpen(false)}
              >
                <motion.div
                  className="flex flex-col items-center space-y-8 text-2xl font-cinzel text-white"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <NavItem href="/creations" onClick={() => setMenuOpen(false)}>
                    Créations
                  </NavItem>
                  <NavItem href="/stages" onClick={() => setMenuOpen(false)}>
                    Stages
                  </NavItem>
                  <NavItem
                    onClick={() => {
                      window.dispatchEvent(
                        new CustomEvent("open-contact", { detail: {} })
                      );
                      setMenuOpen(false);
                    }}
                  >
                    Contact
                  </NavItem>
                  {/* Socials mobile */}
                  <div className="pt-2 flex items-center gap-8 text-copper">
                    {/* Instagram */}
                    <a
                      href="https://www.instagram.com/grabaistos/"
                      aria-label="Instagram - La forge de Graba"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="32"
                        height="32"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect
                          x="3"
                          y="3"
                          width="18"
                          height="18"
                          rx="5"
                          ry="5"
                        />
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                        <line x1="17.5" y1="6.5" x2="17.5" y2="6.5" />
                      </svg>
                    </a>
                    {/* Facebook */}
                    <a
                      href="https://www.facebook.com/p/Graba%C3%AFstos-100071274200419/"
                      aria-label="Facebook - La forge de Graba"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="32"
                        height="32"
                        fill="currentColor"
                      >
                        <path d="M22 12a10 10 0 1 0-11.6 9.9v-7h-2.3V12h2.3V9.8c0-2.3 1.4-3.6 3.5-3.6 1 0 2 .2 2 .2v2.2h-1.1c-1.1 0-1.4.7-1.4 1.3V12h2.4l-.4 2.9h-2v7A10 10 0 0 0 22 12z" />
                      </svg>
                    </a>
                    {/* Threads (SVG from /public/socials/threads.svg) */}
                    <a
                      href="https://www.threads.com/@grabaistos?xmt=AQF0Sjb68iko5e4sI8_UDWVNym6LDC_X8mCY-pIdkmNnzlM"
                      aria-label="Threads - La forge de Graba"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors"
                    >
                      <svg
                        aria-label="Threads"
                        viewBox="0 0 192 192"
                        width="28"
                        height="28"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill="currentColor"
                          d="M141.537 88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C97.4484 44.7443 97.3355 44.7443 97.222 44.7443C82.2364 44.7443 69.7731 51.1409 62.102 62.7807L75.881 72.2328C81.6116 63.5383 90.6052 61.6848 97.2286 61.6848C97.3051 61.6848 97.3819 61.6848 97.4576 61.6855C105.707 61.7381 111.932 64.1366 115.961 68.814C118.893 72.2193 120.854 76.925 121.825 82.8638C114.511 81.6207 106.601 81.2385 98.145 81.7233C74.3247 83.0954 59.0111 96.9879 60.0396 116.292C60.5615 126.084 65.4397 134.508 73.775 140.011C80.8224 144.663 89.899 146.938 99.3323 146.423C111.79 145.74 121.563 140.987 128.381 132.296C133.559 125.696 136.834 117.143 138.28 106.366C144.217 109.949 148.617 114.664 151.047 120.332C155.179 129.967 155.42 145.8 142.501 158.708C131.182 170.016 117.576 174.908 97.0135 175.059C74.2042 174.89 56.9538 167.575 45.7381 153.317C35.2355 139.966 29.8077 120.682 29.6052 96C29.8077 71.3178 35.2355 52.0336 45.7381 38.6827C56.9538 24.4249 74.2039 17.11 97.0132 16.9405C119.988 17.1113 137.539 24.4614 149.184 38.788C154.894 45.8136 159.199 54.6488 162.037 64.9503L178.184 60.6422C174.744 47.9622 169.331 37.0357 161.965 27.974C147.036 9.60668 125.202 0.195148 97.0695 0H96.9569C68.8816 0.19447 47.2921 9.6418 32.7883 28.0793C19.8819 44.4864 13.2244 67.3157 13.0007 95.9325L13 96L13.0007 96.0675C13.2244 124.684 19.8819 147.514 32.7883 163.921C47.2921 182.358 68.8816 191.806 96.9569 192H97.0695C122.03 191.827 139.624 185.292 154.118 170.811C173.081 151.866 172.51 128.119 166.26 113.541C161.776 103.087 153.227 94.5962 141.537 88.9883ZM98.4405 129.507C88.0005 130.095 77.1544 125.409 76.6196 115.372C76.2232 107.93 81.9158 99.626 99.0812 98.6368C101.047 98.5234 102.976 98.468 104.871 98.468C111.106 98.468 116.939 99.0737 122.242 100.233C120.264 124.935 108.662 128.946 98.4405 129.507Z"
                        />
                      </svg>
                    </a>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </header>
  );
}
