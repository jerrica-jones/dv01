import { GRADES, GRADE_LABELS, QUARTER_MAP, GRADE_MAP } from "../constants";
import { LoanData } from "../loanDataTypes";

const equalsIgnoreCase = (a: string | undefined, b: string | undefined): boolean => {
    if (b === undefined || a === undefined) {
        return false;
    }
    return a.trim().toLowerCase() === b.trim().toLowerCase();
};

/**
 * This function aggregates loan data based on the provided filters.
 * It sums the current balance for each grade and returns the aggregated data
 * along with the years present in the given data set. I made this decision, so that
 * the data is only parsed once for both. This ensures the years are always in sync
 * with the data, and there's not some sort of mismatch. I considered making two separate
 * functions, but I wanted to optimize the performance and cut down on lag. Two separate
 * functions would have been easier to test.
 * 
 * @param data 
 * @param homeOwnership 
 * @param quarter 
 * @param term 
 * @param year 
 * @returns 
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
        if ((homeOwnership === 'All' || equalsIgnoreCase(loan.homeOwnership, homeOwnership)) &&
            (quarter === 'All' || equalsIgnoreCase(loan.quarter, QUARTER_MAP.get(quarter))) &&
            (term === 'All' || equalsIgnoreCase(loan.term, term)) &&
            (year === 'All' || equalsIgnoreCase(loan.year, year))) {
            const grade = GRADE_MAP.get(loan.grade);
            if (grade !== undefined) {
                gradeData[grade] += parseFloat(loan.currentBalance);
            }
        }
    });
    const aggregatedData: { [key: string]: number }[] = [gradeData];

    return aggregatedData;
};