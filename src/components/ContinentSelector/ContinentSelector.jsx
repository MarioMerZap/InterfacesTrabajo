import React from 'react';
import { useTranslation } from 'react-i18next';
import './ContinentSelector.css';

export function ContinentSelector({ selectedContinents, onChange }) {
  const { t } = useTranslation();

  const continents = [
    { value: 'ALL', label: '🌍 ' + t("text.all_continents") },
    { value: 'Africa', label: '🦁 ' + t("text.africa")},
    { value: 'Asia', label: '🐉 ' + t("text.asia")},
    { value: 'Europe', label: '🏰 ' + t("text.europe")},
    { value: 'America', label: '🦅 ' + t("text.america")},
    { value: 'Oceania', label: '🦘 ' + t("text.oceania")},
  ];

  const handleSelect = (value) => {
    let newSelection;

    if (value === 'ALL') {
      // Si selecciona "All Continents", reiniciar la selección
      newSelection = ['ALL'];
    } else {
      const isSelected = selectedContinents.includes(value);

      if (isSelected) {
        // Deseleccionar el continente
        newSelection = selectedContinents.filter(v => v !== value);
        // Si al deseleccionar queda vacío, volver a ALL
        if (newSelection.length === 0) newSelection = ['ALL'];
      } else {
        // Seleccionar el continente, removiendo ALL si existe
        newSelection = [
          ...selectedContinents.filter(v => v !== 'ALL'),
          value
        ];
      }
    }

    // Enviar la selección actualizada
    onChange(newSelection);
  };

  return (
    <div className="continent-selector">
      <div className="continent-dropdown">
        {continents.map(continent => (
          <div
            key={continent.value}
            className={`continent-option ${
              selectedContinents.includes(continent.value) ? 'selected' : ''
            }`}
            onClick={() => handleSelect(continent.value)}
          >
            {continent.label}
          </div>
        ))}
      </div>
    </div>
  );
}
