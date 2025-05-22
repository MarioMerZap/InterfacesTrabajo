import React from 'react';
import './Button.css';


export function Button({ label, logo, variant, onClick, labelStyle }) {
  return (
  
    <button className={`button ${variant}`} onClick={onClick}>
      {logo && <div className={logo}></div>}
      <span className={labelStyle}>{label}</span>
    </button>
  );
}
