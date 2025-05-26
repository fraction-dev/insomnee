'use client'

import { GlobeIcon } from 'lucide-react'

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '~/components/ui/dropdown-menu'
import { useChangeLanguage } from '~/hooks/shared/useChangeLanguage'

import { Button } from '../ui/button'

const LANGUAGES = [
    { code: 'en', name: 'English' },
    { code: 'ru', name: 'Русский' },
    { code: 'ro', name: 'Română' },
    { code: 'ua', name: 'Українська' },
]

export const LanguageSwitcher = () => {
    const { changeLanguage, currentLanguage } = useChangeLanguage()

    const handleLanguageChange = (language: (typeof LANGUAGES)[number]) => {
        changeLanguage(language.code)
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                    <GlobeIcon className="size-4" />
                    {LANGUAGES.find((language) => language.code === currentLanguage)?.name}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {LANGUAGES.map((language) => (
                    <DropdownMenuItem key={language.code} onClick={() => handleLanguageChange(language)}>
                        {language.name}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
