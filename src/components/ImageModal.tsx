"use client";

import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function ImageModal() {
  const [open, setOpen] = useState(false);
  const [src, setSrc] = useState<string | null>(null);
  const [alt, setAlt] = useState<string | null>(null);
  const [gallery, setGallery] = useState<string[]>([]);
  const [index, setIndex] = useState<number | null>(null);

  const openHandler = useCallback((e: Event) => {
    const detail = (e as CustomEvent).detail || {};
    const s = detail.src || null;
    const a = detail.alt || null;

    // Prefer hidden native imgs (sr-only) we add in previews so we get original public paths
    let nodeList = Array.from(
      document.querySelectorAll<HTMLImageElement>(".creation-card img.sr-only")
    );
    if (nodeList.length === 0) {
      // fallback to any img under creation-card (may be Next/Image optimized URL)
      nodeList = Array.from(
        document.querySelectorAll<HTMLImageElement>(".creation-card img")
      );
    }
    const imgs = nodeList.map((i) => i.src).filter(Boolean);

    let idx: number | null = null;
    if (s && imgs.length > 0) {
      idx = imgs.indexOf(s);
      if (idx === -1) idx = null;
    }

    if (imgs.length > 0) setGallery(imgs);
    else setGallery([]);

    setSrc(s);
    setAlt(a);
    setIndex(idx);
    setOpen(true);
  }, []);

  useEffect(() => {
    window.addEventListener("open-image", openHandler as EventListener);
    return () =>
      window.removeEventListener("open-image", openHandler as EventListener);
  }, [openHandler]);

  // lock body scroll while modal is open and close on vertical swipe
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    const isDesktop = window.matchMedia(
      "(min-width: 1024px) and (pointer: fine)"
    ).matches;
    let didLock = false;
    if (!isDesktop) {
      document.body.style.overflow = "hidden";
      didLock = true;

      // prevent page scrolling while touching inside modal
      const onTouchMoveDoc = (e: TouchEvent) => {
        // when modal open, prevent default vertical scroll
        e.preventDefault();
      };
      window.addEventListener("touchmove", onTouchMoveDoc, { passive: false });

      return () => {
        if (didLock) document.body.style.overflow = prev;
        window.removeEventListener(
          "touchmove",
          onTouchMoveDoc as EventListener
        );
      };
    }
    return () => {
      if (didLock) document.body.style.overflow = prev;
    };
  }, [open]);

  // keyboard handling
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      else if (e.key === "ArrowLeft") {
        if (gallery.length > 0 && index != null) {
          const next = Math.max(0, index - 1);
          setIndex(next);
          setSrc(gallery[next]);
        }
      } else if (e.key === "ArrowRight") {
        if (gallery.length > 0 && index != null) {
          const next = Math.min(gallery.length - 1, index + 1);
          setIndex(next);
          setSrc(gallery[next]);
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, gallery, index]);

  const showPrev = () => {
    if (!gallery.length || index == null) return;
    const next = Math.max(0, index - 1);
    setIndex(next);
    setSrc(gallery[next]);
  };

  const showNext = () => {
    if (!gallery.length || index == null) return;
    const next = Math.min(gallery.length - 1, index + 1);
    setIndex(next);
    setSrc(gallery[next]);
  };

  // close on vertical swipe (mobile): track touchstart and detect vertical swipe
  const touchStartRef = React.useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (!open) return;

    const onTouchStart = (e: TouchEvent) => {
      if (!e.touches || e.touches.length === 0) return;
      const t = e.touches[0];
      touchStartRef.current = { x: t.clientX, y: t.clientY };
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!touchStartRef.current) return;
      if (!e.touches || e.touches.length === 0) return;
      const t = e.touches[0];
      const dx = t.clientX - touchStartRef.current.x;
      const dy = t.clientY - touchStartRef.current.y;

      // If vertical movement is dominant and beyond threshold, close modal
      const threshold = 40; // pixels
      if (Math.abs(dy) > threshold && Math.abs(dy) > Math.abs(dx)) {
        setOpen(false);
        touchStartRef.current = null;
      }
    };

    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    return () => {
      window.removeEventListener("touchstart", onTouchStart as EventListener);
      window.removeEventListener("touchmove", onTouchMove as EventListener);
      touchStartRef.current = null;
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && src && (
        <motion.div
          key="image-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.97 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative w-full max-w-[95vw] h-[85vh] max-h-[95vh]"
            onClick={() => setOpen(false)}
          >
            <button
              className="absolute right-2 top-2 text-white bg-black/40 rounded-full p-2 z-20"
              aria-label="Fermer"
              onClick={() => setOpen(false)}
            >
              ✕
            </button>

            {gallery.length > 0 && index != null && gallery.length > 1 && (
              <>
                <button
                  aria-label="Précédent"
                  onClick={(e) => {
                    e.stopPropagation();
                    showPrev();
                  }}
                  className="absolute left-2 top-1/2 -translate-y-1/2 text-white bg-black/40 rounded-full p-2 z-20"
                >
                  ‹
                </button>
                <button
                  aria-label="Suivant"
                  onClick={(e) => {
                    e.stopPropagation();
                    showNext();
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-white bg-black/40 rounded-full p-2 z-20"
                >
                  ›
                </button>
              </>
            )}

            <div className="w-full h-full relative">
              <Image
                src={src}
                alt={alt || "image"}
                fill
                className="object-contain"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
