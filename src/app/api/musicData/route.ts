import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import MusicData from './model/mongooseModel';

// Next.js의 환경 변수 접근 방식 사용
const DATABASE_URL = process.env.DATABASE_URL;

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const genre = url.searchParams.get('genre');

    // 환경 변수 확인을 위한 로깅
    console.log('Database URL:', DATABASE_URL);
    
    if (!DATABASE_URL) {
      throw new Error('Database URL is not defined');
    }

    // 데이터베이스 연결
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(DATABASE_URL);
    }

    const query = {genre: genre}
    const data = await MusicData.find(query);

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error details:', error);
    
    return NextResponse.json({
      error: 'Error fetching data',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}