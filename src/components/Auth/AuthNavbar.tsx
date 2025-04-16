'use client'

import Image from 'next/image'
import Link from 'next/link'

import { ROUTES } from '~/config/routes'

import { LanguageSwitcher } from '../LanguageSwitcher'

export const AuthNavbar = () => {
    return (
        <div className="flex items-center justify-between gap-12 w-full px-12">
            <Link href={ROUTES.HOME}>
                <Image src="/images/logo.svg" alt="logo" width={25} height={25} />
            </Link>

            <LanguageSwitcher />
        </div>
    )
}
