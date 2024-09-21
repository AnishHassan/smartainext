"use client"

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'

const Navbar = () => {
    const isUserLoggedIn = true;
    const [providers, setProviders] = useState(null);
    const [toggleDropdown, setToggleDropdown] = useState(false);

    useEffect(() => {
        const setProviders = async () => {
            const response = await getProviders();

            setProviders(response);
        }
        setProviders();
    }, [])
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
                    <button type='button' onClick={signOut} className='outline_btn'> Sign Out</button>
                    <Link href='/profile'>
                        <Image src='/assets/images/logo.svg' className='rounded-full'
                            alt='profile' width={37} height={37} />
                    </Link>
                </div>) : (<>
                    {providers && Object.values(providers).map((provider) => (
                        <button type='button' key={provider.name} onClick={() => signIn(provider.id)} className='black_btn'>
                            Sign In
                        </button>
                    ))}
                </>)}
            </div>

            {/* Mobile Navigation */}
            <div className='sm:hidden flex relative'>
                {isUserLoggedIn ? (<div className='flex'>
                    <Image src='/assets/images/logo.svg' className='rounded-full'
                        alt='profile' width={37} height={37} onClick={() => setToggleDropdown((prev) => !prev)} />
                </div>) : <>
                    {providers && Object.values(providers).map((provider) => (
                        <button type='button' key={provider.name} onClick={() => signIn(provider.id)} className='black_btn'>
                            Sign In
                        </button>
                    ))}</>}
            </div>
        </nav>
    )
}

export default Navbar