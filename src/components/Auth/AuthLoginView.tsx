'use client'

import { ChevronDown } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import { ROUTES } from '~/config/routes'
import { signIn } from '~/lib/authClient'
import { cn } from '~/lib/utils'

import { Button } from '../ui/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible'
import { Separator } from '../ui/separator'
import { AuthEmailLoginView } from './AuthEmailLoginView'

export const AuthLoginView = () => {
    const [isExpanded, setIsExpanded] = useState(false)
    const [isShowMoreOptionsVisible, setIsShowMoreOptionsVisible] = useState(true)

    const handleGoogleLogin = async () => {
        await signIn.social({
            provider: 'google',
        })
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
                <h2 className="text-2xl font-medium">Login to insomnee.</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                    Automate business tasks, stay organized, and make informed decisions effortlessly.
                </p>

                <Button onClick={handleGoogleLogin}>
                    <Image src="/images/logos/google.svg" alt="Google" width={20} height={20} />
                    <span>Continue with Google</span>
                </Button>
            </div>

            <Separator />

            <Collapsible>
                <div className="flex flex-col gap-4">
                    {isShowMoreOptionsVisible && (
                        <CollapsibleTrigger
                            className="flex items-center gap-2 w-full justify-center text-sm cursor-pointer"
                            onClick={() => setIsExpanded(!isExpanded)}
                        >
                            <span>More options</span>
                            <ChevronDown className={cn('size-4 transition-transform duration-300', isExpanded && 'rotate-180')} />
                        </CollapsibleTrigger>
                    )}

                    <CollapsibleContent
                        className={cn(
                            'text-popover-foreground outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
                        )}
                    >
                        <AuthEmailLoginView onSuccess={() => setIsShowMoreOptionsVisible(false)} />
                    </CollapsibleContent>
                </div>
            </Collapsible>

            <p className="text-muted-foreground text-xs leading-relaxed">
                By clicking continue, you acknowledge that you have read and agree to Insomnee's{' '}
                <Link href={ROUTES.TERMS} className="underline">
                    Terms of Service
                </Link>{' '}
                and{' '}
                <Link href={ROUTES.PRIVACY} className="underline">
                    Privacy Policy
                </Link>
                .
            </p>
        </div>
    )
}
