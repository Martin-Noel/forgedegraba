"use client";

import React, { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import { createPortal } from "react-dom";

export default function ContactModal() {
  const [open, setOpen] = useState(false);
  const [subject, setSubject] = useState<string | undefined>(undefined);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<
    { type: "success"; msg: string } | { type: "error"; msg: string } | null
  >(null);

  // EmailJS configuration uses these env variables:
  // NEXT_PUBLIC_EMAILJS_SERVICE_ID, NEXT_PUBLIC_EMAILJS_TEMPLATE_ID, NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
  // Set them in your .env.local file (see project root)
  const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

  useEffect(() => {
    const handler = (e: Event) => {
      const ev = e as CustomEvent;
      setSubject(ev?.detail?.subject);
      setOpen(true);
      // small focus delay
      setTimeout(() => {
        const el = document.querySelector(
          "#contact-modal textarea"
        ) as HTMLTextAreaElement | null;
        if (el) el.focus();
      }, 150);
    };
    window.addEventListener("open-contact", handler as EventListener);
    return () =>
      window.removeEventListener("open-contact", handler as EventListener);
  }, []);

  // prevent background scroll and close on vertical swipe when modal is open
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    // Detect desktop (wide + fine pointer). On desktop we avoid hiding the
    // native scrollbar to prevent header/nav layout shift.
    const isDesktop = window.matchMedia(
      "(min-width: 1024px) and (pointer: fine)"
    ).matches;
    let didLock = false;
    if (!isDesktop) {
      document.body.style.overflow = "hidden";
      didLock = true;
    }

    // attach handlers to the modal overlay element for better control
    const overlay = document.getElementById("contact-modal");
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
        e.preventDefault();
        setOpen(false);
        start = null;
      }
    };

    overlay?.addEventListener("touchstart", onTouchStart, { passive: true });
    overlay?.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      if (didLock) document.body.style.overflow = previousOverflow;
      overlay?.removeEventListener("touchstart", onTouchStart as EventListener);
      overlay?.removeEventListener("touchmove", onTouchMove as EventListener);
      start = null;
    };
  }, [open]);

  const close = () => {
    setOpen(false);
    setTimeout(() => {
      setStatus(null);
      setSending(false);
    }, 200);
  };

  const submit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setStatus(null);
    // If EmailJS not configured, fallback to mailto
    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      const to = "contact@forge-artisanale.fr";
      const s = subject || "Demande depuis le site";
      const bodyLines = [
        name ? `Nom: ${name}` : null,
        email ? `Email: ${email}` : null,
        "",
        message || "",
      ].filter(Boolean);
      const body = encodeURIComponent(bodyLines.join("\n"));
      const mailto = `mailto:${to}?subject=${encodeURIComponent(
        s
      )}&body=${body}`;
      window.location.href = mailto;
      setOpen(false);
      return;
    }

    try {
      setSending(true);
      // Initialize once per session (safe to call multiple times)
      emailjs.init(EMAILJS_PUBLIC_KEY);
      type TemplateParams = {
        subject: string;
        from_name: string;
        reply_to: string;
        message: string;
      };
      const templateParams: TemplateParams = {
        subject: subject || "Demande depuis le site",
        from_name: name || "",
        reply_to: email || "",
        message: message,
      };
      // service, template, params
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams
      );
      setStatus({ type: "success", msg: "Message envoyé avec succès." });
      // Optionally reset fields
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      console.error("EmailJS error", err);
      setStatus({
        type: "error",
        msg: "Échec de l'envoi. Réessayez ou utilisez votre client mail.",
      });
    } finally {
      setSending(false);
    }
  };

  if (!open) return null;

  const modal = (
    <div
      id="contact-modal"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6"
      aria-modal="true"
      role="dialog"
      onClick={close}
    >
      <div
        className="w-full max-w-2xl bg-neutral-900 rounded-xl p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={close}
          aria-label="Fermer"
          className="absolute right-4 top-4 text-gray-400 hover:text-white cursor-pointer text-copper"
        >
          ✕
        </button>

        <h3 className="text-2xl font-cinzel mb-2">Contact</h3>
        <p className="text-sm text-gray-300 mb-2">
          Envoyez votre demande, je vous répondrai rapidement.
        </p>

        <form onSubmit={submit} className="space-y-3">
          <input
            className="w-full bg-neutral-800 border border-neutral-700 rounded px-3 py-2"
            placeholder="Sujet"
            value={subject ?? ""}
            onChange={(e) => setSubject(e.target.value)}
          />

          <input
            className="w-full bg-neutral-800 border border-neutral-700 rounded px-3 py-2"
            placeholder="Votre nom"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            className="w-full bg-neutral-800 border border-neutral-700 rounded px-3 py-2"
            placeholder="Votre email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
          />

          <textarea
            className="w-full bg-neutral-800 border border-neutral-700 rounded px-3 py-2 h-32 resize-y"
            placeholder="Votre message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />

          <div className="flex items-center justify-between mt-2">
            <div
              className={`text-sm min-h-[1.25rem] ${
                status
                  ? status.type === "success"
                    ? "text-green-400"
                    : "text-red-400"
                  : "text-transparent"
              }`}
              aria-live="polite"
            >
              {status?.msg}
            </div>
            <button
              type="submit"
              className="btn-primary cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              disabled={sending}
            >
              {sending ? "Envoi..." : "Envoyer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return typeof document !== "undefined"
    ? createPortal(modal, document.body)
    : null;
}
