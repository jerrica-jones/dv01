import React, { useCallback, useEffect, useState } from 'react';
import './App.css'
import Graph from './components/Graph';
import Dropdown from './components/Dropdown';
import { getData } from './request/api';
import Table from './components/Table';
import { GRADE_LABELS, QUARTER_LABELS, OWNERSHIP_OPTIONS, TERMS } from './constants';
import { aggregateData } from './utils/aggregate';
import { LoanData, LoanDataView } from './loanDataTypes';
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
    // Store the initial aggregated data for reset purposes
    const [resetGradeAmounts, setResetGradeAmounts] = useState<{ [key: string]: number }[]>([]);
    const [yearOptions, setYearOptions] = useState<string[]>(['All']);
    // Save various filter states for 'saved view'
    const [savedFilters, setSavedFilters] = useState<Map<string, LoanDataView>>(new Map());
    const [newViewLabelBox, setNewViewLabelBox] = useState<string>('');
    const [currentViewLabel, setCurrentViewLabel] = useState<string>('All');
    const [viewLabels, setViewLabels] = useState<string[]>([]);

    console.log('saved Filters ', savedFilters);
    // Load data in and set the reset grade amounts
    useEffect(() => {
        const loadData = async () => {
            try {
                const result = await getData();
                // Dynamically set year options based on data
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

    // Reset grade amounts
    const setFilters = useCallback((filterLabel: string) => {
        setLoading(true);
        const dataView: any = savedFilters.get(filterLabel);
        setHomeOwnership(dataView.homeOwnership);
        setQuarter(dataView.quarter);
        setTerm(dataView.term);
        setYear(dataView.year);
        setLoading(false);
    }, [savedFilters, term, quarter, homeOwnership, year]);

    // Reset grade amounts
    const createView = useCallback(() => {
        console.log('create view ');
        setLoading(true);
        const newFilter = {
            year: year,
            quarter: quarter,
            homeOwnership: homeOwnership,
            term: term
        };
        console.log(' new view filters ', newFilter);
        savedFilters.set(currentViewLabel, newFilter);
        setCurrentViewLabel(newViewLabelBox);
        setNewViewLabelBox('');
        setSavedFilters(savedFilters);
        setLoading(false);
    }, [savedFilters, term, quarter, homeOwnership, year, newViewLabelBox]);

    // Update grade amounts when filter choices change
    useEffect(() => {
        if (homeOwnership === 'All' && quarter === 'All' && term === 'All' && year === 'All') {
            resetData();
        } else {
            setLoading(true);
            setGradeAmounts(aggregateData(loanData, homeOwnership, quarter, term, year));
            setLoading(false);
        }
    }, [loanData, homeOwnership, quarter, term, year, resetGradeAmounts, resetData]);

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
                    dataTestId='homeOwnershipFilterDropdown'
                />
                <Dropdown
                    className='filter-dropdown'
                    label="Quarter"
                    options={QUARTER_LABELS}
                    value={quarter}
                    onChange={setQuarter}
                    dataTestId='quarterFilterDropdown'
                />
                <Dropdown
                    className='filter-dropdown'
                    label="Term"
                    options={TERMS}
                    value={term}
                    onChange={setTerm}
                    dataTestId='termFilterDropdown'
                />
                <Dropdown
                    className='filter-dropdown'
                    label="Year"
                    options={yearOptions}
                    value={year}
                    onChange={setYear}
                    dataTestId='yearFilterDropdown'
                />
                {/* Reset button wrapper to ensure proper alignment */}
                <div className='reset-button-wrapper'>
                    <button className={'reset-button'} onClick={resetData}>Reset</button>
                </div>
            </div>
            <Dropdown
                className='filter-dropdown'
                label="Saved Views"
                options={Array.from(savedFilters.keys())}
                value={currentViewLabel}
                onChange={setFilters}
                dataTestId='yearFilterDropdown'
            />
            <input
                type='text'
                value={newViewLabelBox}
                onChange={(event) => { setNewViewLabelBox(event.target.value) }}
            />
            <button className={'reset-button'} onClick={createView}>Save View</button>
            <div className='data-container'>
                <h2>Loan Data</h2>
                <Table
                    columnHeaders={GRADE_LABELS}
                    data={gradeAmounts}
                    className={'loan-table'}
                    formatter={formatUSD}
                />
                <Graph className={'loan-graph'} data={formatForGraph(gradeAmounts)} xAxisKey={'Grade'} yAxisKey={'Amount'} barDataKey={'Amount'} />
            </div>
        </div>
    );
};

export default App;