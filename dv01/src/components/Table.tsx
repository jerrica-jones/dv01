import React from 'react';

type TableProps<T> = {
    columnHeaders: string[];
    data: T[];    
};


const Table = <T,>({ columnHeaders, data }: TableProps<T>) => {
    return (
        <div className="loan-table-container">
            <table className="loan-table">
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
                                <td key={colIndex}>{String(row[header as keyof T])}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default React.memo(Table);