"use client";
import React, { createContext, useState, useContext, ReactNode } from "react";
import { IMusicDataFormat } from "@/shared/IDataFormat";
import { DataContextType } from "../../../../shared/interface/useData.interface";

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [data, setData] = useState<IMusicDataFormat[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <DataContext.Provider value={{ data, setData, loading, error }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
