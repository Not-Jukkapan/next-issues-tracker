import { NextRequest, NextResponse } from "next/server";
import prisma from '@/prisma/client'
import { issueSchema } from "../../validationSchema";



export async function POST(req: NextRequest) {

    if (!req.body) {
        return NextResponse.json({ error: 'Body is required' }, { status: 400 });
    }
    const body = await req.json();



    const validateion = issueSchema.safeParse(body);

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