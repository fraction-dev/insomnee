import { getInitials, pluralize } from '.'

describe('getInitials', () => {
    it('should return the initials of a name', () => {
        expect(getInitials('John Doe')).toEqual('JD')
    })

    it('should return the initials of a name with a delimiter', () => {
        expect(getInitials('John Doe', { delimiter: '.' })).toEqual('J.D')
    })

    it('should return the initials of a name with a delimiter and a max number of initials', () => {
        expect(getInitials('John Doe', { delimiter: '.', maxInitials: 1 })).toEqual('J')
    })

    it('should strip punctuation', () => {
        expect(getInitials('John Doe', { stripPunctuation: true })).toEqual('JD')
    })

    it('should ignore words', () => {
        expect(getInitials('John Doe', { ignoreWords: ['Doe'] })).toEqual('J')
    })

    it('should include titles', () => {
        expect(getInitials('mr. John Doe')).toEqual('JD')
    })

    it('should include suffixes', () => {
        expect(getInitials('John Doe Jr.')).toEqual('JD')
    })

    it('should include titles and suffixes', () => {
        expect(getInitials('mr. John Doe Jr.')).toEqual('JD')
    })

    it('should include titles and suffixes and ignore words', () => {
        expect(getInitials('mr. John Doe Jr.', { ignoreWords: ['Doe'] })).toEqual('J')
    })

    it('should include titles and suffixes and ignore words and strip punctuation', () => {
        expect(getInitials('mr. John Doe Jr.', { ignoreWords: ['Doe'], stripPunctuation: true })).toEqual('J')
    })
})

describe('pluralize', () => {
    it('should pluralize a word ending in y', () => {
        expect(pluralize('item')).toEqual('items')
    })

    it('should pluralize a word ending in y', () => {
        expect(pluralize('foot')).toEqual('feet')
    })

    it('should pluralize a word ending in y', () => {
        expect(pluralize('person')).toEqual('people')
    })

    it('should pluralize a word ending in y', () => {
        expect(pluralize('mouse')).toEqual('mice')
    })
})
