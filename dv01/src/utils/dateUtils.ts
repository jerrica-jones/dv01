import { LoanData } from "../loanDataTypes";

// Extract unique years from the data and return as a sorted array
export const getYears = (data: LoanData[]): string[] => {
    const yearSet = new Set<string>();
    data.forEach((loan) => {
        if (loan.year !== undefined && loan.year.trim() !== '') {
            yearSet.add(loan.year.trim());
        }
    });
    return Array.from(yearSet).sort((a, b) => parseInt(a) - parseInt(b));
};