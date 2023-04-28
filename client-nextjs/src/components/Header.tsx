import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Header() {
    const urlPath = useRouter().pathname;
    const usersPath = /\/users/ // Regular Expression

    return (
        <nav className='flex justify-between border-b px-4 items-center'>
            <div className='py-2'>
                <Link href={'/'} className='text-2xl'>HEROPHUMIPHAT</Link>
            </div>
            <ul className='flex space-x-3 uppercase'>
                {/* <li>
                    <Link href={'/'}>home</Link>
                </li> */}
                <li>
                    <Link href={'/users'} className={ usersPath.test(urlPath) ? 'font-bold text-blue-400' : ''}>users</Link>
                </li>
                <li>
                    <Link href={'/about'} className={urlPath === '/about' ? 'font-bold text-blue-400' : ''}>about</Link>
                </li>
            </ul>
        </nav>
    )
}