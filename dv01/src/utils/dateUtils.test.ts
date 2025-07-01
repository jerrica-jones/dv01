import { LoanData } from "../loanDataTypes";
import { getYears } from "./dateUtils";

/** Test utility functions in dateUtils.ts */
describe('Date Utility Functions', () => {
    test('getYears extracts unique sorted years', () => {
        const data: LoanData[] = [
            { year: '2021', grade: '', term: '', homeOwnership: '', quarter: '', currentBalance: '' },
            { year: '2020', grade: '', term: '', homeOwnership: '', quarter: '', currentBalance: '' },
            { year: '2021', grade: '', term: '', homeOwnership: '', quarter: '', currentBalance: '' },
            { year: ' 2019 ', grade: '', term: '', homeOwnership: '', quarter: '', currentBalance: '' },
            { year: undefined as any, grade: '', term: '', homeOwnership: '', quarter: '', currentBalance: '' },
        ];
        const years = getYears(data);
        expect(years).toEqual(['2019', '2020', '2021']);
    });
    
    test('getYears skips empty years', () => {
        const data: LoanData[] = [
            { year: '2021', grade: '', term: '', homeOwnership: '', quarter: '', currentBalance: '' },
            { year: '2020', grade: '', term: '', homeOwnership: '', quarter: '', currentBalance: '' },
            { year: ' ', grade: '', term: '', homeOwnership: '', quarter: '', currentBalance: '' },
            { year: ' 2019 ', grade: '', term: '', homeOwnership: '', quarter: '', currentBalance: '' },
            { year: '', grade: '', term: '', homeOwnership: '', quarter: '', currentBalance: '' },
        ];
        const years = getYears(data);
        expect(years).toEqual(['2019', '2020', '2021']);
    });
        
    test('getYears returns no years if none given', () => {
        const data: LoanData[] = [];
        const years = getYears(data);
        expect(years).toEqual([]);
    });
});