import type { ReactNode } from "react";
import Container from "../layout/Container";
import { ADDON, FEATURES } from "../../data/content";
import SectionHeading from "./SectionHeading";

/* One icon per feature, in the same order as FEATURES in data/content.js.
   If you reorder or add features there, reorder or add an icon here. */
const ICONS: ReactNode[] = [
  // summary
  <>
    <rect x="5" y="3.5" width="14" height="17" rx="2.5" />
    <path d="M9 8.5h6M9 12h6M9 15.5h3.5" />
  </>,
  // red flags
  <>
    <path d="M6 21V4" />
    <path d="M6 5.5c3-1.6 5.5 1.6 8.5 0 1.4-.7 2.6-.8 3.5-.5v8c-.9-.3-2.1-.2-3.5.5-3 1.6-5.5-1.6-8.5 0" />
  </>,
  // legal words, translated
  <>
    <path d="M4 6.5h9M8.5 4v2.5M6 6.5c.5 3 2.5 5.5 5.5 7M11 6.5c-.6 3-3 6-6.5 7.5" />
    <path d="M13.5 20l3.5-8.5 3.5 8.5M14.8 17h4.4" />
  </>,
  // verdict
  <>
    <path d="M12 3l7 3v5.5c0 4.2-2.9 7.6-7 9.5-4.1-1.9-7-5.3-7-9.5V6z" />
    <path d="M9 12l2.2 2.2L15.5 10" />
  </>,
  // questions worth asking
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M9.6 9.5a2.5 2.5 0 1 1 3.6 2.2c-.8.4-1.2 1-1.2 1.8" />
    <path d="M12 17h.01" />
  </>,
  // your own questions
  <path d="M20 12a8 8 0 0 1-11.6 7.1L4 20l1-4.2A8 8 0 1 1 20 12z" />,
];

function Icon({ children }: { children: ReactNode }) {
  return (
    <span className="grid size-12 place-items-center rounded-xl bg-pen-soft text-pen" aria-hidden="true">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        {children}
      </svg>
    </span>
  );
}

export default function Features() {
  return (
    <Container as="section" aria-labelledby="get-title" className="border-t border-line py-20 lg:py-28">
      <SectionHeading id="get-title" intro="Everything in one breakdown, ready in about 30 seconds.">
        What you get
      </SectionHeading>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {FEATURES.map((f, i) => (
          <div
            key={f.title}
            className="rounded-2xl border border-line  p-7 transition hover:border-pen/40 hover:shadow-[0_24px_48px_-28px_rgba(20,33,61,0.3)] lg:p-8"
          >
            <Icon>{ICONS[i]}</Icon>
            <h3 className="mt-6 mb-2 text-[1.15rem] leading-snug font-semibold font-serif">{f.title}</h3>
            <p className="text-muted">{f.body}</p>
          </div>
        ))}

        {/* The add-on gets a wide card of its own, so it reads as a bonus, not a seventh feature. */}
        <div className="grid items-center gap-8 rounded-2xl bg-pen-soft p-8 sm:col-span-2 md:grid-cols-[minmax(0,1fr)_auto] md:gap-12 md:p-10 lg:col-span-3">
          <div>
            <span className="mb-5 inline-flex rounded-full bg-pen px-3.5 py-1.5 text-sm font-semibold text-white">
              Also included
            </span>
            <h3 className="mb-3 font-serif text-[1.75rem] leading-tight font-medium tracking-tight">{ADDON.title}</h3>
            <p className="max-w-[34em] text-muted">{ADDON.body}</p>
          </div>

          {/* A small picture of the two rewritten versions you get back. */}
          <div className="grid w-full gap-3 md:w-[300px]" aria-hidden="true">
            <div className="rounded-xl bg-white p-4 shadow-sm">
              <p className="mb-3 text-sm font-semibold text-pen">Calmer version</p>
              <div className="grid gap-2">
                <span className="h-2 w-full rounded-full bg-line" />
                <span className="h-2 w-4/5 rounded-full bg-line" />
              </div>
            </div>
            <div className="rounded-xl bg-white p-4 shadow-sm">
              <p className="mb-3 text-sm font-semibold text-pen">Firmer version</p>
              <div className="grid gap-2">
                <span className="h-2 w-full rounded-full bg-line" />
                <span className="h-2 w-3/5 rounded-full bg-line" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}