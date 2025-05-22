import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { HeadLine } from '../../components/HeadLine/HeadLine.jsx';
import { Checkbox } from '../../components/Checkbox/Checkbox.jsx';
import { NumberSelector } from '../../components/NumberSelector/NumberSelector.jsx';
import { Switch } from '../../components/Switch/Switch.jsx';
import { RangeSlider } from '../../components/RangeSlider/RangeSlider.jsx';

import './GameSettings.css';
import '../../global.css';

export function ChooseSettings() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const difficulties = ['EASY', 'MEDIUM', 'HARD', 'DOOM'];

  const [settings, setSettings] = useState({
    continent: true,
    country: true,
    distance: true,
    direction: true,
    population: true,
    coastalCity: true,
    attempts: 6,
    time: 30,
    difficulty: 'EASY',
    randomDifficulty: false,
    attemptsEnabled: false,
    timeEnabled: false,
  });

  const elementIcons = {
    continent: '🌎',
    country: '🏳️',
    distance: '↔️',
    direction: '🧭',
    population: '🧑‍🤝‍🧑',
    coastalCity: '🏖️'
  };

  const difficultyIcons = {
    EASY: '😊',
    MEDIUM: '😅',
    HARD: '😓',
    DOOM: '🤯'
  };

  const handleCheckboxChange = (key) =>
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));

  const handleNumberChange = (key, value) =>
    setSettings(prev => ({ ...prev, [key]: parseInt(value) }));

  const handleSwitchChange = (key) =>
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));

  const handleDifficultyChange = (newDifficulty) => {
    const normalized = newDifficulty.toUpperCase();
    setSettings(prev => ({ ...prev, difficulty: normalized }));
  };

  const handlePlay = () => {
    const selectedDifficulty = settings.randomDifficulty
      ? difficulties[Math.floor(Math.random() * difficulties.length)]
      : settings.difficulty;

      navigate('/choose-city', {
        state: { settings }
      });
      
  };

  const handleMainMenu = () => navigate('/');

  const settingsHelpContent = (
    <div>
      <h3>{t('text.game_settings')}</h3>
      <p>{t('text.customize_your_game_experience')}</p>
      <ul>
        <li><strong>{t('text.attempts_limit_help')}:</strong> {t('text.number_of_guesses_allowed')}</li>
        <li><strong>{t('text.time_limit_help')}:</strong> {t('text.timer_per_attempt')}</li>
        <li><strong>{t('text.elements_help')}:</strong> {t('text.which_clues_to_display')}</li>
        <li><strong>{t('text.difficult_help')}:</strong> {t('text.obscurity_of_target_cities')}</li>
      </ul>
    </div>
  );

  const elementTranslations = {
    continent: 'text.continent_settings',
    country: 'text.country_settings',
    distance: 'text.distance_settings',
    direction: 'text.direction_settings',
    population: 'text.population_settings',
    coastalCity: 'text.coastal_city_settings'
  };

  return (
    <>
      <HeadLine
        title={t('text.guess_the_city')}
        subtitle={t('text.customize_your_game_settings')}
        handleMainMenu={handleMainMenu}
        showHome={true}
        showBack={false}
        helpContent={settingsHelpContent}
      />

      <main className="game-settings-container" aria-labelledby="rotation-settings-title">
        <span id="rotation-settings-title" className="section-title">⚙ {t('text.rules')}</span>

        <div className="toggles-row">
          <div className="toggle-container">
            <label htmlFor="time-switch" className="toggle-label time">{t('text.time_limit')}</label>
            <Switch
              id="time-switch"
              initialValue={settings.timeEnabled}
              onToggle={() => handleSwitchChange('timeEnabled')}
            />
          </div>
          {settings.timeEnabled && (
            <NumberSelector
              value={settings.time}
              onChange={e => handleNumberChange('time', e.target.value)}
              options={[10, 20, 30, 40, 50, 60]}
            />
          )}

          <div className="toggle-container">
            <label htmlFor="attempts-switch" className="toggle-label attempts">{t('text.attempts_limit')}</label>
            <Switch
              id="attempts-switch"
              initialValue={settings.attemptsEnabled}
              onToggle={() => handleSwitchChange('attemptsEnabled')}
            />
          </div>
          {settings.attemptsEnabled && (
            <NumberSelector
              value={settings.attempts}
              onChange={e => handleNumberChange('attempts', e.target.value)}
              options={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
            />
          )}
        </div>

        <div className="section-with-title">
          <span className="section-title">🧩 {t('text.elements')}</span>
          <div className="options-grid">
            {Object.entries(elementTranslations).map(([key, labelKey]) => (
              <div className="option-item" key={key}>
                <Checkbox
                  label={`${elementIcons[key]} ${t(labelKey)}`}
                  checked={settings[key]}
                  onChange={() => handleCheckboxChange(key)}
                />
              </div>
            ))}
          </div>
        </div>

      </main>

      <button
        className="floating-next-button"
        onClick={handlePlay}
        aria-label={t('text.play')}
      >
        {t('text.play')}
        <svg className="next-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M5 12h14M12 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </>
  );
}
