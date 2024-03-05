import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const apikey = process.env.OPENWEATHERAPIKEY;
    console.log(apikey)
    const lat = 40.7128;
    const lon = -74.006;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}`;
    const res = await axios.get(url)
    return NextResponse.json(res.data)

  } catch (error) {
    console.log("Error fetching current forecast data");
    return new Response("Error fetching current forecast data", {
      status: 500,
    });
  }
}
