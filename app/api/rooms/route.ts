// app/api/rooms/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@/lib/generated/prisma';

const prisma = new PrismaClient();

// GET: /api/rooms - Fetch all rooms
export async function GET() {
  try {
    const rooms = await prisma.room.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json(rooms);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch rooms' }, { status: 500 });
  }
}

// POST: /api/rooms - Add a new room
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      title,
      description,
      location,
      price,
      image,
      available,
      ownerId
    } = body;

    const newRoom = await prisma.room.create({
      data: {
        title,
        description,
        location,
        price,
        image,
        available,
        ownerId
      },
    });

    // ✅ Add this line to log the result
    console.log("Room created:", newRoom);

    return NextResponse.json(newRoom);
  } catch (error) {
    console.error('POST /api/rooms error:', error);
    return NextResponse.json({ error: 'Failed to create room' }, { status: 500 });
  }
}



