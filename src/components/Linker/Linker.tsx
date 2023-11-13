import React, { createContext, useMemo } from "react";

/**
 * `LinkContext` is a React context that is used to provide a custom link component to the `Link` component.
 * It allows for consistent link behavior across an application and integration with routing libraries like Next.js.
 *
 * @context
 * @type {React.ElementType | null}
 * @example
 * // Creating a context for custom link behavior
 * export const LinkContext = createContext<React.ElementType | null>(null);
 */
export const LinkContext = createContext<React.ElementType | null>(null);

interface ILinker {
  CustomLink: React.ElementType;
  children: React.ReactNode;
}

/**
 * `Linker` is a higher-order component that sets up a `LinkContext` to provide a custom link component to its child components.
 * This enables the use of custom routing components, such as those provided by Next.js, for all link components within this context.
 *
 * @component
 * @param {React.ElementType} CustomLink - A custom link component that will be used for routing.
 * @param {React.ReactNode} children - Child components that may contain `Link` components.
 *
 * @example
 * // Using Linker to provide a custom Next.js Link component
 * <Linker CustomLink={NextLink}>
 *   <Link href="/about">About Us</Link>
 * </Linker>
 */
export const Linker = React.memo(({ CustomLink, children }: ILinker) => {
  const memoizedCustomLink = useMemo(() => CustomLink, [CustomLink]);
  return (
    <LinkContext.Provider value={memoizedCustomLink}>{children}</LinkContext.Provider>
  );
})