import React, { useCallback, useEffect, useState, useMemo } from 'react';
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
    // Save various filter states for 'saved view'.
    const [savedViews, setSavedViews] = useState<Map<string, LoanDataView>>(new Map());
    const [newViewLabel, setNewViewLabel] = useState<string>('');
    const [currentViewLabel, setCurrentViewLabel] = useState<string>('');
    const [enableViewCreation, setEnableViewCreation] = useState<boolean>(true);

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
        setCurrentViewLabel('');
        setGradeAmounts(resetGradeAmounts);
        setEnableViewCreation(false);
        setLoading(false);
    }, [resetGradeAmounts]);

    // Set filters based on saved view selection
    const setFiltersFromView = useCallback((filterLabel: string) => {
        setLoading(true);
        const dataView: any = savedViews.get(filterLabel);
        setHomeOwnership(dataView.homeOwnership);
        setQuarter(dataView.quarter);
        setTerm(dataView.term);
        setYear(dataView.year);
        setCurrentViewLabel(filterLabel);
        setLoading(false);
    }, [savedViews, term, quarter, homeOwnership, year]);

    // Create view with current filter settings
    const createView = useCallback(() => {
        setLoading(true);
        const newView = {
            year: year,
            quarter: quarter,
            homeOwnership: homeOwnership,
            term: term
        };
        savedViews.set(newViewLabel, newView);
        setCurrentViewLabel(newViewLabel);
        setNewViewLabel('');
        setEnableViewCreation(false);
        setLoading(false);
    }, [savedViews, term, quarter, homeOwnership, year, newViewLabel]);

    // Update new view label input from event target value.
    const updateNewViewLabel = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setNewViewLabel(event.target.value);
    }, []);

    // Update grade amounts when filter choices change
    useEffect(() => {
        setLoading(true);
        let enableNewViewCreation = true;
        let updatedViewLabel = '';
        if (homeOwnership === 'All' && quarter === 'All' && term === 'All' && year === 'All') {
            setGradeAmounts(resetGradeAmounts);
            // If all filters are set to 'All', disable creation of new views
            // users can use the reset button to clear filters
            enableNewViewCreation = false;
        } else {
            // Check if the current filter settings match any saved view
            Array.from(savedViews.entries()).forEach(([label, view]) => {
                if (view.homeOwnership === homeOwnership &&
                    view.quarter === quarter &&
                    view.term === term &&
                    view.year === year) {
                    // If a saved view matches the current filters, use it's label as the current view label
                    updatedViewLabel = label;
                    enableNewViewCreation = false; // Disable creation if a matching view exists
                }
            });
            setGradeAmounts(aggregateData(loanData, homeOwnership, quarter, term, year));
        }
        setCurrentViewLabel(updatedViewLabel);
        setEnableViewCreation(enableNewViewCreation);
        setLoading(false);
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
            {/* TODO: hide dropdown if no saved views exist*/}
            <Dropdown
                className='filter-dropdown'
                label="Saved Views"
                options={Array.from(savedViews.keys())}
                value={currentViewLabel}
                onChange={setFiltersFromView}
                dataTestId='savedViewFilterDropdown'
                showChooseAnOption={true}
            />
            {enableViewCreation && <div><input
                type='text'
                value={newViewLabel}
                onChange={updateNewViewLabel}
                placeholder='New View Label'
            />
                <button className={'reset-button'} onClick={createView}>Save View</button></div>}
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