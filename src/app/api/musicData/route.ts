import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import MusicData from './model/mongooseModel';

export async function GET() {
  try {
    // 데이터베이스 연결
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.DATABASE_URL as string);
    }

    // 데이터 조회
    const data = await MusicData.find({});

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching data' }, { status: 500 });
  } finally {
    // 데이터베이스 연결 종료
    if (mongoose.connection.readyState === 1) {
      await mongoose.disconnect();
    }
  }
}
