import { useState, useEffect, useRef } from 'react';
import './search.css';
import citiesData from '../../cities.json';
import lupa from '../../images/lupa.png';
import '../../global.css';

export function Search({ onAddCity, disabled, currentAttempt, totalAttempts }) {
    const [inputValue, setInputValue] = useState('');
    const [citiesList] = useState(citiesData);
    const [error, setError] = useState('');

    const [suggestions, setSuggestions] = useState([]); // Lista de sugerencias
    const [showSuggestions, setShowSuggestions] = useState(false); // Estado que controla si mostrar o no las sugerencias
    const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1); // Estado que controla si seleccionas un elemento de la lista de sugerencias
    const suggestionsRef = useRef(null); // Crear una referencia para la lista de sugerencias
    const suggestionsListRef = useRef(null);

    // Controlar el tiempo que aparece el error de ciudad no reconocida
    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                setError('');
            }, 700);
            return () => clearTimeout(timer);
        }
    }, [error]);

    // Cerrar sugerencias cuando se hace click fuera del textbox
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Crear la lista de sugerencias
    useEffect(() => {
        if (inputValue.trim().length > 0) {
            const searchTerm = inputValue.toLowerCase();
            
            // 1. Ciudades que EMPIEZAN con el texto
            const startsWithMatches = citiesList
                .filter(city => city.Name.toLowerCase().startsWith(searchTerm))
                .slice(0);
            
            // 2. Ciudades que CONTIENEN el texto
            const containsMatches = citiesList
                .filter(city => (
                    !city.Name.toLowerCase().startsWith(searchTerm) &&
                    city.Name.toLowerCase().includes(searchTerm)
                ))
                .slice(0);
            
            // Combinar ambas listas
            const combined = [...startsWithMatches, ...containsMatches];
            
            setSuggestions(combined);
            setShowSuggestions(combined.length > 0);
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
    }, [inputValue, citiesList]);

    // Comprobar que la ciudad está registrada en la base de datos
    function getValidCity() {
        for (const city of citiesList) {
            if (inputValue.trim().toLowerCase() === city.Name.toLowerCase()) {
                return city;  // Retorna toda la ciudad con todos los detalles
            }
        }
        return null;
    }

    // Funcionamiento al darle click al boton buscar
    function handleSubmit(e) {
        e.preventDefault();
        if (disabled) return;

        const validCity = getValidCity();
        if (!validCity) {
            setError('City not recognized!');
            return;
        }

        onAddCity(validCity);  // Aquí pasa toda la ciudad (con todos los datos)
        setInputValue('');
        setShowSuggestions(false);
        setSelectedSuggestionIndex(-1);
    }

    // Funcionamiento al darle click a un resultado de la lista de sugerencias
    function handleSuggestionClick(city) {
        // Encuentra la ciudad completa en la lista
        const validCity = citiesList.find(c => 
            c.Name.toLowerCase() === city.Name.toLowerCase()
        );
        
        // Funcionamiento de handleSubmit pero al darle click a un elemento de la lista
        if (validCity) {
            onAddCity(validCity);
            setInputValue('');
            setShowSuggestions(false);
            setSelectedSuggestionIndex(-1);
        } else {
            setError('City not recognized!');
        }
    }

    // Manejo de la lista de sugerencias usando las flechas y el botón enter
    function handleKeyDown(e) {
        if (!showSuggestions || suggestions.length === 0) return;
    
        const itemHeight = 40; // Altura de cada elemento en píxeles
        const visibleItems = 5; // Número de elementos visibles sin hacer scroll
    
        // Tecla flecha abajo
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            const newIndex = selectedSuggestionIndex < suggestions.length - 1 ? selectedSuggestionIndex + 1 : selectedSuggestionIndex;
            setSelectedSuggestionIndex(newIndex);
    
            // Scroll manual hacia abajo cuando llegamos al final de la lista visible
            if (suggestionsListRef.current && newIndex >= visibleItems) {
                suggestionsListRef.current.scrollTop = (newIndex - visibleItems + 1) * itemHeight;
            }
        }
        // Tecla flecha arriba
        else if (e.key === 'ArrowUp') {
            e.preventDefault();
            const newIndex = selectedSuggestionIndex > 0 ? selectedSuggestionIndex - 1 : -1;
            setSelectedSuggestionIndex(newIndex);
    
            // Scroll manual hacia arriba cuando subimos más allá del primer elemento visible
            if (suggestionsListRef.current && newIndex >= 0) {
                suggestionsListRef.current.scrollTop = newIndex * itemHeight;
            }
        }
        // Tecla Enter
        else if (e.key === 'Enter') {
            e.preventDefault();
            
            if (selectedSuggestionIndex >= 0) {
                // Hay una sugerencia seleccionada
                const selectedCity = suggestions[selectedSuggestionIndex];
                setInputValue(selectedCity.Name);
                
                // Encuentra la ciudad completa en la lista
                const validCity = citiesList.find(c => 
                    c.Name.toLowerCase() === selectedCity.Name.toLowerCase()
                );
                
                // Funcionamiento de handleSubmit pero al darle enter a un elemento de la lista
                if (validCity) {
                    onAddCity(validCity);
                    setInputValue('');
                    setShowSuggestions(false);
                    setSelectedSuggestionIndex(-1);
                } else {
                    setError('City not recognized!');
                }
            } else if (inputValue.trim().length > 0) {
                handleSubmit(e);
            }
        }
    }

    

    return (
        <>
            <div className="search-wrapper" ref={suggestionsRef}>
                <form id="search" onSubmit={handleSubmit}>
                    <label htmlFor="cityInput" className="sr-only"></label>
                    <div className={`input-container ${showSuggestions ? 'has-suggestions' : ''}`}>
                        <input 
                            type="text" 
                            id="cityInput" 
                            value={inputValue} 
                            onChange={(e) => !disabled && setInputValue(e.target.value)} 
                            onFocus={() => { if (inputValue.trim().length > 0) setShowSuggestions(true);}}
                            onBlur={() => {}}
                            onKeyDown={handleKeyDown}
                            autoComplete="off"
                        />
                        <button type="submit" id="searchButton">
                            <img src={lupa} alt="Search" />
                        </button>
                    </div>
                    {error && <div className="error-message">{error}</div>}
                </form>

                {/* Lista de sugerencias */}
                {showSuggestions && suggestions.length > 0 && (
                    <ul className="suggestions-list" ref={suggestionsListRef}>
                        {suggestions.map((city, index) => (
                            <li 
                                key={city.Name}
                                className={`suggestion-item ${index === selectedSuggestionIndex ? 'selected' : ''}`}
                                onClick={() => handleSuggestionClick(city)}
                            >
                                {city.Name}
                                <span className="suggestion-country">{city.Country}</span>
                            </li>
                        ))}
                    </ul>
                )}                
            </div>
        </>
    );
}
