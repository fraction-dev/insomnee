import { Config } from 'jest'
import nextJest from 'next/jest.js'
import { pathsToModuleNameMapper } from 'ts-jest'
import { compilerOptions } from './tsconfig.json'

const createJestConfig = nextJest({
    dir: './',
})

/** @type {import('jest').Config} */
const customJestConfig: Config = {
    setupFilesAfterEnv: ['<rootDir>/prisma/singleton.ts'],
    moduleDirectories: ['node_modules', '<rootDir>/'],
    moduleNameMapper: {
        ...pathsToModuleNameMapper(compilerOptions.paths),
    },
    modulePaths: ['<rootDir>'],
    testEnvironment: 'jest-environment-jsdom',
    modulePathIgnorePatterns: ['__mocks__', '__fixtures__'],
    transformIgnorePatterns: [],
    watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
}

const asyncConfig = createJestConfig(customJestConfig)

function formatTransformIgnorePatterns(packagesToTranspile: string[], previousPatterns: string[]) {
    const transpiled = (packagesToTranspile ?? []).join('|')

    return [
        ...(transpiled
            ? [`/node_modules/(?!.pnpm)(?!(${transpiled})/)`, `/node_modules/.pnpm/(?!(${transpiled.replace(/\//g, '\\+')})@)`]
            : ['/node_modules/']),
        '^.+\\.module\\.(css|sass|scss)$',

        ...(previousPatterns || []),
    ]
}

const defaultExport = async () => {
    const config = await asyncConfig()

    config.transformIgnorePatterns = formatTransformIgnorePatterns(['ramda', 'uuid'], customJestConfig.transformIgnorePatterns ?? [])

    return config
}

export default defaultExport
