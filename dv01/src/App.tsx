import React, { useCallback, useEffect, useState } from 'react';
import './App.css'
import Graph from './components/Graph';
import Dropdown from './components/Dropdown';
import { getData } from './request/api';
import Table from './components/Table';
import { GRADE_LABELS, QUARTER_LABELS, OWNERSHIP_OPTIONS, TERMS } from './constants';
import { aggregateData } from './utils/aggregate';
import { LoanData } from './loanDataTypes';
import { getYears } from './utils/dateUtils';
import { formatUSD, formatForGraph } from './utils/format'; 

const App: React.FC = () => {
    const [loanData, setLoanData] = useState<LoanData[]>([]);
    const [homeOwnership, setHomeOwnership] = useState<string>('All');
    const [quarter, setQuarter] = useState<string>('All');
    const [term, setTerm] = useState<string>('All');
    const [year, setYear] = useState<string>('All');
    const [loading, setLoading] = useState<boolean>(true);
    const [gradeAmounts, setGradeAmounts] = useState<{ [key: string]: number }[]>([]);
    const [resetGradeAmounts, setResetGradeAmounts] = useState<{ [key: string]: number }[]>([]);
    const [yearOptions, setYearOptions] = useState<string[]>(['All']);

    // Load data in and set the reset grade amounts
    useEffect(() => {
        const loadData = async () => {
            try {
                const result = await getData();
                setYearOptions(['All', ...getYears(result)]);
                setLoanData(result);
                setResetGradeAmounts(aggregateData(result, 'All', 'All', 'All', 'All'));
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    // Reset grade amounts
    const resetData = useCallback(() => {
        setLoading(true);
        setHomeOwnership('All');
        setQuarter('All');
        setTerm('All');
        setYear('All');
        setGradeAmounts(resetGradeAmounts);
        setLoading(false);
    }, [resetGradeAmounts]);

    // Update grade amounts when filter choices change
    useEffect(() => {
        if (homeOwnership === 'All' && quarter === 'All' && term === 'All' && year === 'All') {
            resetData();
        } else {
            setLoading(true);
            console.log('adding aggregate data ', loanData.length);
            setGradeAmounts(aggregateData(loanData, homeOwnership, quarter, term, year));
            setLoading(false);
        }
    }, [loanData, homeOwnership, quarter, term, year, resetGradeAmounts]);

    if (loading) {
        return <div className='loading'>Loading...</div>;
    }

    return (
        <div className="App">
            <div className='filter-container'>
                <Dropdown
                    className='filter-dropdown'
                    label="Home Ownership"
                    options={OWNERSHIP_OPTIONS}
                    value={homeOwnership}
                    onChange={setHomeOwnership}
                />
                <Dropdown
                    className='filter-dropdown'
                    label="Quarter"
                    options={QUARTER_LABELS}
                    value={quarter}
                    onChange={setQuarter}
                />
                <Dropdown
                    className='filter-dropdown'
                    label="Term"
                    options={TERMS}
                    value={term}
                    onChange={setTerm}
                />
                <Dropdown
                    className='filter-dropdown'
                    label="Year"
                    options={yearOptions}
                    value={year}
                    onChange={setYear}
                />
                {/* Reset button wrapper to ensure proper alignment */}
                <div className='reset-button-wrapper'>
                    <button className={'reset-button'} onClick={resetData}>Reset</button>
                </div>
            </div>
            <div className='data-container'>
                <h2>Loan Data</h2>
                <Table 
                    columnHeaders={GRADE_LABELS}
                    data={gradeAmounts}
                    className={'loan-table'}
                    formatter={formatUSD}
                />
                <Graph className={'loan-graph'} data={formatForGraph(gradeAmounts)} xAxisKey={'grade'} yAxisKey={'amount'} barDataKey={'amount'} />
            </div>
        </div>
    );
};

export default App;