import React from 'react'
import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'
import delay from 'delay'
import { Card, Flex, Heading, Text } from '@radix-ui/themes'
import IssueStatusBadge from '@/app/components/IssueStatusBadge'
import ReactMarkdown from 'react-markdown'

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
            <Heading>{issue.title}</Heading>
            <Flex className='gap-3 my-2'>
                <IssueStatusBadge status={issue.status} />
                <Text>{issue.createdAt.toDateString()}</Text>
            </Flex>
            <Card className='prose mt-4'>
                <ReactMarkdown>
                    {issue.description}
                </ReactMarkdown>
            </Card>
        </div>
    )
}

export default IssueDetailPage