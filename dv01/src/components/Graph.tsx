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

type GraphProps = {
    data: { [key: string]: number }[];
    xAxisKey: string;
    yAxisKey: string;
    barDataKey: string;
};

const Graph: React.FC<GraphProps> = ({ data, xAxisKey, yAxisKey, barDataKey }) => {
    return (
        <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={xAxisKey} />
                <YAxis dataKey={yAxisKey} />
                <Tooltip />
                <Legend />
                <Bar dataKey={barDataKey} fill="#8884d8" />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default React.memo(Graph);