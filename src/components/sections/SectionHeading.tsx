import type { ReactNode } from "react";

interface SectionHeadingProps {
  id?: string;
  children: ReactNode;
  intro?: ReactNode;
  light?: boolean;
}

export default function SectionHeading({ id, children, intro, light = false }: SectionHeadingProps) {
  return (
    <>
      <h2
        id={id}
        className={`mb-4 font-serif text-[length:clamp(1.875rem,3.4vw,2.5rem)] leading-[1.12] font-medium tracking-[-0.015em] text-balance ${
          light ? "text-white" : ""
        }`}
      >
        {children}
      </h2>
      {intro && <p className="max-w-[40em] text-muted">{intro}</p>}
    </>
  );
}
