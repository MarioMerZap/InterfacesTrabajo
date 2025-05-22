import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../Button/Button';
import './Window.css';


export function Window({ isOpen, onClose, content, type, onConfirm }) {
  
  const { t } = useTranslation();
  
  // Se ejecuta nada más iniciar cada una de las páginas
  useEffect(() => {
    // Si no está abierto no hace nada
    if (!isOpen){
      return;
    }

    // Cierra la ventana cuando se le da a 'Esc'
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
   
    // Elimina el evento de 'Esc' al cerrar la ventana
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Si no está abierto no hace nada
  if (!isOpen){
    return null;
  }

  return (
    <div className="window-container">
      <div className="window-overlay" onClick={onClose} />
      <div className="window-content">
        <button 
          className="window-close"
          onClick={onClose}
          aria-label="Close window"
        >
          ×
        </button>
        <div className="window-body">
          {content}
        </div>

        {type === "confirm" && (
          <div className="window-footer">
            <Button 
              label={t("text.no")}
              variant="secondary" 
              onClick={onClose} 
            />
            <Button 
              label={t("text.yes")} 
              variant="primary" 
              onClick={() => {
                onConfirm?.();
                onClose();
              }} 
            />
          </div>
        )}
      </div>
    </div>
  );
}