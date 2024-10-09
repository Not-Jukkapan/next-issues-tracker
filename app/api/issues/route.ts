import { NextRequest, NextResponse } from "next/server";
import prisma from '@/prisma/client'
import { createIssueSchema } from "../../validationSchema";



export async function POST(req: NextRequest) {
    
    if (!req.body) {
        return NextResponse.json({ error: 'Body is required' }, { status: 400 });
    }
    const body = await req.json();



    const validateion = createIssueSchema.safeParse(body);

    if (!validateion.success) {
        return NextResponse.json({ error: validateion.error.format() }, { status: 400 });
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