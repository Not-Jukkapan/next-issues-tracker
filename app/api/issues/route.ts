import { NextRequest, NextResponse } from "next/server";
import { z } from 'zod';
import prisma from '@/prisma/client'

const createIssueSchema = z.object({
    title: z.string().min(1).max(255),
    description: z.string().min(1),
})

export async function POST(req: NextRequest) {
    
    if (!req.body) {
        return NextResponse.json({ error: 'Body is required' }, { status: 400 });
    }
    const body = await req.json();



    const validateion = createIssueSchema.safeParse(body);

    if (!validateion.success) {
        return NextResponse.json({ error: validateion.error.errors }, { status: 400 });
    }


    const newIssue = await prisma.issue.create({
        data: {
            title: body.title,
            description: body.description
        }
    }

    )

    return NextResponse.json(newIssue, { status: 201 });

}