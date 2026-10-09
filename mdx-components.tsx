import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="text-[32px] leading-[1.12] font-bold tracking-[-0.5px] text-ink text-center sm:text-[40px]">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="mt-8 text-xl leading-7 font-bold text-ink py-2 sm:text-2xl">
        {children}
      </h2>
    ),
    p: ({ children }) => (
      <p className="text-[15px] leading-7 text-ink/80 py-1.5">
        {children}
      </p>
    ),
    li: ({ children }) => (
      <li className="text-[15px] font-semibold leading-7 text-ink/90">
        {children}
      </li>
    ),
    ul: ({ children }) => (
      <ol className="md-ul  ">
        {children}
      </ol>
    ),

    ...components,
  };
}
