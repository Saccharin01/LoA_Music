import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import MusicData from './model/mongooseModel';

// 이 라우트는 동적으로 처리되어야 함을 명시
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const genre = url.searchParams.get('genre');
    
    await mongoose.connect(process.env.DATABASE_URL as string);
    console.log(process.env.DATABASE_URL)

    const query = {genre : genre}
    const data = await MusicData.find(query);

    return NextResponse.json(data);
  } catch (error) {
    console.error(error)
    return NextResponse.json({
       error: 'Error fetching data',
      errorObj : error
    }, { status: 500 });
  }
}