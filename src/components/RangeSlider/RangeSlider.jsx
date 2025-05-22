import React from 'react';
import { useTranslation } from 'react-i18next';
import './RangeSlider.css';

export function RangeSlider({ options, icons = {}, value, onChange }) {
  // Ensure we're dealing with uppercase strings for consistent comparison
  const normalizedValue = value?.toUpperCase(); 
  
  // Find the index of the current value in options
  const index = options.findIndex(opt => opt === normalizedValue);
  const last = options.length - 1;

  // Default to 0 if value isn't found in options
  const validIndex = index >= 0 ? index : 0;

  // Log for debugging
  console.log('RangeSlider props:', { options, value, normalizedValue, index, validIndex });

  const { t } = useTranslation();

  return (
    <div className="range-slider">
      <input
        type="range"
        min="0"
        max={last}
        step="1"
        value={validIndex}
        onChange={e => {
          const idx = parseInt(e.target.value, 10);
          const newValue = options[idx];
          console.log('Changing to:', newValue);
          onChange(newValue);
        }}
        className="slider-input"
      />

      <div className="slider-labels">
        {options.map((opt, i) => {
          const pct = (i / last) * 100;
          return (
            <div
  key={opt}
  className={`slider-label-item ${opt} ${normalizedValue === opt ? 'active' : ''}`}
  style={{ left: `${pct}%` }}
  onClick={() => onChange(opt)}
>

              <span className="label-text">{t(`text.${opt.toLowerCase()}`)}</span>
              {icons[opt] && (
                <span className="label-icon">{icons[opt]}</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}