import React from 'react';

type DropdownProps = {
    label: string;
    onChange: (value: string) => void;
    options: string[];
    value: string;
};

const Dropdown: React.FC<DropdownProps> = ({ label, onChange, options, value }) => {
    return (
        <div className="dropdown">
            <label className="dropdown-label">{label}</label>
            <select
                className="dropdown-select"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            >
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default React.memo(Dropdown);