import { getDayOfYear, getPhraseIndexForToday } from '../script.js';

describe('getPhraseIndexForToday', () => {
    it('should return index 0 for January 1st, the first day of the year', () => {
        const dateString = '2024-01-01';
        const date = new Date(dateString);

        expect(getPhraseIndexForToday(date)).toBe(0);
    });

    it('should return the correct index 82 for March 23rd, 2024', () => {
        const dateString = '2024-03-23';
        const date = new Date(dateString);

        expect(getPhraseIndexForToday(date)).toBe(82);
    });

    it('should reset and return index 0 for March 24th, 2024 when quotes exceed 82', () => {
        const dateString = '2024-03-24';
        const date = new Date(dateString);

        expect(getPhraseIndexForToday(date)).toBe(0);
    });

    it('should return index 36 for December 31st, 2024 (leap year)', () => {
        const dateString = '2024-12-31';
        const date = new Date(dateString);

        expect(getPhraseIndexForToday(date)).toBe(36);
    });

    it('should return index 35 for December 31st, 2023 (non-leap year)', () => {
        const dateString = '2023-12-31';
        const date = new Date(dateString);

        expect(getPhraseIndexForToday(date)).toBe(35);
    });
});
