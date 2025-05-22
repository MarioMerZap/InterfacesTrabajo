import { useEffect } from 'react';
import './ErrorMessage.css';

export function ErrorMessage({ error, duration = 1500, onDismiss }) {
    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                onDismiss();
            }, duration);
            
            return () => clearTimeout(timer);
        }
  }, [error, duration, onDismiss]);

    if (!error) {
        return null;
    }

    return (
        <div className="error-message">
                <span className="error-icon">⚠️</span>
                <span className="error-text">{error}</span>
        </div>
    );
}