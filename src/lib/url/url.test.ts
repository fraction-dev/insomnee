import { concatUrl, getURLSearchParams } from './url'

describe('concatUrl', () => {
    it('Basic case, concat base with one segment', () => {
        expect(concatUrl('https://www.google.com', 'search')).toBe('https://www.google.com/search')
    })

    it('Concat base with multiple segments', () => {
        expect(concatUrl('https://www.google.com', 'search', 'images')).toBe('https://www.google.com/search/images')
    })

    it('Concat base with query params', () => {
        expect(concatUrl('https://www.google.com', { q: 'hello world' })).toBe('https://www.google.com?q=hello%20world')
    })

    it('Concat base with multiple query params', () => {
        expect(concatUrl('https://www.google.com', { q: 'hello world' }, { hl: 'en' })).toBe('https://www.google.com?q=hello%20world&hl=en')
    })

    it('Concat base with multiple query params with array values', () => {
        expect(concatUrl('https://www.google.com', { q: ['hello world', 'foo bar'] })).toBe(
            'https://www.google.com?q%5B0%5D=hello%20world&q%5B1%5D=foo%20bar',
        )
    })

    it('Concat base with multiple query params with array values and other params', () => {
        expect(concatUrl('https://www.google.com', { q: ['hello world', 'foo bar'] }, { hl: 'en' })).toBe(
            'https://www.google.com?q%5B0%5D=hello%20world&q%5B1%5D=foo%20bar&hl=en',
        )
    })

    it('Skip null in query', () => {
        expect(concatUrl('https://www.google.com', { q: null })).toBe('https://www.google.com')
    })

    it('Skip undefined in query', () => {
        expect(concatUrl('https://www.google.com', { q: undefined })).toBe('https://www.google.com')
    })

    it('Concat multiple query params with array values and other params', () => {
        expect(concatUrl('https://www.google.com', { q: ['hello world', 'foo bar'] }, { hl: 'en', foo: 'bar' })).toBe(
            'https://www.google.com?q%5B0%5D=hello%20world&q%5B1%5D=foo%20bar&hl=en&foo=bar',
        )
    })

    it('Works with different protocols', () => {
        expect(concatUrl('http://www.google.com', { q: ['hello world', 'foo bar'] }, { hl: 'en', foo: 'bar' })).toBe(
            'http://www.google.com?q%5B0%5D=hello%20world&q%5B1%5D=foo%20bar&hl=en&foo=bar',
        )
        expect(concatUrl('postgres://www.google.com', { q: ['hello world', 'foo bar'] }, { hl: 'en', foo: 'bar' })).toBe(
            'postgres://www.google.com?q%5B0%5D=hello%20world&q%5B1%5D=foo%20bar&hl=en&foo=bar',
        )
    })

    it('Preserve port', () => {
        expect(concatUrl('http://www.google.com:8080', { q: ['hello world', 'foo bar'] }, { hl: 'en', foo: 'bar' })).toBe(
            'http://www.google.com:8080?q%5B0%5D=hello%20world&q%5B1%5D=foo%20bar&hl=en&foo=bar',
        )
    })

    it('Works with numbers', () => {
        expect(concatUrl('http://www.google.com', { q: 1 }, { hl: 2 })).toBe('http://www.google.com?q=1&hl=2')
    })

    it('Works with number arrays', () => {
        expect(concatUrl('http://www.google.com', { q: [1, 2] })).toBe('http://www.google.com?q%5B0%5D=1&q%5B1%5D=2')
    })

    it('Works with booleans', () => {
        expect(concatUrl('https://www.google.com', { q: true })).toBe('https://www.google.com?q=true')
    })

    it('Works with boolean arrays', () => {
        expect(concatUrl('https://www.google.com', { q: [true, false] })).toBe('https://www.google.com?q%5B0%5D=true&q%5B1%5D=false')
    })

    it('Removes double slashes from base', () => {
        expect(concatUrl('https://www.google.com//hey', { q: [true, false] })).toBe(
            'https://www.google.com/hey?q%5B0%5D=true&q%5B1%5D=false',
        )
    })

    it('Removes double slashes from segments', () => {
        expect(concatUrl('https://www.google.com', 'hey//look/no//double/slashes')).toBe(
            'https://www.google.com/hey/look/no/double/slashes',
        )
    })

    it('Works with segments with trailing slashes', () => {
        expect(concatUrl('https://www.google.com', 'no/trailing/slash/')).toBe('https://www.google.com/no/trailing/slash')
        expect(concatUrl('https://www.google.com', 'no/trailing/slash/', 'and/here/also/')).toBe(
            'https://www.google.com/no/trailing/slash/and/here/also',
        )
    })

    it('Works with segments with starting slashes', () => {
        expect(concatUrl('https://www.google.com', '/no/starting/slash')).toBe('https://www.google.com/no/starting/slash')
        expect(concatUrl('https://www.google.com', '/no/starting/slash', '/and/here/also')).toBe(
            'https://www.google.com/no/starting/slash/and/here/also',
        )
    })

    it('Works with URL without hostname', () => {
        expect(concatUrl('/no/hostname', '/segment1', '/segment2', { q: 'foo' })).toBe('/no/hostname/segment1/segment2?q=foo')
    })

    it('Skips null and undefined segments', () => {
        expect(concatUrl('https://www.google.com', null, undefined, 'segment1', null, undefined, 'segment2', { q: 'foo' })).toBe(
            'https://www.google.com/segment1/segment2?q=foo',
        )
    })
})

describe('getURLSearchParams', () => {
    it('Works with basic URL', () => {
        expect(getURLSearchParams('https://www.google.com')).toEqual({})
    })

    it('Works with URL with query params', () => {
        expect(getURLSearchParams('https://www.google.com?q=hello&hl=en')).toEqual({ q: 'hello', hl: 'en' })
    })

    it('Works with URL with query params and array values', () => {
        expect(getURLSearchParams('https://www.google.com?q%5B0%5D=hello&q%5B1%5D=world')).toEqual({ q: ['hello', 'world'] })
    })

    it('Works with URL with query params and array values and other params', () => {
        expect(getURLSearchParams('https://www.google.com?q%5B0%5D=hello&q%5B1%5D=world&hl=en')).toEqual({
            q: ['hello', 'world'],
            hl: 'en',
        })
    })
})
