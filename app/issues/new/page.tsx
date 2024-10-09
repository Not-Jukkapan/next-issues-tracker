'use client'
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';
import { createIssueSchema } from '@/app/validationSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Callout, TextField } from '@radix-ui/themes';
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
// import SimpleMDE from "react-simplemde-editor";
import { z } from 'zod';
import dynamic from 'next/dynamic';

const SimpleMDE = dynamic(
    () => import('react-simplemde-editor'), { ssr: false });

type IssueForm = z.infer<typeof createIssueSchema>

const NewIssuePage =  () => {
    const router = useRouter();
    const { register, control, handleSubmit, formState: {
        errors
    } } = useForm<IssueForm>({
        resolver: zodResolver(createIssueSchema)
    });
    const [error, setError] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    const onSubmit = handleSubmit(async (data) => {
        try {
            setIsSubmitting(true)
            await axios.post('/api/issues', data)
            router.push('/issues')
        } catch (error) {
            setIsSubmitting(false)
            console.log(error);
            setError('An unexpected error occurred')
        }
    }
    )

    return (
        <div className='max-w-xl' >
            {error && <Callout.Root color='red'>
                <Callout.Text>
                    {error}
                </Callout.Text>
            </Callout.Root>}

            <form className='space-y-3' onSubmit={onSubmit}>
                <TextField.Root placeholder="Title"  {...register('title')} />
                <ErrorMessage>{errors.title?.message}</ErrorMessage>
                <Controller name='description' control={control} 
                    render={({ field }) => <SimpleMDE placeholder='Description...' {...field} />} />
                <ErrorMessage>{errors.description?.message}</ErrorMessage>
                <Button disabled={isSubmitting}>Submit new issue {isSubmitting && <Spinner />} </Button>

            </form >
        </div>
    )
}

export default NewIssuePage