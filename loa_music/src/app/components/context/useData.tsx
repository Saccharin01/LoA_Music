import React, { createContext, useState, useEffect, ReactNode } from 'react';
import mongooseData from '@/app/modules/MongooseData';


// 컨텍스트 생성
const DataContext = createContext<string[] | undefined>(undefined);

// 프로바이더 컴포넌트
export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await mongooseData();
        setData(result);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <DataContext.Provider value={data}>
      {loading ? <div>Loading...</div> : error ? <div>Error: {error.message}</div> : children}
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
