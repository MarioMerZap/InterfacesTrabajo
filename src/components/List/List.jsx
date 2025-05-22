import { ListElement } from '../ListElement/ListElement.jsx';

export function List({ cities, targetCity, settings }) {
    return (
        <ul>
            {cities
                .filter(city =>
                    city &&
                    city.name &&
                    city.continent !== undefined &&
                    city.country !== undefined &&
                    city.x !== undefined &&
                    city.y !== undefined &&
                    city.population !== undefined &&
                    city.isCoastal !== undefined
                )
                .map(city => (
                    <ListElement
                        key={city.id}
                        userCity={city}
                        targetCity={targetCity}
                        settings={settings}
                    />
                ))}
        </ul>
    );
}
