// src/app/api/buyers/export/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { parse } from 'json2csv';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get('city');
    const propertyType = searchParams.get('propertyType');
    const status = searchParams.get('status');
    const timeline = searchParams.get('timeline');
    const search = searchParams.get('search') || '';

    const where: any = {};
    city ? (where.city = city) : null;
    propertyType ? (where.propertyType = propertyType) : null;
    status ? (where.status = status) : null;
    timeline ? (where.timeline = timeline) : null;
    search
      ? (where.OR = [
          { fullName: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } },
          { phone: { contains: search, mode: 'insensitive' } },
        ])
      : null;

    const buyers = await prisma.buyer.findMany({
      where,
      orderBy: { updatedAt: 'desc' },
    });

    const fields = [
      'fullName',
      'email',
      'phone',
      'city',
      'propertyType',
      'bhk',
      'purpose',
      'budgetMin',
      'budgetMax',
      'timeline',
      'source',
      'notes',
      'tags',
      'status',
      'updatedAt',
    ];

    const csv = parse(buyers, { fields });

    return new Response(csv, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename="buyers.csv"',
      },
    });
  } catch (error) {
    console.error('CSV export failed:', error);
    return NextResponse.json({ error: 'Failed to export CSV' }, { status: 500 });
  }
}
