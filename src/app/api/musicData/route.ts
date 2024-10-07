import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import MusicData from './model/mongooseModel';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const genre = url.searchParams.get('genre');

    // 데이터베이스 연결
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.DATABASE_URL as string);
    }

    const query = {genre : genre}
    console.log(query)
    const data = await MusicData.find(query);

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
