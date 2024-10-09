import React from 'react'
import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'
import delay from 'delay'
interface Props {
    params: {
        id: string
    }
}

const IssueDetailPage = async ({ params: { id } }: Props) => {

    // if (typeof id !== 'number') notFound();

    const issue = await prisma.issue.findUnique({
        where: {
            id: +id
        }
    })
    if (!issue) notFound();
    await delay(1000)
    return (
        <div>
            <p>{issue.title}</p>
            <p>{issue.description}</p>
            <p>{issue.status}</p>
            <p>{issue.createdAt.toDateString()}</p>
        </div>
    )
}

export default IssueDetailPage