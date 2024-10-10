import { NextRequest, NextResponse } from 'next/server';
import { TaskModel } from '@/lib/models/Task';
import { connectDB } from '@/lib/db';
import { getToken } from 'next-auth/jwt';

export const GET = async (req: NextRequest) => {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });

  if (!token) {
    return NextResponse.json(
      {
        message: 'Unauthorized Access',
      },
      { status: 401 },
    );
  }
  try {
    await connectDB();
    const tasks = await TaskModel.find({ user: token?.email });
    return NextResponse.json(
      {
        tasks: tasks,
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error('Error Fetching tasks:', error.message);
    return NextResponse.json(
      {
        message: 'Server error',
      },
      { status: 500 },
    );
  }
};

export async function POST(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });

  if (!token) {
    return NextResponse.json(
      {
        message: 'Unauthorized Access',
      },
      { status: 401 },
    );
  }
  try {
    await connectDB();
    const body = await req.json();
    const { title, description, status, priority, dueDate, user } = body;

    const newTask = new TaskModel({
      title,
      description,
      status,
      priority,
      dueDate,
      user,
    });

    await newTask.save();

    return NextResponse.json(
      {
        message: 'Task added successfully',
        task: newTask,
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error('Error adding task:', error.message);
    return NextResponse.json(
      {
        message: 'Server error',
      },
      { status: 500 },
    );
  }
}

export async function PUT(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });

  if (!token) {
    return NextResponse.json(
      {
        message: 'Unauthorized Access',
      },
      { status: 401 },
    );
  }
  try {
    await connectDB();
    const body = await req.json();
    const { _id, title, description, status, priority, dueDate } = body;

    if (!_id) {
      return NextResponse.json(
        {
          message: 'Task ID is required',
        },
        { status: 400 },
      );
    }

    const updatedTask = await TaskModel.findByIdAndUpdate(
      _id,
      {
        title,
        description,
        status,
        priority,
        dueDate,
      },
      { new: true },
    );

    if (!updatedTask) {
      return NextResponse.json(
        {
          message: 'Task not found',
        },
        { status: 404 },
      );
    }

    return NextResponse.json({
      task: updatedTask,
      status: 200,
    });
  } catch (error: any) {
    console.error('Error updating task:', error.message);
    return NextResponse.json(
      {
        message: 'Server error',
      },
      { status: 500 },
    );
  }
}

export async function DELETE(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });

  if (!token) {
    return NextResponse.json(
      {
        message: 'Unauthorized Access',
      },
      { status: 401 },
    );
  }
  try {
    await connectDB();
    const body = await req.json();
    const { _id } = body;

    if (!_id) {
      return NextResponse.json(
        {
          message: 'Task ID is required',
        },
        { status: 400 },
      );
    }

    const result = await TaskModel.deleteOne({ _id });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        {
          message: 'Task not found',
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        message: 'Task deleted successfully',
      },

      { status: 200 },
    );
  } catch (error: any) {
    console.error('Error deleting task:', error.message);
    return NextResponse.json(
      {
        message: 'Server error',
      },
      { status: 500 },
    );
  }
}
