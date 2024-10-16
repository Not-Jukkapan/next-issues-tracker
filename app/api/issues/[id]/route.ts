import authOption from "@/app/auth/authOption";
import { issueSchema } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
    request: NextRequest,
    { params: { id } }: {
        params: { id: string }
    }) {
    const session = await getServerSession(authOption)
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const body = await request.json();
    const validation = issueSchema.safeParse(body);
    if (!validation.success) {
        return NextResponse.json({ error: validation.error.format() }, { status: 400 });
    }

    const issue = await prisma.issue.findUnique({
        where: {
            id: +id
        }
    })
    if (!issue)
        return NextResponse.json({ error: 'Invilid issue' }, { status: 404 });

    const updatedIssue = await prisma.issue.update({
        where: {
            id: issue.id
        },
        data: {
            title: body.title,
            description: body.description
        }
    })

    return NextResponse.json(updatedIssue, { status: 200 });

}


export async function DELETE(
    request: NextRequest,
    { params }: {
        params: { id: string }
    }) {
    const session = await getServerSession(authOption)
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const issue = await prisma.issue.findUnique({
        where: {
            id: +params.id
        }
    })
    if (!issue)
        return NextResponse.json({ error: 'Invalid issue' }, { status: 404 });

    await prisma.issue.delete({
        where: {
            id: issue.id
        }
    })

    return NextResponse.json({ message: 'Issue deleted' }, { status: 200 });
}

