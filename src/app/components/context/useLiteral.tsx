"use client";
import React, { createContext, useState, useContext } from "react";
import { IstaticData } from "@/shared/interface/static.interface";

const LiteralContext = createContext<{
  literal: IstaticData | null;
  setLiteral: React.Dispatch<React.SetStateAction<IstaticData | null>>;
} | null>(null);

const StaticProvider = ({ children }: { children: React.ReactNode }) => {
  const [literal, setLiteral] = useState<IstaticData | null>(null); 

  return (
    <LiteralContext.Provider value={{ literal, setLiteral }}>
      {children}
    </LiteralContext.Provider>
  );
};

const useLiteral = () => {
  const context = useContext(LiteralContext);
  if (!context) {
    throw new Error("useLiteral must be used within a StaticProvider");
  }
  return context;
};

export { StaticProvider, useLiteral };
