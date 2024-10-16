import prisma from '@/prisma/client'
import { Box, Flex, Grid } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import EditIssueButton from './EditIssueButton'
import IssueDetails from './IssueDetails'
import DeleteIssueButton from './DeleteIssueButton'
import { getServerSession } from 'next-auth'
import authOption from '@/app/auth/authOption'

interface Props {
    params: {
        id: string
    }
}

const IssueDetailPage = async ({ params: { id } }: Props) => {
    const session = await getServerSession(authOption);
    const issue = await prisma.issue.findUnique({
        where: {
            id: +id
        }
    })
    if (!issue) notFound();
    return (
        <Grid columns={{ initial: "1", sm: "5" }} gap={'5'}>
            <Box className='md:col-span-4'>
                <IssueDetails issue={issue} />
            </Box>
            {session &&
                <Box>
                    <Flex gap={'4'} direction={"column"}>
                        <EditIssueButton issueId={issue.id} />
                        <DeleteIssueButton issueId={issue.id} />
                    </Flex>
                </Box>
            }
        </Grid>
    )
}

export default IssueDetailPage