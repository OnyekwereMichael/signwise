import Container from "../layout/Container";
import WaitlistForm from "../waitlist/WaitlistForm";
import SampleResult from "./SampleResult";

export default function Hero() {
  return (
    <Container
      as="section"
      aria-labelledby="hero-title"
      className="grid items-center gap-12 pt-8 pb-16 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16 lg:pt-12 lg:pb-24"
    >
      <div>
        <h1
          id="hero-title"
          className="mb-5 font-serif text-[length:clamp(2.5rem,5vw,4.1rem)] leading-[1.04] font-medium tracking-[-0.022em] text-balance"
        >
          Don’t sign it until you understand it.
        </h1>
        <p className="mb-8 max-w-[32em] text-[1.1875rem] text-muted">
          Upload a contract and get a plain-English breakdown in about 30 seconds: what it says, what’s risky, and what to ask before you sign.
        </p>
        <div id="join" className="scroll-mt-6">
          <WaitlistForm idPrefix="hero" />
        </div>
      </div>

      <SampleResult />
    </Container>
  );
}