import './AttemptsCounter.css';
import { useTranslation } from 'react-i18next';

export function AttemptsCounter({currentAttempts, totalAttempts}) {
    const { t } = useTranslation();
    
    return (
        <div className="attempts-counter-container">
            <span className="attempts-counter-text">
                {t("text.guess")} {currentAttempts} {t("text.of")} {totalAttempts}
            </span>
        </div>
    );
}