import { useTranslation } from 'react-i18next';
import redImage from '../../images/red.png'; 
import greenImage from '../../images/green.png';
import darkCircle from '../../images/dark_circle.png';
import arrow0 from '../../images/arrow_0.png';
import arrow45 from '../../images/arrow_45.png';
import arrow90 from '../../images/arrow_90.png';
import arrow135 from '../../images/arrow_135.png';
import arrow180 from '../../images/arrow_180.png';
import arrow225 from '../../images/arrow_225.png';
import arrow270 from '../../images/arrow_270.png';
import arrow315 from '../../images/arrow_315.png';

import '../../global.css';
import './ListElement.css';

export function ListElement({ userCity, targetCity, settings }) {
  const { t } = useTranslation(); // 👈 MOVIDO AQUÍ

  // Verificación temprana para evitar errores
  if (
    !userCity ||
    !targetCity ||
    userCity.name === undefined ||
    userCity.continent === undefined ||
    userCity.country === undefined ||
    userCity.x === undefined ||
    userCity.y === undefined ||
    userCity.population === undefined ||
    userCity.isCoastal === undefined ||
    targetCity.Continent === undefined ||
    targetCity.Country === undefined ||
    targetCity.CoordinateX === undefined ||
    targetCity.CoordinateY === undefined ||
    targetCity.Population === undefined ||
    targetCity.CoastalCity === undefined
  ) {
    console.warn("ListElement recibió datos incompletos:", { userCity, targetCity });
    return null;
  }


  const isContinent = userCity.continent === targetCity.Continent;
  const isCountry = userCity.country === targetCity.Country;
  const isCoastal = !!targetCity.CoastalCity;


  const calculateDistance = () => {
    const R = 6371;
    const dLat = ((targetCity.CoordinateY - userCity.y) * Math.PI) / 180;
    const dLon = ((targetCity.CoordinateX - userCity.x) * Math.PI) / 180;
    const lat1 = (userCity.y * Math.PI) / 180;
    const lat2 = (targetCity.CoordinateY * Math.PI) / 180;

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;

    return (R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))).toFixed(1);
  };

  const calculateDirection = () => {
    const dx = targetCity.CoordinateX - userCity.x;
    const dy = targetCity.CoordinateY - userCity.y;
    const angle = (Math.atan2(dy, dx) * (180 / Math.PI) + 360) % 360;

    const directionMap = [
      { max: 22.5, arrow: arrow0 },
      { max: 67.5, arrow: arrow45 },
      { max: 112.5, arrow: arrow90 },
      { max: 157.5, arrow: arrow135 },
      { max: 202.5, arrow: arrow180 },
      { max: 247.5, arrow: arrow225 },
      { max: 292.5, arrow: arrow270 },
      { max: 337.5, arrow: arrow315 },
      { max: 360, arrow: arrow0 },
    ];

    return directionMap.find((d) => angle <= d.max).arrow;
  };

  const calculatePopulation = () => {
    const diff = userCity.population - targetCity.Population;
    return diff < 0 ? arrow90 : diff > 0 ? arrow270 : arrow0;
  };

  const getArrowSizeClass = (arrow) => {
    const inclined = [arrow45, arrow135, arrow225, arrow315];
    return inclined.includes(arrow) ? 'inclinedArrow' : 'arrow';
  };

  const directionArrow = calculateDirection();
  const populationArrow = calculatePopulation();
  const distanceValue = calculateDistance();

  const booleanIcon = (condition) => (
    <img
      src={condition ? greenImage : redImage}
      alt=""
      className={condition ? 'correct' : 'incorrect'}
    />
  );

  return (
    <div className="container">
      <li>
        <div className="cityEntry">
          <div className="cityName">{t(`text.${userCity.name}`)}</div>

          <div className="cityData">
            {settings.continent && (
              <div id="Continent">
                {booleanIcon(isContinent)}
                <span className="label">{t("text.continent_game")}</span>
              </div>
            )}
            {settings.country && (
              <div id="Country">
                {booleanIcon(isCountry)}
                <span className="label">{t("text.country_game")}</span>
              </div>
            )}
            {settings.distance && (
              <div id="Distance" className="distance-container">
                <img src={darkCircle} alt="" className="distance-circle-img" />
                <span className="distance-circle-text">{distanceValue}</span>
                <span className="label">{t("text.distance_game")}</span>
              </div>
            )}
            {settings.direction && (
              <div id="Direction">
                <img
                  src={directionArrow}
                  alt=""
                  className={getArrowSizeClass(directionArrow)}
                />
                <span className="label">{t("text.direction_game")}</span>
              </div>
            )}
            {settings.population && (
              <div id="Population">
                <img
                  src={populationArrow}
                  alt=""
                  className={getArrowSizeClass(populationArrow)}
                />
                <span className="label">{t("text.population_game")}</span>
              </div>
            )}
            {settings.coastalCity && (
              <div id="Coastal">
                {booleanIcon(isCoastal)}
                <span className="label">{t("text.coastal_game")}</span>
              </div>
            )}
          </div>
        </div>
      </li>
    </div>
  );
}