import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface Props {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  tone?: "light" | "dark";
  className?: string;
  aside?: ReactNode;
}

const SectionHeading = ({ eyebrow, title, description, tone = "light", className, aside }: Props) => {
  const dark = tone === "dark";
  return (
    <div className={cn("flex items-end justify-between gap-6", className)}>
      <div className='max-w-3xl'>
        <p className={cn("text-[15px] font-extrabold uppercase tracking-[0.06em] sm:text-[17px]", dark ? "text-coral" : "text-rose")}>
          {eyebrow}
        </p>
        <h2 className={cn("mt-2 text-[30px] font-bold leading-[1.12] tracking-[-0.5px] sm:text-[40px]", dark ? "text-white" : "text-ink")}>
          {title}
        </h2>
        {description && (
          <p className={cn("mt-4 max-w-xl text-[17px] leading-7", dark ? "text-white/75" : "text-ink/70")}>{description}</p>
        )}
      </div>
      {aside}
    </div>
  );
};

export default SectionHeading;
