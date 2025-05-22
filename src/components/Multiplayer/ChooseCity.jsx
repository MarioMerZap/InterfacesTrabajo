import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { HeadLine } from '../../components/HeadLine/HeadLine.jsx';
import { Search } from '../../components/Search/Search.jsx';
import { List } from '../../components/List/List.jsx';
import citiesData from '../../cities.json';

export function ChooseCity() {
    const navigate = useNavigate();
    const location = useLocation();
    const settings = location.state?.settings || {};

    const [selectedCities, setSelectedCities] = useState([]);

    const handleCitySelect = (cityData) => {
        setSelectedCities([cityData, ...selectedCities]);
        navigate('/city-confirmed', {
            state: {
                selectedCity: cityData,
                settings: settings
            }
        });
    };

    // Controla si el regreso a la pantalla principal
    function handleMainMenu() {
        navigate('/');
    }

    function handleBack() {
        navigate('/chooseSettings');
    }

    return (
        <>
            <HeadLine
                title="CHOOSE A CITY"
                subtitle="Pick a city for your opponent"
                handleMainMenu={handleMainMenu}
                handleBack={handleBack}
                showHome={true}
                showBack={true}
            />
            <Search
                onAddCity={handleCitySelect}
                disabled={false}
            />
            <List cities={selectedCities} targetCity={selectedCities[0]} settings={settings} />
        </>
    );
}
