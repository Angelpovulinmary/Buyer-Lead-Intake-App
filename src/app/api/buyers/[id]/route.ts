// src/app/buyers/new/page.tsx or wherever this file is

// src/app/api/buyers/[id]/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { buyerSchema } from '@/lib/validation';
import { z } from 'zod';

// Extract the buyer ID from the URL
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const buyerId = params.id;

    // Parse and validate input
    const body = await request.json();
    const parsed = buyerSchema.partial().safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors }, { status: 400 });
    }
    const data = parsed.data;

    // Extract updatedAt for concurrency check
    const clientUpdatedAt = new Date(data.updatedAt as string);
    delete data.updatedAt; // remove it before updating

    // Simulate getting current user (replace with your auth logic)
    const currentUserId = 'user-123'; 

    // Fetch existing record
    const existing = await prisma.buyer.findUnique({
      where: { id: buyerId },
    });

    if (!existing) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
    }

    if (existing.ownerId !== currentUserId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    if (existing.updatedAt.getTime() !== clientUpdatedAt.getTime()) {
      return NextResponse.json({ error: 'Record stale. Please refresh.' }, { status: 409 });
    }

    // Prepare data diff for history
    const diff = Object.keys(data).reduce((acc, key) => {
      if ((existing as any)[key] !== (data as any)[key]) {
        acc[key] = { from: (existing as any)[key], to: (data as any)[key] };
      }
      return acc;
    }, {} as Record<string, { from: any; to: any }>);

    // Perform update
    const updated = await prisma.buyer.update({
      where: { id: buyerId },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    });

    // Log into buyer_history if changes occurred
    if (Object.keys(diff).length > 0) {
      await prisma.buyerHistory.create({
        data: {
          buyerId,
          changedBy: currentUserId,
          changedAt: new Date(),
          diff,
        },
      });
    }

    return NextResponse.json({ buyer: updated });
  } catch (error) {
    console.error('Failed to edit lead:', error);
    return NextResponse.json({ error: 'Failed to edit lead' }, { status: 500 });
  }
}
