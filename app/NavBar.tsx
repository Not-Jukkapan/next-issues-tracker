'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { AiFillBug } from 'react-icons/ai'
import classnames from 'classnames'
import { useSession } from 'next-auth/react'
import { Avatar, Box, Container, DropdownMenu, Flex, Text } from '@radix-ui/themes'

const NavBar = () => {

    const currentPath = usePathname();
    const { status, data: session } = useSession()
    const links = [
        { labels: 'Dashboard', href: '/' },
        { labels: 'Issues', href: '/issues/list' }
    ]
    console.log(session?.user?.email);

    return (
        <nav className="border-b mb-6 py-3 px-5">
            <Container>
                <Flex justify={'between'}>
                    <Flex align={'center'} gap={'3'}>
                        <Link href="/">
                            <AiFillBug /> </Link>
                        <ul className='flex space-x-6'>
                            {links.map((link, index) => (
                                <li key={index}><Link
                                    className=
                                    {classnames({
                                        'text-zinc-900:': currentPath === link.href,
                                        'text-zinc-500': currentPath !== link.href,
                                        'hover:text-zinc-800 transition-colors': true
                                    })}
                                    href={link.href}>{link.labels}</Link></li>
                            ))}
                        </ul>
                    </Flex>
                    <Box>
                        {status === 'authenticated' &&
                            <DropdownMenu.Root>
                                <DropdownMenu.Trigger>
                                    <Avatar className='cursor-pointer' src={session?.user!.image!} fallback="?"
                                        size="2" radius='full' />
                                </DropdownMenu.Trigger>
                                <DropdownMenu.Content>
                                    <DropdownMenu.Label>
                                        <Text size={'2'}>
                                            {session?.user!.email}
                                        </Text>
                                    </DropdownMenu.Label>
                                    <DropdownMenu.Item>
                                        <Link href='/api/auth/signout'>Sign Out</Link>
                                    </DropdownMenu.Item>
                                </DropdownMenu.Content>
                            </DropdownMenu.Root>
                        }
                        {status === 'unauthenticated' && <Link href='/api/auth/signin'>Sign In</Link>}

                    </Box>
                </Flex>
            </Container>
        </nav>
    )
}

export default NavBar

