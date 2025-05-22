import React from 'react';
import PropTypes from 'prop-types';
import './Checkbox.css';
import '../../global.css';

export function Checkbox({ label, checked, onChange }) {
    return (
        <label className="checkbox-container">
            <input
                type="checkbox"
                checked={checked}
                onChange={onChange}
                className="checkbox-input"
            />
            <span className="checkbox-label">{label}</span>
        </label>
    );
}

Checkbox.propTypes = {
    label: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
};