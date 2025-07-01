import React from 'react';
import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';
import { LoanGraphData } from '../loanDataTypes';
import { formatUSD, trimAmount } from '../utils/format';

// Props for the Graph component
type GraphProps = {
    data: LoanGraphData[];
    xAxisKey: string;
    yAxisKey: string;
    barDataKey: string;
    className?: string;
};

/** Graph component to display a bar chart using recharts */
const Graph: React.FC<GraphProps> = ({ data, xAxisKey, yAxisKey, barDataKey, className }) => {
    return (
        <div className={className}>
            <ResponsiveContainer width="90%" height='100%'>
                <BarChart data={data} margin={{ top: 20, right: 0, left: 50, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey={xAxisKey} />
                    <YAxis tickFormatter={formatUSD} dataKey={yAxisKey} />
                    <Tooltip />
                    <Legend />
                    <Bar formatter={trimAmount} dataKey={barDataKey} fill="grey" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default React.memo(Graph);