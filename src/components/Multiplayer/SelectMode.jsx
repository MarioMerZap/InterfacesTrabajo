import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../Button/Button.jsx';
import '../../global.css';
import { HeadLine } from '../HeadLine/HeadLine.jsx';

export function SelectMode() {
  const navigate = useNavigate();

  const handleRotationMode = () => {
    navigate('/rotationSettings'); // Asegúrate de tener esta ruta definida
  };

  const handleGuessingMode = () => {
    navigate('/chooseSettings'); // Asegúrate de tener esta ruta definida
  };

  const handleMainMenu = () => {
    navigate('/');
};

  const startHelpContent = (
    <div>
      <h3>Welcome to Guess the City!</h3>
      <p>Choose a Gamemode:</p>
      <ul>
        <li><strong>Rotation Mode:</strong> Players takes turns trying to guess the same city</li>
        <li><strong>Choose and Guess Mode:</strong> Player 1 chooses a city and player 2 tries to guess it</li>
      </ul>
      <p>You can personalize the gamemodes before you play them.</p>
    </div>
  );

  return (
    <>
      <HeadLine 
        title="GUESS THE CITY"
        subtitle="Select gamemode"
        handleMainMenu={handleMainMenu}
        showHome={true}
        showBack={false}
        helpContent={startHelpContent}
      />

      <div className="button-container">
        <Button 
          label="Rotation Mode"
          variant="button-left"
          onClick={handleRotationMode}
          logo="iconRotacion" // Asegúrate de tener este ícono en tu componente Button
          labelStyle="labelStyle"
        />
        <Button 
          label="Choose and Guess"
          variant="button-right"
          onClick={handleGuessingMode}
          logo="iconElegirAdivinar" // Asegúrate de tener este ícono
          labelStyle="labelStyle"
        />
      </div>
    </>
  );
}
