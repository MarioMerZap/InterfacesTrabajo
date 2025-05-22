import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { HeadLine } from '../HeadLine/HeadLine.jsx';
import './ConfirmCity.css'; // Asegúrate de crear este archivo y enlazarlo

export function ConfirmCity() {
    const location = useLocation();
    const navigate = useNavigate();

    const city = location.state?.selectedCity;
    const settings = location.state?.settings;

    useEffect(() => {
        if (!city || !settings) {
            navigate('/choose-city');
            return;
        }

        const timeout = setTimeout(() => {
            navigate('/choose-game', { state: { selectedCity: city, settings } });
        }, 2500);

        return () => clearTimeout(timeout);
    }, [city, settings, navigate]);

    return (
        <>
            <HeadLine 
                title="City Chosen" 
                subtitle="Waiting for next step..." 
                showHome={true} 
                showBack={false} 
            />
            <div className="confirm-city-container">
                <div className="confirm-city-message">
                    <h2>
                        ✅ City successfully chosen.<br /><br />
                        Player 2, get ready!
                    </h2>
                </div>
            </div>
        </>
    );
}
