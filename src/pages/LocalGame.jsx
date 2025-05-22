import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { HeadLine } from "../components/HeadLine/HeadLine.jsx";
import { Search } from "../components/Search/Search.jsx";
import { List } from "../components/List/List.jsx";
import { Timer } from "../components/Timer/Timer.jsx";

import { AttemptsCounter } from "../components/AttemptsCounter/AttemptsCounter.jsx";

import citiesData from '../cities.json';

import '../components/Button/Button.css';
import '../components/Timer/Timer.css';
import '../components/HeadLine/HeadLine.css';
import '../components/Search/search.css';
import './LocalGame.css';

export function LocalGame() {
    const [cities, setCities] = useState([]);
    const [targetCity, setTargetCity] = useState({ Name: '' });
    const [hint, setHint] = useState('');
    const [currentPlayer, setCurrentPlayer] = useState(1);
    const [playerScores, setPlayerScores] = useState({ 1: 0, 2: 0 });
    const [isGameWon, setIsGameWon] = useState(false);
    const [isTimeOut, setIsTimeOut] = useState(false);
    const [timerKey, setTimerKey] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    const defaultSettings = {
        attemptsEnabled: true,
        timeEnabled: false,
        continent: true,
        country: true,
        distance: true,
        direction: true,
        population: true,
        coastalCity: true,
        attempts: 6,
        time: 30,
        difficulty: 'MEDIUM',
    };
    
    const incomingSettings = location.state?.settings || {};
    
    const settings = {
        ...defaultSettings,
        ...incomingSettings,
        numPlayers: 2
    };

    useEffect(() => {
        setNewTargetCity();
    }, [settings.difficulty]);

    useEffect(() => {
        if (playerScores[1] === 3 || playerScores[2] === 3) {
            setIsGameWon(true);
            setIsPaused(true);
            setTimeout(() => {
                const winner = playerScores[1] === 3 ? 1 : 2;
                const playAgain = window.confirm(`🎉 Player ${winner} wins!\n\nDo you want to play again?`);
                if (playAgain) {
                    resetGame();
                } else {
                    navigate('/');
                }
            }, 500);
        }
    }, [playerScores]);

    function setNewTargetCity() {
        let possibleCities = citiesData;
        if (settings.difficulty !== 'ALL') {
            const formatted = settings.difficulty.charAt(0).toUpperCase() + settings.difficulty.slice(1).toLowerCase();
            possibleCities = citiesData.filter(city => city.Difficulty === formatted);
        }
        const randomIndex = Math.floor(Math.random() * possibleCities.length);
        setTargetCity(possibleCities[randomIndex]);
        setCities([]);
        setHint('');
        setTimerKey(prev => prev + 1);
        setIsTimeOut(false);
    }

    function resetGame() {
        setPlayerScores({ 1: 0, 2: 0 });
        setCurrentPlayer(1);
        setIsGameWon(false);
        setNewTargetCity();
    }

    function calculateDistance(city1, city2) {
        const toRad = degree => degree * (Math.PI / 180);
        const R = 6371;
        const dLat = toRad(city2.CoordinateY - city1.CoordinateY);
        const dLon = toRad(city2.CoordinateX - city1.CoordinateX);
        const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(city1.CoordinateY)) * Math.cos(toRad(city2.CoordinateY)) * Math.sin(dLon / 2) ** 2;
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }

    function calculateDirection(city1, city2) {
        const deltaLat = city2.CoordinateY - city1.CoordinateY;
        const deltaLon = city2.CoordinateX - city1.CoordinateX;
        if (Math.abs(deltaLat) > Math.abs(deltaLon)) {
            return deltaLat > 0 ? 'North' : 'South';
        } else {
            return deltaLon > 0 ? 'East' : 'West';
        }
    }

    function handleMainMenu() {
        const confirm = window.confirm("Are you sure you want to return to the main menu? \n(You will lose your progress)");
        if (confirm) navigate('/');
    }

    function handleBack() {
        if (cities.length === 0) {
            navigate('/rotationSettings');
        } else {
            const confirmation = window.confirm("Are you sure you want to return to the main menu? \n(You will lose your progress)");
            if (confirmation) navigate('/rotationSettings');
        }
    }

    function addCity(cityData) {
        if (!targetCity.Name || isGameWon || isTimeOut) return;

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

        const isCorrect = cityData.Name.trim().toLowerCase() === targetCity.Name.toLowerCase();
        const updatedCities = [newCity, ...cities];
        setCities(updatedCities);
        setTimerKey(prev => prev + 1);

        if (isCorrect) {
            setPlayerScores(prev => ({
                ...prev,
                [currentPlayer]: prev[currentPlayer] + 1
            }));
            setCurrentPlayer(prev => (prev % settings.numPlayers) + 1);
            setTimeout(() => {
                alert(`🎯 Correct! The city was ${targetCity.Name}`);
                setNewTargetCity();
            }, 300);
        } else if (settings.attemptsEnabled && updatedCities.length >= settings.attempts) {
            setTimeout(() => {
                alert(`❌ Out of attempts! The city was ${targetCity.Name}`);
                setCurrentPlayer(prev => (prev % settings.numPlayers) + 1);
                setNewTargetCity();
            }, 300);
        } else {
            let hintMessage = '';
            hintMessage += `Direction: ${calculateDirection(cityData, targetCity)}\n`;
            hintMessage += `Same continent: ${cityData.Continent === targetCity.Continent ? 'Yes' : 'No'}\n`;
            hintMessage += `Same country: ${cityData.Country === targetCity.Country ? 'Yes' : 'No'}\n`;
            hintMessage += `Distance: ${calculateDistance(cityData, targetCity).toFixed(2)} km\n`;
            hintMessage += `Coastal city: ${cityData.isCoastal === targetCity.CoastalCity ? 'Yes' : 'No'}\n`;
            hintMessage += cityData.Population > targetCity.Population
                ? "Population: More\n"
                : cityData.Population < targetCity.Population
                ? "Population: Less\n"
                : "Population: Equal\n";
            setHint(hintMessage);
            setCurrentPlayer(prev => (prev % settings.numPlayers) + 1);
        }
    }

    const gameHelpContent = (
        <div>
            <h3>How to Play</h3>
            <p>Try to guess the hidden city by entering city names.</p>
            <p>After each guess, you'll get clues about:</p>
            <ul>
                {settings.continent && <li>Continent</li>}
                {settings.country && <li>Country</li>}
                {settings.distance && <li>Distance from your guess</li>}
                {settings.direction && <li>Direction to the target city</li>}
                {settings.population && <li>Population comparison</li>}
                {settings.coastalCity && <li>Whether it's a coastal city</li>}
            </ul>
            <p>This mode is similar to the normal mode but this time you</p>
            <p>can play with a friend and compete to see who guesses the city first!</p>
            <p>Player 1 starts first and then Player 2 takes their turn.</p>
            <p>First to win 3 times wins the match!</p>
            {settings.attemptsEnabled && <p>Attempts left: {settings.attempts - cities.length}</p>}
            {settings.timeEnabled && <p>Time limit: {settings.time} seconds per attempt</p>}
        </div>
    );

    return (
        <>
            <HeadLine 
                title="GUESS THE CITY" 
                subtitle="Take turns against a friend to guess the city!" 
                handleMainMenu={handleMainMenu}
                handleBack={handleBack}
                showHome={true}
                showBack={true}
                helpContent={gameHelpContent} 
            />
            <div className="scoreboard">
                <div className="player-score">
                    <div className="score">{playerScores[1]}</div>
                    <div className="label4">PLAYER 1</div>
                </div>
                <div className={`turn-indicator player-${currentPlayer}`}>
                    🎯 PLAYER {currentPlayer}'S TURN
                </div>
                <div className="player-score">
                    <div className="score">{playerScores[2]}</div>
                    <div className="label4">PLAYER 2</div>
                </div>
            </div>

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
            onTimeOut={() => {
                setIsTimeOut(true);
                alert(`⏰ Time's up! The city was ${targetCity.Name}`);
                setCurrentPlayer(prev => (prev % settings.numPlayers) + 1);
                setNewTargetCity();
            }} 
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
                disabled={isGameWon || isTimeOut || isPaused} 
                currentAttempt={cities.length + 1} 
                totalAttempts={settings.attemptsEnabled ? settings.attempts : Infinity} 
            />

            {cities.length > 0 && (
                <List cities={cities} targetCity={targetCity} settings={settings} />
            )}
        </>
    );
}
