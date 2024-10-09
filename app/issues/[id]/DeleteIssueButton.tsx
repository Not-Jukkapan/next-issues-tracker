'use client'
import { Spinner } from '@/app/components'
import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { set } from 'zod'

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
    const router = useRouter();
    const [error, setError] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    const deleteIssue = async () => {
        try {
            // throw new Error('Not implemented')
            setIsDeleting(true)
            await axios.delete(`/api/issues/${issueId}`)
            router.push('/issues')
            router.refresh()
        } catch (error) {
            setIsDeleting(false)
            setError(true)
        }
    }

    return (
        <>

            <AlertDialog.Root>
                <AlertDialog.Trigger>
                    <Button color='red' disabled={isDeleting}>
                        Delete issue
                        {
                            isDeleting && <Spinner />
                        }
                    </Button>
                </AlertDialog.Trigger>
                <AlertDialog.Content>
                    <AlertDialog.Title>
                        Confirm Delete
                    </AlertDialog.Title>
                    <AlertDialog.Description>
                        Are you sure you want to delete this issue? This action cannot be undone.
                    </AlertDialog.Description>
                    <Flex mt={'4'} gap={'3'}>
                        <AlertDialog.Cancel>
                            <Button variant='soft' color='gray'>Cancel</Button>
                        </AlertDialog.Cancel>
                        <AlertDialog.Action>
                            <Button color='red' onClick={deleteIssue}>Delete Issue</Button>
                        </AlertDialog.Action>
                    </Flex>
                </AlertDialog.Content>
            </AlertDialog.Root>
            <AlertDialog.Root open={error}>
                <AlertDialog.Content>
                    <AlertDialog.Title>
                        Error
                    </AlertDialog.Title>
                    <AlertDialog.Description>
                        There was an error deleting the issue. Please try again.
                    </AlertDialog.Description>
                    <Button color='gray' variant='soft' mt={'2'} onClick={() => {
                        setError(false)
                    }}>
                        OK
                    </Button>
                </AlertDialog.Content>
            </AlertDialog.Root>
        </>
    )
}

export default DeleteIssueButton