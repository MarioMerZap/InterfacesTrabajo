// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { StartMenu } from './pages/StartMenu.jsx';
import {Game} from './pages/Game.jsx';
import {GameSettings} from './pages/GameSettings/GameSettings.jsx';


import { LocalGame } from './pages/LocalGame';
import cities from './cities.json'; // importar datos

import { SelectMode } from './components/Multiplayer/SelectMode.jsx';
import {RotationSettings} from './pages/GameSettings/RotationSettings.jsx';

import { ChooseCity } from './components/Multiplayer/ChooseCity';
import { ConfirmCity } from './components/Multiplayer/ConfirmedCity';
import {ChooseSettings} from './pages/GameSettings/ChooseSettings.jsx';
import { ChooseGame } from './pages/ChooseGame.jsx';

export function App() {
    return (
        <Routes>
            <Route path="/" element={<StartMenu />} />
            <Route path="/game" element={<Game />} />
            <Route path="/gameSettings" element={<GameSettings />} />
            <Route path="/city-game-local" element={<LocalGame cities={cities} />} />
            <Route path="/gameSelect" element={<SelectMode />} />
            <Route path="/rotationSettings" element={<RotationSettings />} />
            <Route path="/choose-city" element={<ChooseCity />} />
            <Route path="/city-confirmed" element={<ConfirmCity />} />
            <Route path="/chooseSettings" element={<ChooseSettings />} />
            <Route path="/choose-game" element={<ChooseGame />} />
        </Routes>
    );
}
