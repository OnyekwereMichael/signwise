import Container from "../layout/Container";
import { COMMITMENTS } from "../../data/content";
import SectionHeading from "./SectionHeading";

export default function Trust() {
  return (
    <section aria-labelledby="trust-title" className="bg-ink text-white">
      <Container className="py-16 lg:py-22">
        <SectionHeading id="trust-title" light>
          Your documents stay yours
        </SectionHeading>

        <div className="mt-10 grid gap-7 md:grid-cols-3 md:gap-10">
          {COMMITMENTS.map((c) => (
            <div key={c.title} className="border-t border-white/30 pt-5">
              <h3 className="mb-2 text-[1.0625rem] leading-snug font-semibold">{c.title}</h3>
              <p className="text-[#cfd6e4]">{c.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}