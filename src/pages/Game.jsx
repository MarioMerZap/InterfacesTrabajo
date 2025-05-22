import { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { HeadLine } from "../components/HeadLine/HeadLine.jsx";
import { Search } from "../components/Search/Search.jsx";
import { List } from "../components/List/List.jsx";
import { Timer } from "../components/Timer/Timer.jsx";
import { AttemptsCounter } from "../components/AttemptsCounter/AttemptsCounter.jsx";
import { Window } from "../components/Window/Window.jsx";

import citiesData from '../cities.json';

import '../components/Button/Button.css';
import '../components/Timer/Timer.css';

export function Game() {
    
    const [cities, setCities] = useState([]); // Almacena la lista de ciudades que el jugador ha insertado
    const [targetCity, setTargetCity] = useState({ Name: '' }); // Contiene la ciudad objetivo que el jugador debe adivinar
    
    const [isInitialized, setIsInitialized] = useState(false); // Controla si se han cargado las ciudades
    const [isGameFinished, setIsGameFinished] = useState(false); // Verifica si el juego se ha terminado
    const [showWinWindow, setShowWinWindow] = useState(false); // Controla la ventana del mensaje de victoria
    const [isTimeOut, setIsTimeOut] = useState(false); // Controla si se ha agotado el juego

    const [allowedCities, setAllowedCities] = useState([]); // Ciudades permitidas para jugar

    const [timerKey, setTimerKey] = useState(0); // Resetea timer
    const [isPaused, setIsPaused] = useState(false); // Pausa el timer
    const [didWin, setDidWin] = useState(false); // Controla si has ganado


    const [activeDialog, setActiveDialog] = useState(null); // 'win', 'attempts', 'timeout', 'confirmation'
    const [dialogMessage, setDialogMessage] = useState(""); // Controla el mensaje mostrado en el ventana
    const [dialogAction, setDialogAction] = useState(() => () => {}); // Controla la acción al darle a sí

    const navigate = useNavigate();
    const location = useLocation();
    const { t } = useTranslation();


    const settings = location.state?.settings || {
        attemptsEnabled : false,
        timeEnabled : false,
        continent: true,
        country: true,
        distance: true,
        direction: true,
        population: true,
        coastalCity: true,
        attempts: 6,
        time: 30,
        difficulty: 'ALL',
        continentFilter: ['ALL']
    };

    const continentNames = {
        'AF': 'Africa', 
        'AS': 'Asia', 
        'EU': 'Europe',
        'NA': 'North America', 
        'SA': 'South America',
        'OC': 'Oceania', 
        'AN': 'Antarctica'
    };
    // Funcion para mostrar diálogos
    function showDialog(type, message, action) {
        setActiveDialog(type);
        setDialogMessage(message);
        setDialogAction(()=>action);
    }
    
    // useEffect() se usa para ejecutar funciones al cargarse la página, controlar el numero de intentos y gestionar la victoria

    // Seleccionar la ciudad objetivo al inicio
    useEffect(() => {
        if (citiesData.length > 0) {
            let possibleCities = citiesData;
            if (settings.continentFilter.length === 0) {
                settings.continentFilter = ['ALL'];
                possibleCities = citiesData;
            } else if (settings.continentFilter.includes("ALL")) {
                console.log("Filter set to ALL: All continents included.");
                possibleCities = citiesData; // Usar todas las ciudades
            } else {
                console.log("Filtered Continents:", settings.continentFilter);
                possibleCities = citiesData.filter(city =>
                    settings.continentFilter.includes(city.Continent)
                );
            }


            // Filtrar por dificultad (si no es ALL)
            if (settings.difficulty !== 'ALL') {
                const formattedDifficulty = settings.difficulty.charAt(0).toUpperCase() + settings.difficulty.slice(1).toLowerCase();
                possibleCities = possibleCities.filter(city => city.Difficulty === formattedDifficulty);
            }

            if (possibleCities.length === 0) {
                console.error("No cities match the current filters. Check continent or difficulty settings.");
                return; // Terminar el useEffect temprano
            }


            const randomIndex = Math.floor(Math.random() * possibleCities.length);
            const selectedCity = possibleCities[randomIndex];
            console.log("Target city:", selectedCity.Name, " | Continent:", selectedCity.Continent, " | Difficulty:", selectedCity.Difficulty);
            setTargetCity(selectedCity);
            const continentCities = citiesData.filter(city => city.Continent === selectedCity.Continent);
            setAllowedCities(continentCities);

            setIsInitialized(true);
        }
    }, [settings.continentFilter, settings.difficulty]);


    // Verificar el número de intentos
    useEffect(() => {
        // Si se ha desactivado hay intentos ilimitados
        if (!isInitialized || !settings.attemptsEnabled){
            return;
        } 
        
        if (cities.length >= settings.attempts && targetCity.Name) {
            setTimeout(() => {
                showDialog("attempts", `${t("text.attempts_spent")} ${settings.attempts} ${t("text.attempts_final_message")}
                    ${t("text.the_city_was")} ${targetCity.Name}. \n\n${t("text.do_you_want_to_play_again")}`, () => resetGame(true));
                setIsGameFinished(true);
            }, 3000);
        }
    }, [cities, settings.attempts, isInitialized, targetCity.Name, settings.attemptsEnabled]);


    // Mostrar alerta de victoria
    useEffect(() => {
        if (!isInitialized){
            return;
        }
        
        if (showWinWindow) {
            setTimeout(() => {
                showDialog("win", `${t("text.congratulations")}\n ${t("text.you_guessed_the_city")} ${targetCity.Name}\n\n${t("text.do_you_want_to_play_again")}`, () => resetGame(true));
                setIsGameFinished(true);
                setShowWinWindow(false);
                setDidWin(true);
            }, 3000);
        }
    }, [showWinWindow, targetCity, isInitialized]);

    // Controla si el tiempo ha terminado
    function handleTimeOut() {
        // Si se ha desactivado hay tiempo ilimitado
        if (!settings.timeEnabled || isTimeOut){
            return;
        }
        setIsTimeOut(true);
        setIsGameFinished(true);
        showDialog("timeout", `${t("text.time_up")} ${t("text.the_city_was")} ${targetCity.Name}\n\n${t("text.do_you_want_to_play_again")}`, () => resetGame(true));
    }

    // Resetear por defecto para reiniciar la página
    function resetGame(playAgain = false) {
        setIsTimeOut(false);
        setIsGameFinished(false);
        setShowWinWindow(false);
        setActiveDialog(null);
        setDidWin(false); 

        if (playAgain) {
        window.location.reload();
        } 
        else {
            setDidWin(true);
        }
    }

    // Controla el regreso a la pantalla principal
    function handleMainMenu() {
        if (cities.length === 0) {
            navigate('/');
        } 
        else {
            showDialog("navigation", `${t("text.are_you_sure_you_want_to_return_to_the_main_menu")} \n(${t("text.you_will_lose_your_progress")})`, () => navigate('/'));
        }
    }

    // Controla el regreso a la pantalla anterior
    function handleBack() {
        if (cities.length === 0) {
            navigate('/gameSettings');
        } 
        else {
            showDialog("navigation", `${t("text.are_you_sure_you_want_to_return_to_game_settings")} \n(${t("text.you_will_lose_your_progress")})`, () => navigate('/gameSettings'));
        }
    }

    // Añade la ciudad pasada como argumento a las ciudades a la lista
    function addCity(cityData) {
        if (!targetCity.Name || isGameFinished || isTimeOut) {
            return { success: false, error: t("text.game_finished_or_no_target_city") };
        }

        // Validación de continente
        if (settings.continentFilter.length > 0 && !settings.continentFilter.includes("ALL")) {
            if (!settings.continentFilter.includes(cityData.Continent)) {
                const allowed = settings.continentFilter.map(c => t(`text.${continentNames[c]}`) || c).join(', ');

                return { 
                    success: false, 
                    error: `The city must be in ${allowed}` 
                };
            }
        }

        // Validación de ciudad duplicada
        const cityAlreadyAdded = cities.some(
            city => city.name.toLowerCase() === cityData.Name.trim().toLowerCase()
        );
        
        if (cityAlreadyAdded) {
            return {
                success: false,
                error: 'This city has already been added!'
            };
        }

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
        
        // Comprobar si la ciudad que se va a añadir es la ciudad elegida
        const isCorrect = cityData.Name.trim().toLowerCase() === targetCity.Name.toLowerCase();
        
        setCities([newCity, ...cities]);
        setTimerKey(prev => prev + 1);
        
        if (isCorrect) {
            setShowWinWindow(true);
        }
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
        return { success: true };

    }

    // Div de ayuda de Game
    const gameHelpContent = (
        <div>
          <h3>{t("text.how_to_play")}</h3>
          <p>{t("text.try_to_guess_the_hidden_city_by_entering_city_names")}</p>
          <p>{t("text.after_each_guess_you_ll_get_clues_about")}</p>
          <ul>
            {settings.continent && <li>{t("text.continent_help")}</li>}
            {settings.country && <li>{t("text.country_help")}</li>}
            {settings.distance && <li>{t("text.distance_from_your_guess")}</li>}
            {settings.direction && <li>{t("text.direction_to_the_target_city")}</li>}
            {settings.population && <li>{t("text.population_comparison")}</li>}
            {settings.coastalCity && <li>{t("text.whether_it_s_a_coastal_city")}</li>}
          </ul>
          {settings.attemptsEnabled && <p>{t("text.attempts_left")} {settings.attempts - cities.length}</p>}
          {settings.timeEnabled && <p>{t("text.time_limit_help_game")} {settings.time} {t("text.seconds_per_attempt")}</p>}
        </div>
      );

    return (
        <>
            <div className="fixed-header-container">

            <HeadLine
                title={t("text.guess_the_city")}
                subtitle={t("text.test_your_knowledge_of_world_cities")}
                handleMainMenu={handleMainMenu}
                handleBack={handleBack}
                showHome={true}
                showBack={true}
                helpContent={gameHelpContent}
            />

                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', width: '100%', gap: '70px',  margin: '20px auto', // Añadir margen vertical
                    marginTop: '30px'
                }}>
                    {/* Si está desactivado, tiempo ilimitado*/}
                    {settings.timeEnabled && (
                        <Timer
                            key={timerKey}
                            initialTime={settings.time}
                            onTimeOut={handleTimeOut}
                            onPauseChange={setIsPaused}
                            isGameFinished={isGameFinished || isTimeOut}
                        />
                    )}
                    {/* Si está desactivado, intentos ilimitados*/}
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
                    hasWon={didWin}
                    hasTimeout={isTimeOut}
                    selectedContinents={settings.continentFilter}
                    continentNames={continentNames}
                />
            </div>

            <div className="game-content">
                <List cities={cities} targetCity={targetCity} settings={settings}/>
            </div>

            <Window
                isOpen={activeDialog !== null}
                onClose={() => setActiveDialog(null)}
                content={dialogMessage}
                type={activeDialog !== "help" ? "confirm" : "info"}
                onConfirm={dialogAction}
            />
        </>
    );
}