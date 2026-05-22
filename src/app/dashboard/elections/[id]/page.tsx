import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest) {
  try {
    const data = await request.json();
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop();
    return NextResponse.json({ election: { _id: id, ...data } });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 400 });
  }
}

export async function GET(request: NextRequest) {
  return NextResponse.json({ election: { _id: "1", title: "Sample", status: "live" } });
}