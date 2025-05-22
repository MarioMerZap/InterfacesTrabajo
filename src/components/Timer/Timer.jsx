import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../Button/Button.jsx';
import './Timer.css';


export function Timer({ initialTime, onTimeOut, onPauseChange, isGameFinished }) {
    const [timeLeft, setTimeLeft] = useState(initialTime); // Estado para almacenar y controlar el tiempo
    const [isPaused, setIsPaused] = useState(false); // Estado para controlar si el tiempo está pausado
    const timerRef = useRef(null); // Almacena el id del intervalo para cuando este en pausa
    
    const { t } = useTranslation();

    // Detener el tiempo cuando el juego termina
    useEffect(() => {
        if (isGameFinished) {
            clearInterval(timerRef.current);
        }
    }, [isGameFinished]);

    // Funcionamiento del temporalizador
    useEffect(() => {
        if (isPaused || isGameFinished){
            return;
        } 

        // Decrementa en un segundo el intervalo
        timerRef.current = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timerRef.current);
                    onTimeOut();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timerRef.current);
    }, [isPaused, onTimeOut, isGameFinished]);

    // Notifica al padre que está en pausa
    useEffect(() => {
        if (onPauseChange) {
            onPauseChange(isPaused);
        }
    }, [isPaused, onPauseChange]);

    

    function handlePause(){
        if (!isGameFinished) {
            setIsPaused(prev => !prev);
        }
    }

    // Reseteo del tiempo
    const resetTimer = () => {
        if (!isGameFinished) {
            clearInterval(timerRef.current);
            setTimeLeft(initialTime);
            setIsPaused(false);

            timerRef.current = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        clearInterval(timerRef.current);
                        // Llama a la función `onTimeOut` para notificar que el tiempo se ha acabado
                        onTimeOut();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);

        }
    };

    return (
        <div className="timer-container">
            <span className="timer-text">{t("text.timer")} {timeLeft}s</span>
            <div className="timer-controls">
                <Button 
                    label={isPaused ? '▶' : '⏸'} 
                    variant="timer-control-button"
                    onClick={handlePause}
                    disabled={isGameFinished}
                />
                <Button 
                    label="↻" 
                    variant="timer-control-button"
                    onClick={resetTimer}
                    disabled={isGameFinished}
                />
            </div>
        </div>
    );
}