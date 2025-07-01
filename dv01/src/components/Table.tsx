import React from 'react';

// Props for the Table component
type TableProps<T> = {
    columnHeaders: string[];
    data: T[];
    className?: string;
    formatter: (value: any) => string;
};

// Table component to display data in a tabular format
const Table = <T,>({ columnHeaders, data, className, formatter }: TableProps<T>) => {
    return (
        <div className="loan-table-container">
            <table className={className}>
                <thead>
                    <tr>
                        {columnHeaders.map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr key={index}>
                            {columnHeaders.map((header, colIndex) => (
                                <td key={colIndex}>{formatter(row[header as keyof T])}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default React.memo(Table);