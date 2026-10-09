import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  /** Max width of the card; legal text wants a wider measure than a form. */
  className?: string;
}

/**
 * White rounded card on the cream page background — the container used by
 * every content page (policies, delete account, download) so they match the
 * home page's card language.
 */
const PageCard = ({ children, className }: Props) => (
  <main className='mx-auto w-full px-4 py-8 sm:px-6 sm:py-14'>
    <div
      className={cn(
        "mx-auto max-w-[960px] rounded-[24px] bg-white p-6 shadow-[0_10px_40px_rgba(38,43,51,0.08)] sm:p-12",
        className
      )}
    >
      {children}
    </div>
  </main>
);

export default PageCard;
