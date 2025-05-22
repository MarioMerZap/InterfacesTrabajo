import React from "react";

const propLabels = {
    continent: "Continente",
    country: "País",
    distance: "Distancia",
    direction: "Dirección",
    population: "Población",
    coastalCity: "Costera"
};

export function Settings({ visibleProps, setVisibleProps }) {
    const toggleProperty = (prop) => {
        if (visibleProps.includes(prop)) {
            setVisibleProps(visibleProps.filter(p => p !== prop));
        } else {
            setVisibleProps([...visibleProps, prop]);
        }
    };

    return (
        <div className="settings">
            <h3>Características visibles</h3>
            {Object.entries(propLabels).map(([prop, label]) => (
                <label key={prop}>
                    <input
                        type="checkbox"
                        checked={visibleProps.includes(prop)}
                        onChange={() => toggleProperty(prop)}
                    />
                    {label}
                </label>
            ))}
        </div>
    );
}
