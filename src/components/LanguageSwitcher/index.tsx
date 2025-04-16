'use client'

import { GlobeIcon } from 'lucide-react'
import { useState } from 'react'

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '~/components/ui/dropdown-menu'

import { Button } from '../ui/button'

const LANGUAGES = [
    { code: 'en', name: 'English' },
    { code: 'ru', name: 'Русский' },
    { code: 'ro', name: 'Română' },
    { code: 'ua', name: 'Українська' },
]
export const LanguageSwitcher = () => {
    const [selectedLanguage, setSelectedLanguage] = useState(LANGUAGES[0])

    const handleLanguageChange = (language: (typeof LANGUAGES)[number]) => {
        setSelectedLanguage(language)
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                    <GlobeIcon className="size-4" />
                    {selectedLanguage.name}
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
