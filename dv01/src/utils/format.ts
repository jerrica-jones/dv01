import { LoanGraphData } from "../loanDataTypes";

export const formatUSD = (value: number): string => {
    return new Intl.NumberFormat('en-US', { 
        style: 'currency',
        currency: 'USD'
    }).format(value);
};

export const trimAmount = (value: number): number => {
    return parseFloat(value.toFixed(2));
};

export const formatForGraph = (data: { [key: string]: number }[]): LoanGraphData[] => {
    if (data[0] === undefined) {
        return [];
    }
    return Object.entries(data[0]).map(([key, value]) => {
        return { 
            grade: key,
            amount: Number(value)
        }});
};