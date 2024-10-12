import { connectDB } from '@/lib/db';
import { UserModel } from '@/lib/models/User';
import { NextResponse } from 'next/server';

export const GET = async () => {
  try {
    await connectDB();
    const users = await UserModel.find();
    return new NextResponse(JSON.stringify(users), { status: 200 });
  } catch (error: any) {
    return new NextResponse("Error in fetching users" + error.message, { status: 500 })
  }
};