import { useRef, useState, type FormEvent } from "react";
import { CONTRACT_TYPES, SITE_NAME } from "../../config/site";
import { useWaitlist } from "../../context/WaitlistContext";
import { EMAIL_RE } from "../../lib/waitlist";

/* Styles shared by the form and the success view. Edit them here to restyle everything at once. */
const card =
  "relative w-full max-w-[520px] rounded-2xl border border-line p-6 shadow-[0_1px_2px_rgba(20,33,61,0.04),0_28px_56px_-28px_rgba(20,33,61,0.28)] sm:p-9";

const field =
  "h-14 w-full rounded-xl border border-field bg-white text-base text-ink transition placeholder:text-[#667289] hover:border-ink/50 focus:border-pen focus:outline-none focus:ring-4 focus:ring-pen/15 aria-[invalid=true]:border-flag aria-[invalid=true]:focus:ring-flag/15";

const label = "mb-2.5 block text-sm font-medium text-ink";

const primaryBtn =
  "inline-flex h-14 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-pen px-6 text-[1.0625rem] font-semibold text-white shadow-[0_12px_24px_-12px_rgba(43,63,217,0.75)] transition hover:bg-pen-dark active:translate-y-px disabled:cursor-progress disabled:opacity-70";

const quietBtn =
  "inline-flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-field bg-white px-4 text-[0.9375rem] font-medium text-ink transition hover:border-ink";

interface WaitlistFormProps {
  idPrefix?: string;
}

/**
 * The waitlist signup. Use it more than once on a page, but give each copy its own idPrefix
 * so the labels and inputs stay linked.
 */
export default function WaitlistForm({ idPrefix = "waitlist" }: WaitlistFormProps) {
  const { joined, already, code, count, join, reset } = useWaitlist();

  const [email, setEmail] = useState("");
  const [contractType, setContractType] = useState("");
  const [trap, setTrap] = useState(""); // hidden field: only bots fill it in
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const doneRef = useRef<HTMLDivElement>(null);

  const emailId = `${idPrefix}-email`;
  const typeId = `${idPrefix}-type`;

  if (joined) {
    const link = `${window.location.origin}${window.location.pathname}${code ? `?ref=${code}` : ""}`;
    const whatsapp =
      "https://wa.me/?text=" +
      encodeURIComponent(
        `Before you sign a lease, job offer or loan, run it through ${SITE_NAME}. It explains the contract in plain English and flags what's risky: ${link}`
      );

    const copy = async () => {
      try {
        await navigator.clipboard.writeText(link);
      } catch {
        /* clipboard blocked: the link is still selectable in the box */
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    };

    return (
      <div ref={doneRef} tabIndex={-1} className={`${card} outline-none`}>
        <div className="mb-6 grid size-12 place-items-center rounded-full bg-pen-soft text-pen" aria-hidden="true">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12.5l4.5 4.5L19 7.5" />
          </svg>
        </div>

        <p className="mb-2 font-serif text-[2rem] leading-[1.15] tracking-tight">
          {already ? "You’re already on the list." : "You’re on the list."}
        </p>
        <p className="text-muted">We’ll email you when the first version opens.</p>

        <div className="my-7 h-px bg-line" />

        <p className="mb-4 font-medium">Know someone about to sign a lease, job offer or loan? Send them this link.</p>

        <div className="mb-3 flex items-center gap-2 rounded-xl border border-field bg-page p-1.5 pl-4 transition focus-within:border-pen focus-within:ring-4 focus-within:ring-pen/15">
          <input
            readOnly
            value={link}
            aria-label="Your invite link"
            onFocus={(e) => e.target.select()}
            className="min-w-0 flex-1 truncate bg-transparent text-[0.9375rem] text-ink outline-none"
          />
          <button
            type="button"
            onClick={copy}
            className="h-10 shrink-0 cursor-pointer rounded-lg bg-ink px-4 text-sm font-semibold text-white transition hover:bg-pen"
          >
            {copied ? "Copied" : "Copy link"}
          </button>
        </div>

        <a href={whatsapp} target="_blank" rel="noopener noreferrer" className={quietBtn}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 20.5l1.7-5.4A8.4 8.4 0 1 1 21 11.5Z" />
          </svg>
          Share on WhatsApp
        </a>

        {count > 0 && (
          <p className="mt-6 inline-flex rounded-full bg-pen-soft px-4 py-2 text-sm font-medium text-pen">
            {count === 1 ? "1 friend has joined through your link." : `${count} friends have joined through your link.`}
          </p>
        )}

        <div className="mt-7">
          <button
            type="button"
            onClick={reset}
            className="cursor-pointer text-[0.9375rem] font-medium text-pen underline underline-offset-[3px]"
          >
            Add a different email
          </button>
        </div>
      </div>
    );
  }

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");

    // Bots fill the hidden field. Pretend it worked and store nothing.
    if (trap) return;

    const clean = email.trim().toLowerCase();
    if (!EMAIL_RE.test(clean) || clean.length > 254) {
      setError("Enter a valid email address, like you@example.com.");
      emailRef.current?.focus();
      return;
    }

    setBusy(true);
    try {
      await join({ email: clean, contractType });
      // Move keyboard and screen reader focus to the confirmation.
      setTimeout(() => doneRef.current?.focus(), 0);
    } catch (err) {
      console.error(err);
      setError("We couldn’t save your spot. Check your connection and try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={onSubmit} noValidate className={`${card} grid gap-6`}>
      <div>
        <p className="mb-1.5 font-serif text-2xl leading-tight tracking-tight">Get early access</p>
        <p className="text-[0.9375rem] text-muted">Be first in line when the first version opens.</p>
      </div>

      <div>
        <label htmlFor={emailId} className={label}>
          Email address
        </label>
        <div className="relative">
          <svg
            className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-muted"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect x="3" y="5" width="18" height="14" rx="2.5" />
            <path d="m4 7.5 8 5.5 8-5.5" />
          </svg>
          <input
            ref={emailRef}
            id={emailId}
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={error ? "true" : undefined}
            aria-describedby={error ? `${idPrefix}-error` : undefined}
            className={`${field} pr-4 pl-12`}
          />
        </div>
      </div>

      <div>
        <label htmlFor={typeId} className={label}>
          What do you most need checked? <span className="ml-1 font-normal text-muted">Optional</span>
        </label>
        <select
          id={typeId}
          value={contractType}
          onChange={(e) => setContractType(e.target.value)}
          className={`${field} select-arrow pr-11 pl-4`}
        >
          <option value="">Choose one</option>
          {CONTRACT_TYPES.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
      </div>

      {/* Hidden from people, visible to bots */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Company
          <input tabIndex={-1} autoComplete="off" value={trap} onChange={(e) => setTrap(e.target.value)} />
        </label>
      </div>

      {error && (
        <p id={`${idPrefix}-error`} role="alert" className="-mt-2 text-[0.9375rem] font-medium text-flag">
          {error}
        </p>
      )}

      <div className="grid gap-4">
        <button type="submit" disabled={busy} className={primaryBtn}>
          {busy ? (
            "Joining…"
          ) : (
            <>
              Join the waitlist
              {/* <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg> */}
            </>
          )}
        </button>

        <p className="flex items-center justify-center gap-2 text-sm text-muted">
          {/* <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="4.5" y="10.5" width="15" height="10" rx="2.5" />
            <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" />
          </svg> */}
          Free to join. We’ll only email you about the launch.
        </p>
      </div>
    </form>
  );
}