import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import MusicData from './model/mongooseModel';

// export const dynamic = 'force-dynamic';

async function connectDB() {
  try {
    if (mongoose.connection.readyState === 1) {
      return; // 이미 연결된 상태
    }
    
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL is not defined');
    }

    await mongoose.connect(process.env.DATABASE_URL);
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection error:', error);
    throw error;
  }
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const genre = url.searchParams.get('genre');
    
    await connectDB();

    const query = {genre : genre};
    const data = await MusicData.find(query);

    return NextResponse.json(data);
  } catch (error) {
    console.error('Request error:', error);
    return NextResponse.json({
      error: 'Error fetching data',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}