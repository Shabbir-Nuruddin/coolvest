"use client";

import { useId, useState } from "react";
import { CONTACT_EMAIL } from "@/lib/site";

/*
  The quote request, filled in like a consignment label.
  No backend: on submit it composes an email to CONTACT_EMAIL and opens the
  visitor's mail app. Status prints underneath as label lines.
*/

const SECTORS = [
  "Security services",
  "Delivery or quick-commerce fleet",
  "Construction or industrial site",
  "Facilities management",
  "Gulf contractor",
  "Buying for myself",
  "Other",
];

type Fields = {
  company: string;
  name: string;
  contact: string;
  sector: string;
  workers: string;
  location: string;
  message: string;
};

const EMPTY: Fields = { company: "", name: "", contact: "", sector: "", workers: "", location: "", message: "" };

type Status = "idle" | "sending" | "ready" | "unconfigured";

function validate(f: Fields) {
  const e: Partial<Record<keyof Fields, string>> = {};
  if (!f.name.trim()) e.name = "Add a name so we know who to reply to.";
  if (!f.contact.trim()) e.contact = "Add an email or phone number.";
  else if (!/@/.test(f.contact) && f.contact.replace(/\D/g, "").length < 8)
    e.contact = "That doesn't look like an email or a full phone number.";
  if (!f.sector) e.sector = "Pick the closest match.";
  if (f.workers && !/^\d{1,6}$/.test(f.workers.trim())) e.workers = "Use a whole number, for example 40.";
  if (!f.location.trim()) e.location = "Add a city and country.";
  return e;
}

function compose(f: Fields) {
  const lines = [
    `Company: ${f.company || "—"}`,
    `Name: ${f.name}`,
    `Contact: ${f.contact}`,
    `Sector: ${f.sector}`,
    `Workers to outfit: ${f.workers || "not sure yet"}`,
    `Location: ${f.location}`,
    "",
    f.message || "(no message)",
  ];
  const subject = `CoolVest quote request — ${f.company || f.name}${f.workers ? `, ${f.workers} workers` : ""}`;
  return { subject, body: lines.join("\n") };
}

