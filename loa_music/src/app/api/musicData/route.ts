import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  _id: String,
  src: String,
});

const MusicData = mongoose.model('MusicData', schema, 'MusicData');

export async function GET() {
  try {
    // 데이터베이스 연결
    await mongoose.connect(process.env.DATABASE_URL as string);

    // 데이터 조회
    const data = await MusicData.find({});

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching data' }, { status: 500 });
  } finally {
    await mongoose.disconnect();
  }
}
