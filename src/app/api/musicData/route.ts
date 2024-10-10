export const dynamic = 'force-dynamic';

import { NextResponse } from "next/server";
import { MusicData } from "../model/mongooseModel";
import connectDB from "../modules/ConnectDB";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const genreProperty = url.searchParams.get("genre");

    await connectDB();

    const query = { genre: genreProperty };
    const data = await MusicData.find(query).exec();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Request error:", error);
    return NextResponse.json(
      {
        error: "Error fetching data",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}