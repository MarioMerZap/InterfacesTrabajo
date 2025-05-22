import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button/Button.jsx';
import '../global.css';
import { HeadLine } from '../components/HeadLine/HeadLine.jsx';
// import { Room } from '../components/Room/Room.jsx';
import { useTranslation } from 'react-i18next';

export function StartMenu() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleCustomize = () => {
    navigate('/gameSettings');
  };

  const startHelpContent = (
    <div>
      <h3>{t("text.welcome_to_guess_the_city")}</h3>
      <p>{t("text.choose_your_game_mode")}</p>
      <ul>
        <li><strong>{t("text.multiplayer")}:</strong> {t("text.play_against_a_friend")}</li>
        <li><strong>{t("text.1player")}:</strong> {t("text.choose_your_game_mode")}</li>
      </ul>
      <p>{t("text.you_can_customize_game_settings_before_playing")}</p>
    </div>
  );

  return (
    <>
      <HeadLine 
        title={t("text.guess_the_city")}
        subtitle={t("text.select_the_number_of_players")}
        showHome={false}
        showBack={false}
        helpContent={startHelpContent}
      />

      {/* Contenedor de botones */}
      <div className="button-container">
      <Button 
          label="1 VS 1"
          variant="button-left"
          onClick={() => navigate('/gameSelect')}
          logo="iconDosjugadores"  
          labelStyle="labelStyle"
        />
        <Button 
          label={t("text.1player")}
          variant="button-right"
          onClick={handleCustomize}
          logo="iconUnjugador"
          labelStyle="labelStyle"
        />
      </div>
    </>
  );
}
