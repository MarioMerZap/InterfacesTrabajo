import React from "react";

export function GuessInput({ input, setInput, onGuess, disabled }) {
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            onGuess();
        }
    };

    return (
        <div className="guessInput">
            <input
                type="text"
                placeholder="Escribe una ciudad"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={disabled}
            />
            <button onClick={onGuess} disabled={disabled}>
                Adivinar
            </button>
        </div>
    );
}
