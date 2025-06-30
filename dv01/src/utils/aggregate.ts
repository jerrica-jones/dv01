import { GRADES, GRADE_LABELS } from "../constants";

export type LoanData = {
    year: string;
    quarter: string;
    grade: string;
    homeOwnership: string;
    term: string;
    amount: string;
};

export const aggregateData = (data: { [key: string]: LoanData }[],
    homeOwnership: string,
    quarter: string,
    term: string,
    year: string
): { [key: string]: number }[] => {
    const aggregatedData: { [key: string]: number }[] = GRADE_LABELS.map((label) => ({
        [label]: 0,
    }));

    return aggregatedData;
};