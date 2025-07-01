export type LoanData = {
    year: string;
    quarter: string;
    grade: string;
    homeOwnership: string;
    term: string;
    currentBalance: string;
};

// Data structure for graphing purposes
export type LoanGraphData = {
    Grade: string;
    Amount: number;
};