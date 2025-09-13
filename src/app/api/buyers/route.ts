// src/app/api/buyers/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const city = searchParams.get('city');
    const propertyType = searchParams.get('propertyType');
    const status = searchParams.get('status');
    const timeline = searchParams.get('timeline');
    const search = searchParams.get('search') || '';

    const page = parseInt(searchParams.get('page') || '1', 10);
    const take = 10;
    const skip = (page - 1) * take;

    // Build the where object using ternary expressions
    const where: any = {
      city: city ? city : undefined,
      propertyType: propertyType ? propertyType : undefined,
      status: status ? status : undefined,
      timeline: timeline ? timeline : undefined,
      OR: search
        ? [
            { fullName: { contains: search, mode: 'insensitive' } },
            { email: { contains: search, mode: 'insensitive' } },
            { phone: { contains: search, mode: 'insensitive' } },
          ]
        : undefined,
    };

    // Prisma automatically ignores undefined fields
    const total = await prisma.buyer.count({ where });

    const buyers = await prisma.buyer.findMany({
      where,
      orderBy: { updatedAt: 'desc' },
      skip,
      take,
    });

    return NextResponse.json({
      buyers,
      pagination: {
        total,
        page,
        pageSize: take,
        totalPages: Math.ceil(total / take),
      },
    });
  } catch (error) {
    console.error('Failed to fetch leads:', error);
    return NextResponse.json(
      { error: 'Failed to fetch leads' },
      { status: 500 }
    );
  }
}
