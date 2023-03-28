import React, { createContext, useMemo } from "react";

export const LinkContext = createContext<React.ElementType | null>(null);

interface ILinker {
  CustomLink: React.ElementType;
  children: React.ReactNode;
}

export const Linker = React.memo(({ CustomLink, children }: ILinker) => {
  const memoizedCustomLink = useMemo(() => CustomLink, [CustomLink]);
  return (
    <LinkContext.Provider value={memoizedCustomLink}>{children}</LinkContext.Provider>
  );
})