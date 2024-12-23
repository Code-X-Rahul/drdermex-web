import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="text-2xl leading-7 font-semibold text-center">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-base leading-[22px] font-semibold">
        {children}
      </h2>
    ),
    p: ({ children }) => (
      <p className="text-xs leading-5 ">
        {children}
      </p>
    ),
    li: ({ children }) => (
      <li className="text-xs font-bold leading-5 ">
        {children}
      </li>
    ),
    
    ...components,
  };
}
