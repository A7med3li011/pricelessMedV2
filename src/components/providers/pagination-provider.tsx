"use client";
import { createContext, useState, ReactNode } from "react";

interface PaginationContextType {
  pending: boolean;
  setPendinggg: (pending: boolean) => void;
}

export const PaginationContext = createContext<PaginationContextType>({
  pending: false,
  setPendinggg: () => {},
});

// Provider component
export const PaginationProvider = ({
  children,
  alternative,
}: {
  children: ReactNode;
  alternative?: ReactNode;
}) => {
  const [pending, setPendinggg] = useState(false);

  return (
    <PaginationContext.Provider value={{ pending, setPendinggg }}>
      <div className="relative">
        {pending && alternative}
        <div className={pending ? "hidden" : "block"}>{children}</div>
      </div>
    </PaginationContext.Provider>
  );
};
