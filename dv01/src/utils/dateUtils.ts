import { LoanData } from "../loanDataTypes";

export const getYears = (data: LoanData[]): string[] => {
    const yearSet = new Set<string>();
    data.forEach((loan) => {
        if (loan.year !== undefined && loan.year.trim() !== '') {
            yearSet.add(loan.year.trim());
        }
    });
    return Array.from(yearSet).sort((a, b) => parseInt(a) - parseInt(b));
};