import React from 'react';

type DropdownProps = {
    label: string;
    onChange: (value: string) => void;
    options: string[];
    value: string;
    className?: string;
};

const Dropdown: React.FC<DropdownProps> = ({ label, onChange, options, value, className }) => {
    return (
        <div className={className}>
            <label className="dropdown-label">{label}</label>
            <select
                className="switch"
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