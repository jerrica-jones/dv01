import { LoanGraphData } from "../loanDataTypes";

// Format number as USD currency
export const formatUSD = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(value);
};

// Trim to two decimal places without rounding errors
export const trimAmount = (value: number): number => {
    return parseFloat(value.toFixed(2));
};

// Format data for recharts graphing purposes
export const formatForGraph = (data: { [key: string]: number }[]): LoanGraphData[] => {
    if (data[0] === undefined) {
        return [];
    }
    return Object.entries(data[0]).map(([key, value]) => {
        return {
            Grade: key,
            Amount: Number(value)
        }
    });
};