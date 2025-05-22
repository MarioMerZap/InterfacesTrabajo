import { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { HeadLine } from "../components/HeadLine/HeadLine.jsx";
import { Search } from "../components/Search/Search.jsx";
import { List } from "../components/List/List.jsx";
import { Timer } from "../components/Timer/Timer.jsx";
import { AttemptsCounter } from "../components/AttemptsCounter/AttemptsCounter.jsx";

import '../components/Button/Button.css';
import '../components/Timer/Timer.css';

export function ChooseGame() {
    const location = useLocation();
    const navigate = useNavigate();

    const settings = location.state?.settings || {};
    const selectedCity = location.state?.selectedCity;

    const [cities, setCities] = useState([]);
    const [isGameFinished, setIsGameFinished] = useState(false);
    const [showWinAlert, setShowWinAlert] = useState(false);
    const [isTimeOut, setIsTimeOut] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [timerKey, setTimerKey] = useState(0);

    const handleMainMenu = () => navigate('/');
    const handleBack = () => navigate('/choose-city', { state: { settings } });

    const addCity = (cityData) => {
        if (!selectedCity || isGameFinished || isTimeOut) return;

        const isCorrect = cityData.Name.trim().toLowerCase() === selectedCity.Name.toLowerCase();

        const newCity = {
            id: Date.now(),
            name: cityData.Name.trim(),
            continent: cityData.Continent,
            country: cityData.Country,
            x: cityData.CoordinateX,
            y: cityData.CoordinateY,
            population: cityData.Population,
            isCoastal: cityData.CoastalCity
        };

        setCities([newCity, ...cities]);
        setTimerKey(prev => prev + 1);

        if (isCorrect) {
            setShowWinAlert(true);
            setIsGameFinished(true);
        }
    };

    useEffect(() => {
        if (showWinAlert) {
            const timer = setTimeout(() => {
                const playAgain = window.confirm(`🎉 Congratulations! You guessed the city: ${selectedCity.Name}\n\nDo you want to play again?`);
                if (playAgain) {
                    navigate('/choose-city', { state: { settings } });
                } else {
                    navigate('/');
                }
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [showWinAlert, selectedCity, navigate]);

    useEffect(() => {
        if (
            settings.attemptsEnabled &&
            !isGameFinished &&
            !isTimeOut &&
            cities.length >= settings.attempts
        ) {
            setIsGameFinished(true);
            const timer = setTimeout(() => {
                const playAgain = window.confirm(`❌ You've used all ${settings.attempts} attempts.\nThe correct city was: ${selectedCity.Name}\n\nDo you want to play again?`);
                if (playAgain) {
                    navigate('/choose-city', { state: { settings } });
                } else {
                    navigate('/');
                }
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [cities, settings.attempts, isGameFinished, isTimeOut, settings.attemptsEnabled, selectedCity, navigate]);

    const handleTimeOut = () => {
        if (!settings.timeEnabled) return;
        setIsTimeOut(true);
        setIsGameFinished(true);

        setTimeout(() => {
            const playAgain = window.confirm(`⏰ Time's up! The city was: ${selectedCity.Name}\n\nDo you want to play again?`);
            if (playAgain) {
                navigate('/choose-city', { state: { settings } });
            } else {
                navigate('/');
            }
        }, 400);
    };

    const gameHelpContent = (
        <div>
            <h3>Compare Your Guess</h3>
            <p>Try to guess how similar the selected city is to others.</p>
            <ul>
                {settings.continent && <li>Continent</li>}
                {settings.country && <li>Country</li>}
                {settings.distance && <li>Distance from your guess</li>}
                {settings.direction && <li>Direction to the target city</li>}
                {settings.population && <li>Population comparison</li>}
                {settings.coastalCity && <li>Whether it's a coastal city</li>}
            </ul>
        </div>
    );

    return (
        <>
            <HeadLine
                title="CITY INSIGHT MODE"
                handleMainMenu={handleMainMenu}
                handleBack={handleBack}
                showHome={true}
                showBack={true}
                helpContent={gameHelpContent}
            />
            

            <div style={{
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexWrap: 'wrap',
  width: '100%',
  gap: '70px',
  margin: '20px auto',
  marginTop: '30px'
}}>
  {settings.timeEnabled && (
    <Timer
      key={timerKey}
      initialTime={settings.time}
      onTimeOut={handleTimeOut}
      onPauseChange={setIsPaused}
    />
  )}
  {settings.attemptsEnabled && (
    <AttemptsCounter 
      currentAttempts={cities.length + 1}
      totalAttempts={settings.attempts}
    />
  )}
</div>

<Search
  onAddCity={addCity}
  disabled={isGameFinished || isTimeOut || isPaused}
  currentAttempt={cities.length + 1}
  totalAttempts={settings.attemptsEnabled ? settings.attempts : Infinity}
  
/>


            {cities.length > 0 && (
                <List cities={cities} targetCity={selectedCity} settings={settings} />
            )}
        </>
    );
}
