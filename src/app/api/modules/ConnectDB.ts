import mongoose from "mongoose";

/**
 * 데이터베이스에 연결 및 연결상태를 확인하는 함수입니다.
 * 먼저, 데이터베이스의 연결상태를 확인하고, 연결되어 있지 않을 경우 연결하는 로직으로 넘어갑니다.
 * 또한 환경변수 파싱 문제가 있을 경우, 오류 처리를 통해 개발자에게 알립니다.
 */


export default async function connectDB() : Promise<void>{
  try {
    if (mongoose.connection.readyState === 1) {
      console.log('Database alreadt connected');
      return; 
    }
    
    if (!process.env.DATABASE_URL) {
      throw new Error('ENV variable DATABASE_URL is not defined');
    }

    await mongoose.connect(process.env.DATABASE_URL);
    
    console.log('Database connected');

  } catch (error) {
    console.error('Database connection error:', error);
    throw error;
  }
}