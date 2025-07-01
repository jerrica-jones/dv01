import { aggregateData } from "./aggregate";
import { LoanData } from "../loanDataTypes";

describe('Utility Functions', () => {
    test('aggregateData aggregates loans correctly with All filter values', () => {
        const data: LoanData[] = [
            {
                grade: '1',
                term: '36 Months',
                homeOwnership: 'Rent',
                quarter: '1',
                year: '2020',
                currentBalance: '1000'
            },
            {
                grade: '2',
                term: '36 Months',
                homeOwnership: 'Own',
                quarter: '1',
                year: '2020',
                currentBalance: '2000'
            },
            {
                grade: '1',
                term: '60 Months',
                homeOwnership: 'OWN',
                quarter: '3',
                year: '2022',
                currentBalance: '1500'
            },
        ];

        const result = aggregateData(data, 'All', 'All', 'All', 'All');

        expect(result[0]['Grade 1']).toBe(2500); // two records, 1000 + 1500
        expect(result[0]['Grade 2']).toBe(2000); // one record, 2000
    });

    test('aggregateData aggregates loans correctly - when grade missing', () => {
        const data: LoanData[] = [
            {
                grade: '1',
                term: '36 Months',
                homeOwnership: 'Rent',
                quarter: '1',
                year: '2020',
                currentBalance: '1000'
            },
            {
                grade: '2',
                term: '36 Months',
                homeOwnership: 'Rent',
                quarter: '1',
                year: '2020',
                currentBalance: '2000'
            },
            {
                grade: '1',
                term: '36 Months',
                homeOwnership: 'Rent',
                quarter: '1',
                year: '2020',
                currentBalance: '1500'
            },
            {
                grade: '',
                term: '36 Months',
                homeOwnership: 'Rent',
                quarter: '1',
                year: '2020',
                currentBalance: '1500'
            },
        ];

        const result = aggregateData(data, 'Rent', 'Q1', '36 Months', '2020');

        expect(result[0]['Grade 1']).toBe(2500); // two records, 1000 + 1500
        expect(result[0]['Grade 2']).toBe(2000); // one record, 2000
    });

    test('aggregateData aggregates loans correctly - does not match term filter', () => {
        const data: LoanData[] = [
            {
                grade: '1',
                term: '36 Months',
                homeOwnership: 'Rent',
                quarter: '1',
                year: '2020',
                currentBalance: '1000'
            },
            {
                grade: '2',
                term: '60 Months',
                homeOwnership: 'Rent',
                quarter: '1',
                year: '2020',
                currentBalance: '2000'
            },
            {
                grade: '1',
                term: '36 Months',
                homeOwnership: 'Rent',
                quarter: '1',
                year: '2020',
                currentBalance: '1500'
            },
        ];

        const result = aggregateData(data, 'Rent', 'Q1', '60 Months', '2020');

        expect(result[0]['Grade 1']).toBe(0); // does not match term filter
        expect(result[0]['Grade 2']).toBe(2000); // one record, 2000
    });

    test('aggregateData aggregates loans correctly - does not match ownership filter', () => {
        const data: LoanData[] = [
            {
                grade: '1',
                term: '36 Months',
                homeOwnership: 'Rent',
                quarter: '1',
                year: '2020',
                currentBalance: '1000'
            },
            {
                grade: '2',
                term: '36 Months',
                homeOwnership: 'Own',
                quarter: '1',
                year: '2020',
                currentBalance: '2000'
            },
            {
                grade: '1',
                term: '36 Months',
                homeOwnership: 'Rent',
                quarter: '1',
                year: '2020',
                currentBalance: '1500'
            },
        ];

        const result = aggregateData(data, 'Rent', 'Q1', '36 Months', '2020');

        expect(result[0]['Grade 1']).toBe(2500); // two records, 1000 + 1500
        expect(result[0]['Grade 2']).toBe(0); // does not match ownership filter
    });

    test('aggregateData aggregates loans correctly - does not match quarter filter', () => {
        const data: LoanData[] = [
            {
                grade: '1',
                term: '36 Months',
                homeOwnership: 'Rent',
                quarter: '3',
                year: '2020',
                currentBalance: '1000'
            },
            {
                grade: '2',
                term: '36 Months',
                homeOwnership: 'Own',
                quarter: '1',
                year: '2020',
                currentBalance: '2000'
            },
            {
                grade: '1',
                term: '36 Months',
                homeOwnership: 'Rent',
                quarter: '1',
                year: '2020',
                currentBalance: '1500'
            },
        ];

        const result = aggregateData(data, 'Rent', 'Q1', '36 Months', '2020');

        expect(result[0]['Grade 1']).toBe(1500); // one record, 1500
        expect(result[0]['Grade 2']).toBe(0); // does not match ownership filter
    });

    test('aggregateData aggregates loans correctly - does not match year', () => {
        const data: LoanData[] = [
            {
                grade: '1',
                term: '36 Months',
                homeOwnership: 'Rent',
                quarter: '1',
                year: '2020',
                currentBalance: '1000'
            },
            {
                grade: '2',
                term: '36 Months',
                homeOwnership: 'Rent',
                quarter: '1',
                year: '2020',
                currentBalance: '2000'
            },
            {
                grade: '1',
                term: '36 Months',
                homeOwnership: 'Rent',
                quarter: '1',
                year: '2022',
                currentBalance: '1500'
            },
        ];

        const result = aggregateData(data, 'Rent', 'Q1', '36 Months', '2020');

        expect(result[0]['Grade 1']).toBe(1000); // one record, 1000
        expect(result[0]['Grade 2']).toBe(2000); // does not match ownership filter
    });
});