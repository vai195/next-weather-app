import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const apikey = process.env.OPENWEATHERAPIKEY;
    const searchParams = req.nextUrl.searchParams
    const lat = searchParams.get('lat');
    const lon = searchParams.get('lon');
    const url = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apikey}`;
    const res = await fetch(url, {
        next: {revalidate: 3600}
    })
    const dailyData = await res.json();
    return NextResponse.json(dailyData);

  } catch (error) {
    console.log("Error fetching daily forecast data");
    return new Response("Error fetching daily forecast data", {
      status: 500,
    });
  }
}