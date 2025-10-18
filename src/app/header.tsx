"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
              alt="stamp"
              fill
              className="object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <h1 className="text-xl md:text-2xl font-cinzel tracking-wide group-hover:text-copper transition-colors">
            La forge de <span className="text-copper">graba</span>
          </h1>
        </Link>

        {/* Desktop menu */}
        <ul className="hidden md:flex space-x-8 text-sm uppercase tracking-wider">
          {["Savoir-faire", "Créations", "Atelier", "Stages", "Contact"].map(
            (item) => (
              <li key={item}>
                {item != "Stages" ? (
                  <Link
                    href={`#${item
                      .toLowerCase()
                      .replace("é", "e")
                      .replace(" ", "-")}`}
                    className="hover:text-copper"
                  >
                    {item}
                  </Link>
                ) : (
                  <Link href="/stages" className="hover:text-copper">
                    {item}
                  </Link>
                )}
              </li>
            )
          )}
        </ul>

        {/* Mobile menu button */}
        <button
          className="md:hidden z-50 text-white"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile overlay menu using portal + AnimatePresence */}
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                className="fixed inset-0 z-40 flex items-center justify-center bg-black/90 backdrop-blur-md"
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
                  {[
                    "Savoir-faire",
                    "Créations",
                    "Atelier",
                    "Stages",
                    "Contact",
                  ].map((item) =>
                    item !== "Stages" ? (
                      <Link
                        key={item}
                        href={`#${item
                          .toLowerCase()
                          .replace("é", "e")
                          .replace(" ", "-")}`}
                        className="hover:text-copper"
                        onClick={() => setMenuOpen(false)}
                      >
                        {item}
                      </Link>
                    ) : (
                      <Link
                        key={item}
                        href="/stages"
                        className="hover:text-copper"
                        onClick={() => setMenuOpen(false)}
                      >
                        {item}
                      </Link>
                    )
                  )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </header>
  );
}
