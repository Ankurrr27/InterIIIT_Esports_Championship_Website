import { dbConnect } from "@/lib/mongodb";
import User from "@/lib/models/User";
import { NextResponse } from "next/server";

export async function GET() {
  await dbConnect();
  
  const user = await User.findOneAndUpdate(
    { email: "ankurp22singh@gmail.com" },
    { $set: { role: "ADMIN", college: "IIIT Kota" } },
    { new: true }
  );

  return NextResponse.json({ success: true, user });
}
