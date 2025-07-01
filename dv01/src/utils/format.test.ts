import { trimAmount } from "./format";
import { formatUSD, formatForGraph } from "./format";

/** Tests for utility functions in format.ts */
describe('Utility Functions', () => {
    test('formatUSD formats a number as USD', () => {
        expect(formatUSD(1234.56)).toBe('$1,234.56');
        expect(formatUSD(1234.563045)).toBe('$1,234.56');
        expect(formatUSD(0)).toBe('$0.00');
    });

    test('trimAmount trims to two decimal places', () => {
        expect(trimAmount(3.456)).toBe(3.46);
        expect(trimAmount(0.451)).toBe(0.45);
        expect(trimAmount(5)).toBe(5);
    });

    test('formatForGraph converts data to graph format', () => {
        const input = [{ 'Grade 1': 1000, 'Grade 2': 2000 }];
        const output = formatForGraph(input);
        expect(output).toEqual([
            { Grade: 'Grade 1', Amount: 1000 },
            { Grade: 'Grade 2', Amount: 2000 }
        ]);

        expect(formatForGraph([])).toEqual([]);
    });
});