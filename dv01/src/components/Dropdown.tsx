import React from 'react';

// Dropdown component props ****** switched from 'type' to 'interface'
interface DropdownProps {
    label: string;
    onChange: (value: string) => void;
    options: string[];
    value: string;
    className?: string;
    dataTestId: string;
};

/** Dropdown component for selecting filter options */
const Dropdown: React.FC<DropdownProps> = ({ label, onChange, options, value, className, dataTestId }) => {
    return (
        <div className={className}>
            <label>{label}</label>
            <select
                data-testid={dataTestId}
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