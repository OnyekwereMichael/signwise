import { SITE_NAME } from "../../config/site";
import Button from "../ui/Button";
import logo from "../../../public/favicon.svg";

export function Logo() {
  return (
    <span className="inline-flex items-center gap-2.5 text-lg leading-none font-semibold tracking-tight">
 <img src={logo}  width={36} height={36} alt="" />     
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