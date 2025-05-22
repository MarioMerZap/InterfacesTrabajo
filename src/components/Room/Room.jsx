import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../../global.css';
import './Room.css'; // Asegúrate de que este archivo exista en la ruta correcta

export function Room({ name }) {
    const [roomCode, setRoomCode] = useState('');

    const handleInputChange = (e) => {
        setRoomCode(e.target.value);
    };

    return (
        <div className="container">
            <div className="room-barra">
                <h2 className="room-title">{name}</h2>

                <input
                    className="room-input"
                    type="text"
                    value={roomCode}
                    onChange={handleInputChange}
                    aria-label="Room code input"
                    placeholder="Enter code"
                />

                <button className="room-button">
                    <span className="room-button-text">NEXT</span>
                </button>
            </div>
        </div>
    );
}

Room.propTypes = {
    name: PropTypes.string.isRequired
};