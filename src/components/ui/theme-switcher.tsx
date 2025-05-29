import { LaptopMinimalIcon, MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useCallback } from 'react'

import { Button } from './button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './dropdown-menu'

export const ThemeSwitcher = () => {
    const { theme, setTheme } = useTheme()

    const handleThemeChange = useCallback((theme: string) => setTheme(theme), [setTheme])

    const isLight = theme === 'light'
    const isDark = theme === 'dark'
    const isSystem = theme === 'system'

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size="icon" variant="outline">
                    {isLight && <SunIcon />}
                    {isDark && <MoonIcon />}
                    {isSystem && <LaptopMinimalIcon />}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleThemeChange('light')}>
                    <SunIcon /> Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleThemeChange('system')}>
                    <LaptopMinimalIcon /> System
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleThemeChange('dark')}>
                    <MoonIcon /> Dark
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
