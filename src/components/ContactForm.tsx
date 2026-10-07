"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "sending" | "sent" | "error";

/**
 * Posts to Formspree so the site stays static and no email address is published.
 * Messages are delivered to the inbox configured in the Formspree dashboard.
 */
export function ContactForm({ formId, fallbackHref }: { formId?: string; fallbackHref: string }) {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!formId) return;
    const form = event.currentTarget;
    setStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${formId}`, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="rounded-xl border border-k-output/40 bg-k-output/10 p-6">
        <p className="font-medium">Thank you — your message is on its way.</p>
        <p className="mt-1 text-sm text-muted">I&apos;ll get back to you as soon as I can.</p>
      </div>
    );
  }

  const field = "mt-1.5 w-full rounded-lg border border-line-strong bg-canvas px-3.5 py-2.5 text-sm text-fg placeholder:text-faint focus:border-signal focus:outline-none";
  const label = "block text-sm font-medium";

  return (
    <form onSubmit={onSubmit} className="grid gap-5">
      {!formId && (
        <p className="rounded-lg border border-dashed border-line-strong p-3 text-sm text-muted">
          The contact form isn&apos;t connected yet. Please reach out on{" "}
          <a href={fallbackHref} target="_blank" rel="noreferrer" className="text-signal underline">
            LinkedIn
          </a>{" "}
          in the meantime.
        </p>
      )}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <label className={label}>
          Name
          <input name="name" required autoComplete="name" className={field} />
        </label>
        <label className={label}>
          Email
          <input name="email" type="email" required autoComplete="email" className={field} />
        </label>
      </div>
      <label className={label}>
        Company <span className="font-normal text-faint">(optional)</span>
        <input name="company" autoComplete="organization" className={field} />
      </label>
      <label className={label}>
        Message
        <textarea name="message" required rows={6} placeholder="The role, the team, and the AI problem you're solving." className={field} />
      </label>
      {/* Honeypot: hidden from people, filled in by bots, rejected by Formspree. */}
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <input type="hidden" name="_subject" value="New message from your portfolio" />
      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={!formId || status === "sending"}
          className="rounded-full bg-signal px-6 py-2.5 text-sm font-medium text-on-signal transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {status === "sending" ? "Sending…" : "Send message"}
        </button>
        {status === "error" && (
          <p role="alert" className="text-sm text-k-guard">
            Something went wrong. Please try again, or message me on LinkedIn.
          </p>
        )}
      </div>
    </form>
  );
}
