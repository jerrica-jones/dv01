import React, { useCallback, useEffect, useState } from 'react';
import './App.css'
import Graph from './components/Graph';
import Dropdown from './components/Dropdown';
import { getData } from './request/api';
import Table from './components/Table';
import { GRADE_LABELS, QUARTER_LABELS, OWNERSHIP_OPTIONS, TERMS } from './constants';
import { aggregateData, LoanData } from './utils/aggregate';


const App: React.FC = () => {
    const [loanData, setLoanData] = useState<{ [key: string]: LoanData }[]>([]);
    const [homeOwnership, setHomeOwnership] = useState<string>('All');
    const [quarter, setQuarter] = useState<string>('All');
    const [term, setTerm] = useState<string>('All');
    const [year, setYear] = useState<string>('All');
    const [loading, setLoading] = useState<boolean>(true);
    const [gradeAmounts, setGradeAmounts] = useState<{ [key: string]: number }[]>([]);
    const [resetGradeAmounts, setResetGradeAmounts] = useState<{ [key: string]: number }[]>([]);
    const [yearOptions, setYearOptions] = useState<string[]>(['All']);

    useEffect(() => {
        const loadData = async () => {
            try {
                const result = await getData();
                setLoanData(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
        setResetGradeAmounts(aggregateData([], 'All', 'All', 'All', 'All'));
    }, []);

    const resetData = useCallback(() => {
        setLoading(true);
        setHomeOwnership('All');
        setQuarter('All');
        setTerm('All');
        setYear('All');
        setGradeAmounts(resetGradeAmounts);
        setLoading(false);
    }, [resetGradeAmounts]);

    useEffect(() => {
        if (homeOwnership === 'All' && quarter === 'All' && term === 'All' && year === 'All') {
            resetData();
        } else {
            setLoading(true);
            setGradeAmounts(aggregateData(loanData, homeOwnership, quarter, term, year));
            setLoading(false);
        }
    }, [loanData, homeOwnership, quarter, term, year]);


    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="App">
            <Dropdown
                label="Home Ownership"
                options={OWNERSHIP_OPTIONS}
                value={homeOwnership}
                onChange={setHomeOwnership}
            />
            <Dropdown
                label="Quarter"
                options={QUARTER_LABELS}
                value={quarter}
                onChange={setQuarter}
            />
            <Dropdown
                label="Term"
                options={TERMS}
                value={term}
                onChange={setTerm}
            />
            <Dropdown
                label="Year"
                options={yearOptions}
                value={year}
                onChange={setYear}
            />
            <button onClick={resetData}>Reset</button>
            <h2>Loan Data</h2>
            <Table columnHeaders={GRADE_LABELS} data={gradeAmounts} />
            <Graph data={gradeAmounts} xAxisKey={'Grade'} yAxisKey={'Amount'} barDataKey={'amount'} />
        </div>
    );
};

export default App;