import Container from "../layout/Container";
import { SITE_NAME } from "../../config/site";
import { WHO } from "../../data/content";
import SectionHeading from "./SectionHeading";

export default function WhoItsFor() {
  return (
    <Container as="section" aria-labelledby="who-title" className="border-t border-line py-16 lg:py-22">
      <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
        <div>
          <div className="mb-8">
            <SectionHeading id="who-title">Made for the contracts you sign without a lawyer</SectionHeading>
          </div>
          <ul>
            {WHO.map((item) => (
              <li key={item} className="border-t border-line py-[18px] font-serif text-[1.375rem] leading-snug last:border-b">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <aside className="rounded-md border border-l-4 border-line border-l-mark bg-white p-7">
          <h3 className="mb-2.5 font-serif text-2xl leading-tight font-medium">Where a lawyer still belongs</h3>
          <p className="text-muted">
            Buying property, starting a business with a partner, or anything heading to court. {SITE_NAME} tells you when a contract is out of its depth, and the verdict says so.
          </p>
        </aside>
      </div>
    </Container>
  );
}