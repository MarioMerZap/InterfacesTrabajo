import { useRef, useState, useEffect } from 'react';
import './HeadLine.css';
import '../../global.css';

import { Window } from "../Window/Window.jsx";
import { useTranslation } from 'react-i18next';
import './HeadLine.css';
//import accessibilityIcon from '../../images/accessibility.png';
//import settingsIcon from '../../images/settings.png';
import homeIcon from '../../images/home.png';
import helpIcon from '../../images/help.png'
import backArrowIcon from '../../images/backArrow.png'
import langIcon from '../../images/icons8-idioma-50.png'
import espIcon from '../../images/iconBanderaEsp.png'
import ingIcon from '../../images/iconBanderaIng.webp'

export function HeadLine({ title, subtitle, handleMainMenu, handleBack, showHome, showBack, helpContent }) {

  const [showHelp, setShowHelp] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const { t, i18n } = useTranslation();
  const langIconRef = useRef(null);
  const langMenuRef = useRef(null);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        langMenuRef.current &&
        !langMenuRef.current.contains(event.target) &&
        !langIconRef.current.contains(event.target)
      ) {
        setShowLangMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="game-container">
        <div className="title">
          <h1>{title}</h1>
        </div>
        <div className="subtitle">
          <h2>{subtitle}</h2>
        </div>

        <div className="iconWrapperLeft">
            {showBack && (
              <div className="icon-label-container">
                <img src={backArrowIcon} alt="back" className="icon" onClick={handleBack}/>
                <span className="icon-label">{t("text.back")}</span>
              </div>
            )}
            
            {showHome && (
              <div className="icon-label-container">
                <img src={homeIcon} alt="home" className="icon" onClick={handleMainMenu} />
                <span className="icon-label">{t("text.home")}</span>
              </div>
            )}          
        </div>

        <div className="iconWrapperRight">
          {/*
          <div className="icon-label-container">
            <img src={accessibilityIcon} alt="accessibility" className="icon" />       
            <span className='icon-label'>Accessibility</span>       
          </div>
          */}
          {/*
          <div className="icon-label-container">
            <img src={settingsIcon} alt="settings" className="icon" />       
            <span className='icon-label'>Settings</span>       
          </div>
          */}
          <div className="icon-label-container language-selector">
            <img src={langIcon} alt="language" className="icon" onClick={() => setShowLangMenu(!showLangMenu)} ref={langIconRef}/>
            {showLangMenu && (
              <div className="language-dropdown styled-dropdown" ref={langMenuRef}>
                <img src={ingIcon} alt="English" className="flag" onClick={() => changeLanguage('en')}/>
                <img src={espIcon} alt="Español" className="flag" onClick={() => changeLanguage('es')}/>
              </div>
            )}
            <span className="icon-label">{t("text.language")}</span>
          </div>

          <div className="icon-label-container">
            <img src={helpIcon} alt="help" className="icon" onClick={() => setShowHelp(true)} />
            <span className="icon-label">{t("text.help")}</span>
          </div>
        </div>
      </div>

      <Window
        isOpen={showHelp}
        onClose={() => setShowHelp(false)}
        content={helpContent}
        type={"info"}
      />
    </>
  );
}