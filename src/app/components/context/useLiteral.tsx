"use client";
import React, { createContext, useState, useContext, ReactNode } from "react";
import { IstaticData } from "@/shared/interface/static.interface";
import { staticData } from "@/shared/static.data"; // 정적 데이터 가져오기

// 컨텍스트 생성
const LiteralContext = createContext<{ literal: IstaticData[]; setLiteral: (newData: IstaticData[]) => void } | undefined>(undefined);

// DataProvider 컴포넌트
const StaticProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [literal, setLiteral] = useState<IstaticData[]>(staticData); // 기본 정적 데이터를 설정

  // 데이터를 설정하는 함수
  const updateLiteral = (newData: IstaticData[]) => {
    setLiteral(newData); // 새 데이터를 컨텍스트에 저장
  };

  return (
    <LiteralContext.Provider value={{ literal, setLiteral: updateLiteral }}>
      {children}
    </LiteralContext.Provider>
  );
};

// 데이터 접근을 위한 커스텀 훅
const useLiteral = () => {
  const context = useContext(LiteralContext);
  if (!context) {
    throw new Error("useLiteral must be used within a StaticProvider");
  }
  return context;
};

export { StaticProvider, useLiteral };
