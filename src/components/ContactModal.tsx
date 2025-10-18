"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function ContactModal() {
  const [open, setOpen] = useState(false);
  const [subject, setSubject] = useState<string | undefined>(undefined);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

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

  const close = () => setOpen(false);

  const submit = (e?: React.FormEvent) => {
    e?.preventDefault();
    // Build mailto link (fallback without backend)
    const to = "contact@forge-artisanale.fr";
    const s = subject || "Demande depuis le site";
    const bodyLines = [
      name ? `Nom: ${name}` : null,
      email ? `Email: ${email}` : null,
      "",
      message || "",
    ].filter(Boolean);
    const body = encodeURIComponent(bodyLines.join("\n"));
    const mailto = `mailto:${to}?subject=${encodeURIComponent(s)}&body=${body}`;
    // Open user's mail client
    window.location.href = mailto;
    // close modal after launching
    setOpen(false);
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
        <p className="text-sm text-gray-300 mb-4">
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
            placeholder="Votre nom (optionnel)"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="w-full bg-neutral-800 border border-neutral-700 rounded px-3 py-2"
            placeholder="Votre email (optionnel)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />

          <textarea
            className="w-full bg-neutral-800 border border-neutral-700 rounded px-3 py-2 h-32 resize-y"
            placeholder="Votre message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />

          <div className="flex items-center justify-between">
            <button type="submit" className="btn-primary cursor-pointer">
              Envoyer (ouvrir mon client mail)
            </button>
            <button
              type="button"
              onClick={() => {
                // fallback: copy email to clipboard
                navigator.clipboard?.writeText("contact@forge-artisanale.fr");
                close();
              }}
              className="text-sm text-gray-300 underline cursor-pointer"
            >
              Copier l&apos;email
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
