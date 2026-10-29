import Container from "../layout/Container";
import { STEPS } from "../../data/content";
import SectionHeading from "./SectionHeading";

export default function HowItWorks() {
  return (
    <Container as="section" aria-labelledby="how-title" className="border-t border-line py-16 lg:py-22">
      <SectionHeading id="how-title" intro="No account, no legal background needed.">
        How it works
      </SectionHeading>

      <ol className="mt-12 grid gap-7 md:grid-cols-3 md:gap-10">
        {STEPS.map((step, i) => (
          <li key={step.title} className="border-t-2 border-ink pt-5">
            <span className="mb-2.5 block text-[0.9375rem] font-semibold text-pen">{i + 1}</span>
            <h3 className="mb-2 font-serif text-2xl leading-tight font-medium">{step.title}</h3>
            <p className="text-muted">{step.body}</p>
          </li>
        ))}
      </ol>
    </Container>
  );
}