'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { AiFillBug } from 'react-icons/ai'
import classnames from 'classnames'
import { useSession } from 'next-auth/react'
import { Avatar, Box, Container, DropdownMenu, Flex, Text } from '@radix-ui/themes'

const NavBar = () => {

    return (
        <nav className="border-b mb-6 py-3 px-5">
            <Container>
                <Flex justify={'between'}>
                    <Flex align={'center'} gap={'3'}>
                        <Link href="/">
                            <AiFillBug /> </Link>
                        <NabLink />
                    </Flex>
                    <AuthStatus />
                </Flex>
            </Container>
        </nav>
    )
}

const NabLink = () => {
    const currentPath = usePathname();
    const links = [
        { labels: 'Dashboard', href: '/' },
        { labels: 'Issues', href: '/issues/list' }
    ]
    return (
        <ul className='flex space-x-6'>
            {links.map((link, index) => (
                <li key={index}><Link
                    className=
                    {classnames({
                        'nav-link': true,
                        '!text-zinc-900': link.href === currentPath,

                    })}
                    href={link.href}>{link.labels}</Link></li>
            ))}
        </ul>
    )
}

const AuthStatus = () => {
    const { status, data: session } = useSession()
    if (status === 'loading') return null
    if (status === 'unauthenticated') return <Link className='nav-link' href='/api/auth/signin'>Sign In</Link>
    return (
        <Box>
            <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                    <Avatar className='cursor-pointer' src={session?.user!.image!} fallback="?"
                        size="2" radius='full' referrerPolicy='no-referrer' />
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                    <DropdownMenu.Label>
                        <Text size={'2'}>
                            {session!.user!.email}
                        </Text>
                    </DropdownMenu.Label>
                    <DropdownMenu.Item>
                        <Link href='/api/auth/signout'>Sign Out</Link>
                    </DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Root>
        </Box>)
}

export default NavBar

