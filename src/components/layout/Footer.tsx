import { CONTRACT_TYPES, SITE_NAME } from "../../config/site";
import { Logo } from "./Header";

const EXPLORE = [
  { label: "How it works", href: "#how-title" },
  { label: "What you get", href: "#get-title" },
  { label: "Common questions", href: "#faq-title" },
  { label: "Join the waitlist", href: "#join" },
];

const linkClass =
  "rounded text-[0.9375rem] text-[#cfd6e4] transition hover:text-white focus-visible:outline-mark";

export default function Footer() {
  // The contract types you plan to support, minus the catch-all "Something else".
  const contracts = CONTRACT_TYPES.filter((t) => t.value !== "other");

  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto w-full max-w-[1160px] px-5 sm:px-6">
        <div className="grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr] md:gap-16 md:py-20">
          <div>
            <a href="./" aria-label={`${SITE_NAME} home`} className="inline-block rounded focus-visible:outline-mark">
              <Logo />
            </a>
            <p className="mt-6 max-w-[16em] font-serif text-[1.625rem] leading-[1.25] tracking-tight text-balance text-white">
              Don’t sign it until you understand it.
            </p>
            <a
              href="#join"
              className="mt-8 inline-flex h-12 items-center gap-2 rounded-xl bg-white px-5 text-[0.9375rem] font-semibold text-ink transition hover:bg-mark focus-visible:outline-mark"
            >
              Join the waitlist
              {/* <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg> */}
            </a>
          </div>

          <nav aria-label="Explore">
            <p className="mb-5 text-sm font-semibold text-white/60">Explore</p>
            <ul className="grid gap-3.5">
              {EXPLORE.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className={linkClass}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="mb-5 text-sm font-semibold text-white/60">Contracts it will explain</p>
            <ul className="grid gap-3.5">
              {contracts.map((t) => (
                <li key={t.value} className="text-[0.9375rem] text-[#cfd6e4]">
                  {t.label}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Add Privacy and Terms links to the Explore list above once those pages exist. */}

        <p className="rounded-xl border border-white/15 bg-white/5 p-5 text-sm leading-relaxed text-[#cfd6e4]">
          {SITE_NAME} explains contracts in plain English. It is not a law firm and does not give legal advice. For big
          decisions, check with a lawyer.
        </p>

        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 py-8 text-sm text-white/60">
          <span>
            © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </span>
          <a href="#" className="rounded transition hover:text-white focus-visible:outline-mark">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}