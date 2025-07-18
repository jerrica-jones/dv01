import { GRADES, GRADE_LABELS, QUARTER_MAP, GRADE_MAP } from "../constants";
import { LoanData } from "../loanDataTypes";

// Helper function to compare strings without case sensitivity and trim whitespace
const equalsIgnoreCase = (a: string | undefined, b: string | undefined): boolean => {
    if (b === undefined || a === undefined) {
        return false;
    }
    return a.trim().toLowerCase() === b.trim().toLowerCase();
};

/**
 * This function aggregates loan data based on the provided filters.
 * It sums the current balance for each grade and returns the aggregated data.
 * 
 * @param data Loan data to be aggregated
 * @param homeOwnership Home ownership filter value
 * @param quarter Quarter filter value
 * @param term Term filter value
 * @param year Year filter value
 * @returns An array containing an object with grades as keys and their
 * corresponding total amounts as values
 */
export const aggregateData = (data: LoanData[],
    homeOwnership: string,
    quarter: string,
    term: string,
    year: string
): { [key: string]: number }[] => {

    const gradeData = GRADE_LABELS.reduce<Record<string, number>>((gD, grade) => {
        gD[grade] = 0;
        return gD;
    }, {});

    data.forEach((loan) => {
        if ((equalsIgnoreCase(homeOwnership, 'All') || equalsIgnoreCase(loan.homeOwnership, homeOwnership)) &&
            (equalsIgnoreCase(quarter, 'All') || equalsIgnoreCase(loan.quarter, QUARTER_MAP.get(quarter))) &&
            (equalsIgnoreCase(term, 'All') || equalsIgnoreCase(loan.term, term)) &&
            (equalsIgnoreCase(year, 'All') || equalsIgnoreCase(loan.year, year))) {
            const grade = GRADE_MAP.get(loan.grade);
            if (grade !== undefined) {
                gradeData[grade] += parseFloat(loan.currentBalance);
            }
        }
    });
    const aggregatedData: { [key: string]: number }[] = [gradeData];

    return aggregatedData;
};