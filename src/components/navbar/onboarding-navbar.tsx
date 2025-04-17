'use client'

import Image from 'next/image'
import Link from 'next/link'

import { ROUTES } from '~/config/routes'
import { User } from '~/services/user/model'

import { LanguageSwitcher } from '../language-switcher'
import { UserMenu } from '../user/user-menu'

interface Props {
    user?: User
}

export const OnboardingNavbar = ({ user }: Props) => {
    return (
        <div className="flex items-center justify-between gap-12 w-full px-12">
            <Link href={ROUTES.HOME}>
                <Image src="/images/logo.svg" alt="logo" width={25} height={25} />
            </Link>

            <div className="flex items-center gap-3">
                {user && <UserMenu user={user} />}
                <LanguageSwitcher />
            </div>
        </div>
    )
}
