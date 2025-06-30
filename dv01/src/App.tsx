import React, { useCallback, useEffect, useState } from 'react';
import './App.css'
import Graph from './components/Graph';
import Dropdown from './components/Dropdown';
import { getData } from './request/api';
import Table from './components/Table';


type LoanData = {
    year: number;
    quarter: number;
    grade: number;
    homeOwnership: string;
    term: string;
    currentBalance: number;
};

const grades = ['1', '2', '3', '4', '5', '6'];
const gradeHeaders = ['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6'];
const quarterOptions = ['All', 'Q1', 'Q2', 'Q3', 'Q4'];
const homeOwnershipOptions = ['All', 'Rent', 'Mortgage', 'Own'];
const termOptions = ['All', '36 Months', '60 Months'];

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

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="App">
            <Dropdown
                label="Home Ownership"
                options={homeOwnershipOptions}
                value={homeOwnership}
                onChange={setHomeOwnership}
            />
            <Dropdown
                label="Quarter"
                options={quarterOptions}
                value={quarter}
                onChange={setQuarter}
            />
            <Dropdown
                label="Term"
                options={termOptions}
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
            <Table columnHeaders={gradeHeaders} data={gradeAmounts} />
            <Graph data={gradeAmounts} xAxisKey={'Grade'} yAxisKey={'Amount'} barDataKey={'amount'} />
        </div>
    );
};

export default App;