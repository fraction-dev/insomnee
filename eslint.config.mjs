import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
import pluginNext from '@next/eslint-plugin-next'
import typescriptEslint from '@typescript-eslint/eslint-plugin'
import eslintConfigPrettier from 'eslint-config-prettier'
import importPlugin from 'eslint-plugin-import'
import onlyWarn from 'eslint-plugin-only-warn'
import pluginReact from 'eslint-plugin-react'
import pluginReactHooks from 'eslint-plugin-react-hooks'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import globals from 'globals'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

// Setup dirname for ESM
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Initialize flat compatibility layer for older configs
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
})

const eslintConfig = [
    ...compat.config({
        // extends: ['eslint:recommended', 'next'],
    }),
    eslintConfigPrettier,

    // Main configuration object
    {
        // React configuration
        ...pluginReact.configs.flat.recommended,

        // Language options
        languageOptions: {
            ...pluginReact.configs.flat.recommended.languageOptions,
            globals: {
                ...globals.serviceworker,
            },
        },

        // Plugins
        plugins: {
            onlyWarn,
            '@next/next': pluginNext,
            'react-hooks': pluginReactHooks,
            '@typescript-eslint': typescriptEslint,
            'simple-import-sort': simpleImportSort,
            import: importPlugin,
        },

        // Settings
        settings: {
            react: {
                version: 'detect',
            },
            tailwindcss: {
                whitelist: ['[radix].*', 'ph-no-capture'],
                cssFiles: [],
            },
        },

        // Rules grouped by category
        rules: {
            // Next.js rules
            ...pluginNext.configs.recommended.rules,
            ...pluginNext.configs['core-web-vitals'].rules,
            '@next/next/no-img-element': 'off',

            // React and React Hooks rules
            ...pluginReactHooks.configs.recommended.rules,
            'react/react-in-jsx-scope': 'off',
            'react/prop-types': 'off',
            'react/no-unescaped-entities': 'off',
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'error',
            'react/jsx-boolean-value': 'error',
            'react/jsx-sort-props': [
                'warn',
                {
                    callbacksLast: true,
                    shorthandFirst: true,
                    ignoreCase: true,
                    reservedFirst: true,
                    noSortAlphabetically: true,
                },
            ],

            // Import rules
            'import/first': 'warn',
            'import/newline-after-import': 'warn',
            'import/no-duplicates': 'error',
            'import/no-named-as-default-member': 'off',
            'import/no-named-as-default': 0,
            'no-duplicate-imports': 'error',
            'no-restricted-imports': ['error'],
            'simple-import-sort/imports': 'warn',
            'simple-import-sort/exports': 'warn',

            // Accessibility rules
            'jsx-a11y/label-has-associated-control': 'off',
            'jsx-a11y/no-noninteractive-tabindex': 'off',
            'jsx-a11y/click-events-have-key-events': 'off',
            'jsx-a11y/no-noninteractive-element-interactions': 'off',
            'jsx-a11y/no-autofocus': 'off',
            'jsx-a11y/no-static-element-interactions': 'off',

            // TypeScript rules
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/triple-slash-reference': 'off',
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/no-floating-promises': 'off',
            '@typescript-eslint/promise-function-async': 'off',
            '@typescript-eslint/no-confusing-void-expression': 'off',
            '@typescript-eslint/strict-boolean-expressions': 'off',
            '@typescript-eslint/dot-notation': 'off',
            '@typescript-eslint/consistent-type-assertions': 'off',
            '@typescript-eslint/no-non-null-assertion': 'off',
            '@typescript-eslint/no-unsafe-assignment': 'off',
            '@typescript-eslint/prefer-nullish-coalescing': 'off',
            '@typescript-eslint/no-misused-promises': 'off',
            '@typescript-eslint/no-unsafe-member-access': 'off',
            '@typescript-eslint/no-unsafe-return': 'off',
            '@typescript-eslint/no-unsafe-call': 'off',
            '@typescript-eslint/no-unsafe-argument': 'off',
            '@typescript-eslint/consistent-type-definitions': 'off',

            // General rules
            'no-console': 'error',
            'no-unused-expressions': 'warn',
        },
    },

    // File ignores
    {
        ignores: [
            'dist/**',
            'node_modules/**',
            '**/*.test.tsx',
            '**/*.mdx',
            '**/*.md',
            '**/*.config.ts',
            '**/*.config.mjs',
            '**/.next/**',
            '**/.vercel/**',
            '**/.env*',
            '**/.env.local',
        ],
    },
]

export default eslintConfig
