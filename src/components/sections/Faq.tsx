import Container from "../layout/Container";
import { FAQ } from "../../data/content";
import SectionHeading from "./SectionHeading";

export default function Faq() {
  return (
    <Container as="section" aria-labelledby="faq-title" className="py-16 lg:py-24">
      <SectionHeading id="faq-title">Common questions</SectionHeading>

      <div className="mt-10 max-w-3xl space-y-3">
        {FAQ.map((item) => (
          <details
            key={item.q}
            name="faq"
            className="group rounded-xl border border-line transition-all duration-200 hover:border-pen/40 open:border-pen/30 open:shadow-sm"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-xl px-5 py-4 text-base leading-snug font-medium outline-none focus-visible:ring-2 focus-visible:ring-pen/50 sm:px-6 sm:py-5 sm:text-lg [&::-webkit-details-marker]:hidden">
              {item.q}

              <span
                aria-hidden="true"
                className="relative flex size-11 shrink-0 items-center justify-center rounded-full border border-line text-pen transition-all duration-300 group-hover:scale-105 group-hover:border-pen/40 group-open:border-pen group-open:bg-pen group-open:text-white sm:size-9"
              >
                {/* horizontal bar */}
                <span className="absolute h-0.5 w-5 rounded-full bg-current" />
                {/* vertical bar: rotates flat when open, turning + into − */}
                <span className="absolute h-0.5 w-5 rotate-90 rounded-full bg-current transition-transform duration-300 group-open:rotate-0" />
              </span>
            </summary>

            <p className="animate-[faq-in_0.25s_ease-out] px-5 pb-5 leading-relaxed text-muted sm:px-6 sm:pb-6">
              {item.a}
            </p>
          </details>
        ))}
      </div>
    </Container>
  );
}