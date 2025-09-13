import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { buyerSchema } from '@/lib/validation';
import { parse } from 'csv-parse/sync';
import { z } from 'zod';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'CSV file is required' }, { status: 400 });
    }

    const text = await file.text();

    const records = parse(text, {
      columns: true,
      skip_empty_lines: true,
    });

    if (records.length > 200) {
      return NextResponse.json({ error: 'Maximum 200 rows allowed' }, { status: 400 });
    }

    const errors: Array<{ row: number; message: string }> = [];
    const validRows: z.infer<typeof buyerSchema>[] = [];

    const currentUserId = 'user-123';

    records.forEach((row, index) => {
      const parsed = buyerSchema.safeParse(row);
      if (!parsed.success) {
        errors.push({
          row: index + 2,
          message: parsed.error.issues.map(issue=>issue.message).join(', '),
        });
      } else {
        validRows.push(parsed.data);
      }
    });

    if (errors.length > 0) {
      return NextResponse.json({ errors }, { status: 400 });
    }

    await prisma.$transaction(
      validRows.map(row =>
        prisma.buyer.create({
          data: {
            ...row,
            ownerId: currentUserId,
            updatedAt: new Date(),
          },
        })
      )
    );

    return NextResponse.json({ message: `Imported ${validRows.length} rows successfully` });
  } catch (error) {
    console.error('CSV import error:', error);
    return NextResponse.json({ error: 'Failed to import CSV' }, { status: 500 });
  }
}


