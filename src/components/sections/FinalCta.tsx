import Container from "../layout/Container";
import WaitlistForm from "../waitlist/WaitlistForm";
import SectionHeading from "./SectionHeading";

export default function FinalCta() {
  return (
    <Container
      as="section"
      aria-labelledby="cta-title"
      className="grid items-center gap-8 border-t border-line py-16 lg:grid-cols-2 lg:gap-16 lg:py-22"
    >
      <div>
        <SectionHeading id="cta-title" intro="Join the waitlist and tell us which contract you need checked first.">
          Be one of the first to try it
        </SectionHeading>
      </div>
      <WaitlistForm idPrefix="cta" />
    </Container>
  );
}