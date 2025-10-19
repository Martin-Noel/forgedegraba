"use client";

import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ImageModal() {
  const [open, setOpen] = useState(false);
  const [src, setSrc] = useState<string | null>(null);
  const [alt, setAlt] = useState<string | null>(null);
  const [gallery, setGallery] = useState<string[]>([]);
  const [galleryRotate, setGalleryRotate] = useState<boolean[]>([]);
  const [index, setIndex] = useState<number | null>(null);
  const [rotate90, setRotate90] = useState<boolean>(false);

  // zoom/pan state
  const [scale, setScale] = useState(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const isPanningRef = React.useRef(false);
  const panStartRef = React.useRef<{
    x: number;
    y: number;
    panX: number;
    panY: number;
  } | null>(null);
  const pinchRef = React.useRef<{
    startDist: number;
    startScale: number;
  } | null>(null);

  const openHandler = useCallback((e: Event) => {
    const detail = (e as CustomEvent).detail || {};
    const s = detail.src || null;
    const a = detail.alt || null;
    const rFromEvent: boolean = !!detail.rotate90;

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
    const rotates = nodeList.map((i) => {
      // If it's the hidden img we added, infer rotation from its closest button wrapper
      if (i.classList.contains("sr-only")) {
        const btn = i.closest("button");
        return btn?.classList.contains("rotate-knife") || false;
      }
      // Otherwise infer from the image class directly
      return i.classList.contains("rotated-90");
    });

    let idx: number | null = null;
    if (s && imgs.length > 0) {
      idx = imgs.indexOf(s);
      if (idx === -1) idx = null;
    }

    if (imgs.length > 0) {
      setGallery(imgs);
      setGalleryRotate(rotates);
    } else {
      setGallery([]);
      setGalleryRotate([]);
    }

    setSrc(s);
    setAlt(a);
    setIndex(idx);
    // Prefer rotation inferred from gallery index; fall back to event detail
    if (idx != null && rotates[idx] != null) setRotate90(!!rotates[idx]);
    else setRotate90(rFromEvent);
    // reset zoom/pan when opening
    setScale(1);
    setPan({ x: 0, y: 0 });
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
    if (galleryRotate.length === gallery.length)
      setRotate90(!!galleryRotate[next]);
    setScale(1);
    setPan({ x: 0, y: 0 });
  };

  const showNext = () => {
    if (!gallery.length || index == null) return;
    const next = Math.min(gallery.length - 1, index + 1);
    setIndex(next);
    setSrc(gallery[next]);
    if (galleryRotate.length === gallery.length)
      setRotate90(!!galleryRotate[next]);
    setScale(1);
    setPan({ x: 0, y: 0 });
  };

  const clamp = (val: number, min: number, max: number) =>
    Math.max(min, Math.min(max, val));

  // wheel zoom (desktop)
  const onWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = -e.deltaY;
    const factor = Math.exp(delta * 0.001);
    setScale((s) => clamp(s * factor, 1, 5));
  };

  // mouse pan
  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    isPanningRef.current = true;
    panStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      panX: pan.x,
      panY: pan.y,
    };
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isPanningRef.current || !panStartRef.current) return;
    const dx = e.clientX - panStartRef.current.x;
    const dy = e.clientY - panStartRef.current.y;
    setPan({
      x: panStartRef.current.panX + dx,
      y: panStartRef.current.panY + dy,
    });
  };
  const onMouseUp = () => {
    isPanningRef.current = false;
    panStartRef.current = null;
  };

  // touch: pinch zoom and pan
  const onTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const [t1, t2] = [e.touches[0], e.touches[1]];
      const dx = t2.clientX - t1.clientX;
      const dy = t2.clientY - t1.clientY;
      const dist = Math.hypot(dx, dy);
      pinchRef.current = { startDist: dist, startScale: scale };
    } else if (e.touches.length === 1) {
      const t = e.touches[0];
      panStartRef.current = {
        x: t.clientX,
        y: t.clientY,
        panX: pan.x,
        panY: pan.y,
      };
    }
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (pinchRef.current && e.touches.length === 2) {
      e.preventDefault();
      const [t1, t2] = [e.touches[0], e.touches[1]];
      const dx = t2.clientX - t1.clientX;
      const dy = t2.clientY - t1.clientY;
      const dist = Math.hypot(dx, dy);
      const ratio = dist / pinchRef.current.startDist;
      setScale(clamp(pinchRef.current.startScale * ratio, 1, 5));
    } else if (
      !pinchRef.current &&
      e.touches.length === 1 &&
      panStartRef.current
    ) {
      const t = e.touches[0];
      const dx = t.clientX - panStartRef.current.x;
      const dy = t.clientY - panStartRef.current.y;
      setPan({
        x: panStartRef.current.panX + dx,
        y: panStartRef.current.panY + dy,
      });
    }
  };
  const onTouchEnd = () => {
    pinchRef.current = null;
    panStartRef.current = null;
  };

  // close on vertical swipe (mobile): track touchstart and detect vertical swipe
  const touchStartRef = React.useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (!open) return;
    // If zoomed in, do not enable swipe-to-close to prioritize zoom/pan
    if (scale > 1) return;

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
  }, [open, scale]);

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
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute cursor-pointer text-copper right-2 top-2 text-white bg-black/40 rounded-full p-2 z-20"
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

            <div
              className="w-full h-full relative overflow-hidden"
              onWheel={onWheel}
              onMouseDown={onMouseDown}
              onMouseMove={onMouseMove}
              onMouseUp={onMouseUp}
              onMouseLeave={onMouseUp}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={alt || "image"}
                className={`modal-img ${rotate90 ? "rotated-90-modal" : ""}`}
                style={{
                  transform: `translate(-50%, -50%) ${
                    pan.x || pan.y ? `translate(${pan.x}px, ${pan.y}px) ` : ""
                  }${rotate90 ? "rotate(90deg) " : ""}scale(${scale})`,
                }}
                draggable={false}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
