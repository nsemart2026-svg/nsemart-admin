import { NextRequest, NextResponse } from "next/server";
import { registerUser } from "@/lib/users";

export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json();

  try {
    await registerUser(name, email, password);
    return NextResponse.json({ success: true });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    return new NextResponse(err.message, { status: 400 });
  }
}
