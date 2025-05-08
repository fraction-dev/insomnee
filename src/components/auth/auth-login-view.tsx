'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Trans, useTranslation } from 'react-i18next'

import { ROUTES } from '~/config/routes'
import { signIn } from '~/lib/auth-client'

import { Button } from '../ui/button'

export const AuthLoginView = () => {
    const { t } = useTranslation(['auth'])

    const handleGoogleLogin = () => {
        signIn.social({
            provider: 'google',
            callbackURL: `${window.location.origin}${ROUTES.DASHBOARD.INDEX}`,
        })
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
                <h2 className="text-2xl font-medium">{t('auth:login.title')}</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">{t('auth:login.description')}</p>

                <Button onClick={handleGoogleLogin}>
                    <Image src="/images/logos/google.svg" alt="Google" width={20} height={20} />
                    <span>{t('auth:login.continueWithGoogle')}</span>
                </Button>
            </div>

            {/* <Separator />

            <Collapsible>
                <div className="flex flex-col gap-4">
                    {isShowMoreOptionsVisible && (
                        <CollapsibleTrigger
                            className="flex items-center gap-2 w-full justify-center text-sm cursor-pointer"
                            onClick={() => setIsExpanded(!isExpanded)}
                        >
                            <span>{t('auth:login.moreOptions')}</span>
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
            </Collapsible> */}

            <p className="text-muted-foreground text-xs leading-relaxed">
                <Trans
                    i18nKey="auth:login.terms"
                    components={{
                        1: (
                            <Link href={ROUTES.TERMS} className="underline">
                                {t('common:termsOfService.title')}
                            </Link>
                        ),
                        2: (
                            <Link href={ROUTES.PRIVACY} className="underline">
                                {t('common:privacyPolicy.title')}
                            </Link>
                        ),
                    }}
                />
            </p>
        </div>
    )
}
