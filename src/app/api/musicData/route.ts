import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
// import MusicData from './model/mongooseModel';


const schema = new mongoose.Schema({
  _id: String,
  src: String,
});

const MusicData = mongoose.models.MusicData || mongoose.model('MusicData', schema, 'MusicData');




export async function GET(request: Request) {
  console.dir(request)
  try {
    console.log("트라이 블록으로 들어왔어!!!!!!!!!!!!!!!!!")
    const url = new URL(request.url);
    const genre = url.searchParams.get('genre');

    // 데이터베이스 연결
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect('mongodb+srv://chousik01:1q2w3e4r@cluster.lv77n.mongodb.net/LoAmusic?retryWrites=true&w=majority');
    }

    const query = {genre : genre}
    console.log(query)
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
