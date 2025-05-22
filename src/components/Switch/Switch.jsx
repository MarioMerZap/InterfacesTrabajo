import { useState } from 'react';
import './Switch.css';
import '../../global.css';

export function Switch({ initialValue = false, onToggle }) {
  const [isOn, setIsOn] = useState(initialValue);

  function handleToggle() {
    const newValue = !isOn;
    setIsOn(newValue);
    
    if (onToggle){
      onToggle(newValue);
    }
  }

  return (
    <button 
      className={`toggle-switch ${isOn ? 'on' : 'off'}`}
      onClick={handleToggle}
      aria-pressed={isOn}
    >
      <span className="toggle-handle" />
    </button>
  );
}