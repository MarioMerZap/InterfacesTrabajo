import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import './i18n/i18n'
import { App } from "./App";

// Hacer referencia al elemento id="root", contenedor principal de la app
const rootElement = document.getElementById('root');
// Crear la raiz en el DOM
const root = ReactDOM.createRoot(rootElement);

root.render(
        <BrowserRouter>
                <App />
        </BrowserRouter>
        
);