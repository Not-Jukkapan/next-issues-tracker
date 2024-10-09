'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { AiFillBug } from 'react-icons/ai'
import classnames from 'classnames'

const NavBar = () => {

    const currentPath = usePathname();

    const links = [
        { labels: 'Dashboard', href: '/' },
        { labels: 'Issues', href: '/issues/list' }
    ]
    return (
        <nav className="flex space-x-6 border-b mb-6 h-14 px-5 items-center ">
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
        </nav>
    )
}

export default NavBar