export function QuoteForm() {
  const uid = useId();
  const [f, setF] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [copied, setCopied] = useState(false);

  const set = (k: keyof Fields) => (ev: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setF((p) => ({ ...p, [k]: ev.target.value }));
    if (errors[k]) setErrors((p) => ({ ...p, [k]: undefined }));
  };

  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate(f);
    setErrors(e);
    const first = Object.keys(e)[0];
    if (first) {
      document.getElementById(`${uid}-${first}`)?.focus();
      return;
    }
    if (!CONTACT_EMAIL) {
      setStatus("unconfigured");
      return;
    }
    setStatus("sending");
    const { subject, body } = compose(f);
    window.setTimeout(() => {
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setStatus("ready");
    }, 450);
  };

  const copy = async () => {
    const { subject, body } = compose(f);
    try {
      await navigator.clipboard.writeText(`${subject}\n\n${body}`);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  const fieldId = (k: keyof Fields) => `${uid}-${k}`;
  const errId = (k: keyof Fields) => `${uid}-${k}-err`;
  const a11y = (k: keyof Fields) => ({
    id: fieldId(k),
    "aria-invalid": errors[k] ? (true as const) : undefined,
    "aria-describedby": errors[k] ? errId(k) : undefined,
  });

  const Label = ({ k, children, optional }: { k: keyof Fields; children: React.ReactNode; optional?: boolean }) => (
    <label htmlFor={fieldId(k)} className="flex items-baseline justify-between gap-3 font-display text-[14px] font-bold uppercase tracking-[0.08em] text-ink">
      <span>{children}</span>
      {optional && <span className="font-sans text-[12px] font-medium normal-case tracking-normal text-ink-3">optional</span>}
    </label>
  );
  const Err = ({ k }: { k: keyof Fields }) =>
    errors[k] ? (
      <p id={errId(k)} className="mt-1.5 text-[14px] font-medium text-heat">
        {errors[k]}
      </p>
    ) : null;

  const busy = status === "sending";

  return (
    <form onSubmit={onSubmit} noValidate className="label relative">
      <div className="band h-3" aria-hidden />
      <div className="grid grid-cols-1 border-b-2 border-ink sm:grid-cols-2">
        <div className="border-b-2 border-ink p-4 sm:border-r-2 sm:border-b-0 sm:p-5">
          <Label k="company" optional>
            Consignee · company
          </Label>
          <input {...a11y("company")} className="field mt-2" autoComplete="organization" value={f.company} onChange={set("company")} placeholder="Agency, fleet or contractor" />
        </div>
        <div className="p-4 sm:p-5">
          <Label k="name">Your name</Label>
          <input {...a11y("name")} className="field mt-2" autoComplete="name" value={f.name} onChange={set("name")} />
          <Err k="name" />
        </div>
      </div>

      <div className="grid grid-cols-1 border-b-2 border-ink sm:grid-cols-2">
        <div className="border-b-2 border-ink p-4 sm:border-r-2 sm:border-b-0 sm:p-5">
          <Label k="contact">Email or phone</Label>
          <input {...a11y("contact")} className="field mt-2" autoComplete="email" inputMode="email" value={f.contact} onChange={set("contact")} />
          <Err k="contact" />
        </div>
        <div className="p-4 sm:p-5">
          <Label k="location">City, country</Label>
          <input {...a11y("location")} className="field mt-2" autoComplete="address-level2" value={f.location} onChange={set("location")} placeholder="e.g. Gurugram, India" />
          <Err k="location" />
        </div>
      </div>

      <div className="grid grid-cols-1 border-b-2 border-ink sm:grid-cols-[1.4fr_1fr]">
        <div className="border-b-2 border-ink p-4 sm:border-r-2 sm:border-b-0 sm:p-5">
          <Label k="sector">Sector</Label>
          <select {...a11y("sector")} className="field mt-2 appearance-none bg-[length:14px] bg-[right_0.85rem_center] bg-no-repeat pr-10" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 14 9'%3E%3Cpath d='M1 1l6 6 6-6' fill='none' stroke='%230d1b24' stroke-width='2.4'/%3E%3C/svg%3E\")" }} value={f.sector} onChange={set("sector")}>
            <option value="" disabled>
              Choose one
            </option>
            {SECTORS.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
          <Err k="sector" />
        </div>
        <div className="p-4 sm:p-5">
          <Label k="workers" optional>
            Workers to outfit
          </Label>
          <input {...a11y("workers")} className="field tnum mt-2" inputMode="numeric" value={f.workers} onChange={set("workers")} placeholder="e.g. 40" />
          <Err k="workers" />
        </div>
      </div>

      <div className="border-b-2 border-ink p-4 sm:p-5">
        <Label k="message" optional>
          Site notes
        </Label>
        <textarea
          {...a11y("message")}
          rows={4}
          className="field mt-2 resize-y"
          value={f.message}
          onChange={set("message")}
          placeholder="Shift length, uniform type, whether the site has a fridge, when you'd want a pilot."
        />
      </div>

      <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <p className="max-w-[44ch] text-[14px] leading-snug text-ink-2">
          This opens your email app with the request filled in. Nothing is stored on this site.
        </p>
        <button type="submit" className="btn-signal shrink-0 justify-center" disabled={busy} aria-busy={busy}>
          {busy ? "Printing label…" : "Request a quote"}
          <svg viewBox="0 0 20 14" className="h-3.5 w-5" aria-hidden>
            <path d="M0 7h17M11 1l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2.6" />
          </svg>
        </button>
      </div>

      {/* Status prints as label lines */}
      <div aria-live="polite" className="empty:hidden">
        {status === "ready" && (
          <div className="border-t-2 border-ink bg-signal p-4 sm:p-5">
            <p className="font-display text-[20px] font-bold uppercase leading-tight tracking-[0.04em]">Label printed · check your email app</p>
            <p className="mt-1 max-w-[60ch] text-[15px] leading-snug">
              Your request is written and addressed to {CONTACT_EMAIL}. Press send there and we'll reply with a quote. If nothing opened,{" "}
              <button type="button" onClick={copy} className="link-ink font-semibold">
                copy the request
              </button>{" "}
              and email it to us directly.{copied && " Copied."}
            </p>
          </div>
        )}
        {status === "unconfigured" && (
          <div className="border-t-2 border-ink bg-paper p-4 sm:p-5">
            <p className="font-display text-[20px] font-bold uppercase leading-tight tracking-[0.04em] text-heat">Quote inbox not connected yet</p>
            <p className="mt-1 max-w-[60ch] text-[15px] leading-snug text-ink-2">
              Your details are fine. This site doesn't have a receiving inbox set yet, so nothing was sent.{" "}
              <button type="button" onClick={copy} className="link-ink font-semibold text-ink">
                Copy your request
              </button>{" "}
              to keep it.{copied && " Copied."}
            </p>
          </div>
        )}
      </div>
    </form>
  );
}
