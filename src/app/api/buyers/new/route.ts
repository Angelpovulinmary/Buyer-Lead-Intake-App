import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

// Example schema using Zod
const buyerSchema = z.object({
  fullName: z.string().min(2).max(80),
  email: z.string().email().optional(),
  phone: z.string().regex(/^\d{10,15}$/),
  city: z.enum(['Chandigarh','Mohali','Zirakpur','Panchkula','Other']),
  propertyType: z.enum(['Apartment','Villa','Plot','Office','Retail']),
  bhk: z.string().optional(),
  purpose: z.enum(['Buy','Rent']),
  budgetMin: z.number().int().optional(),
  budgetMax: z.number().int().optional(),
  timeline: z.enum(['0-3m','3-6m','>6m','Exploring']),
  source: z.enum(['Website','Referral','Walk-in','Call','Other']),
  notes: z.string().max(1000).optional(),
  tags: z.array(z.string()).optional(),
});

export async function POST(req: Request) {
  try {
    const session = await getSession(req); // implement your auth logic here
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const parsed = buyerSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const data = parsed.data;

    if (data.budgetMin !== undefined && data.budgetMax !== undefined) {
      if (data.budgetMax < data.budgetMin) {
        return NextResponse.json({ error: "budgetMax must be >= budgetMin" }, { status: 400 });
      }
    }

    if (['Apartment','Villa'].includes(data.propertyType)) {
      if (!data.bhk) {
        return NextResponse.json({ error: "bhk is required for Apartment or Villa" }, { status: 400 });
      }
    }

    const newBuyer = await prisma.buyer.create({
      data: {
        ...data,
        ownerId: session.user.id,
      }
    });

    await prisma.buyerHistory.create({
      data: {
        buyerId: newBuyer.id,
        changedBy: session.user.id,
        diff: { newData: data },
      }
    });

    return NextResponse.json(newBuyer);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// Example function to get session from request
async function getSession(req: Request) {
  // Implement your NextAuth or custom auth logic here
  return { user: { id: 'user-123' } };
}
