"use client"

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'

const Navbar = () => {
    const isUserLoggedIn = true;

    return (
        <nav className='flex-between w-full mb-16 pt-3 '>
            <Link href='/' className='flex gap-2 flex-center'>
                <Image src='/assets/images/logo.svg' alt='SmartText Logo'
                    className='object-contain' width={30} height={30} />
                <p className='logo_text'>SmartText</p>
            </Link>
{/* Desktop Navigation */}
            <div className='sm:flex hidden'>
                {isUserLoggedIn ? (<div className='flex gap-3 md:gap-5'>
                    <Link href='/create-prompt' className='black_btn'>Create Post</Link>
                </div>) : (<></>)}
            </div>
        </nav>
    )
}

export default Navbar