import Link from 'next/link'
import React from 'react'
import { AiFillBug } from 'react-icons/ai'




const NavBar = () => {
    const links = [
        { labels: 'Dashboard', href: '/' },
        { labels: 'Issues', href: '/issue' }
    ]
    return (
        <nav className="flex space-x-6 border-b mb-6 h-14 px-5 items-center ">
            <Link href="/">
                <AiFillBug /> </Link>
            <ul className='flex space-x-6'>
                {links.map((link) => (
                    <li><Link className='text-zinc-500 hover:text-zinc-800 transition-colors' href={link.href}>{link.labels}</Link></li>
                ))}

            </ul>
        </nav>
    )
}

export default NavBar