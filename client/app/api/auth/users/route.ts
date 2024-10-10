import { connectDB } from '@/lib/db';
import { TaskModel } from '@/lib/models/Task';
import { UserModel } from '@/lib/models/User';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async () => {
  try {
    await connectDB();
    const users = await UserModel.find();
    return new NextResponse(JSON.stringify(users), { status: 200 });
  } catch (error: any) {
    return new NextResponse("Error in fetching users" + error.message, { status: 500 })
  }
};

export const POST = async (req: NextRequest) => {
    try {
      await connectDB();
      const body = await req.json();
      const { user } = body;
      const tasks = await TaskModel.find({ user });
      return new NextResponse(JSON.stringify(tasks), { status: 200 });
    } catch (error: any) {
      return new NextResponse("Error in fetching users" + error.message, { status: 500 })
    }
  };
