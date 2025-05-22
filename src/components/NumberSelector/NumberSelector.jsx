import React from 'react';
import PropTypes from 'prop-types';
import './NumberSelector.css';
import '../../global.css';

export function NumberSelector({ value, onChange, options }) {
    return (
        <div className="number-selector">
            <select value={value} onChange={onChange} className="number-select">
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
}

NumberSelector.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])).isRequired,
};