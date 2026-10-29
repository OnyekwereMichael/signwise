import { SITE_NAME } from "../../config/site";
import Button from "../ui/Button";

export function Logo() {
  return (
    <span className="inline-flex items-center gap-2.5 text-lg leading-none font-semibold tracking-tight">
      <svg width="28" height="28" viewBox="0 0 32 32" aria-hidden="true">
        <rect width="32" height="32" rx="8" fill="#2B3FD9" />
        <path d="M9 16.5l4.5 4.5L23 11" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {SITE_NAME}
    </span>
  );
}

export default function Header() {
  return (
    <header>
      <div className="mx-auto flex w-full max-w-[1160px] items-center justify-between px-5 py-5 sm:px-6">
        <a href="./" aria-label={`${SITE_NAME} home`}>
          <Logo />
        </a>
        <Button href="#join" variant="quiet" size="sm">
          Join the waitlist
        </Button>
      </div>
    </header>
  );
}