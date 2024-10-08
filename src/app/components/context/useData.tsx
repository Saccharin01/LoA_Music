"use client";
import React, { createContext, useState, useContext, ReactNode } from 'react';
import DataFormat from '@/shared/IDataFromat';
// 컨텍스트 타입 정의
interface DataContextType {
  data: DataFormat[];
  setData: (data: DataFormat[]) => void;
  loading: boolean;
  error: string | null;
}

// 초기값 설정
const DataContext = createContext<DataContextType | undefined>(undefined);

// 프로바이더 컴포넌트
export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<DataFormat[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <DataContext.Provider value={{ data, setData, loading, error }}>
      {children}
    </DataContext.Provider>
  );
};

// 커스텀 훅
export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
