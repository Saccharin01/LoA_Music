"use client"
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import DataFormat from '@/shared/IDataFromat';

// 컨텍스트 생성
const DataContext = createContext<DataFormat[] | undefined>(undefined);

// 프로바이더 컴포넌트
export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<DataFormat[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/musicData');
        if (!response.ok) throw new Error('Failed to fetch data');
        const result: DataFormat[] = await response.json();
        setData(result);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <DataContext.Provider value={data}>
      {loading ? <div>Loading...</div> : error ? <div>Error: {error}</div> : children}
    </DataContext.Provider>
  );
};

// 커스텀 훅
export const useData = () => {
  const context = React.useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
