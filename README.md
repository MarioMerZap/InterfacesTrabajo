- Grupo Z.
- Nombre del proyecto: Citydle

- Roles Proyecto:
  * CIO: Mario Merino Zapata mariomerzap@uma.es
 
- Por problemas con la carpeta .git en la que originalmente se incluyeron recursos importantes para el proyecto, he tenido que subir al github el zip y este readme con la información original del proyecto y la instalación, el motivo de esto es que si tocaba el .git las imágenes y la traducción donde funcionan desaparecía y aunque las imágenes entiendo la lógica tras ellas desconozco el por qué de la traducción, haciendolo así un problema que no he podido solucionar.

- Instrucciones de instalación de este proyecto:
  1.- Descargar el archivo .zip del github de nombre "ProyectoEntrega.zip"
  2.- Una vez descargado el archivo .zip descomprimirlo en una carpeta vacía
  3.- Tras descomprimir el zip y todo su contenido en una carpeta vacía, abrirlo con visual studio code o la aplicación que use para react
  4.- Tras abrirlo en el terminal de la carpeta principal debe poner "npm install --legacy-peer-deps" para que no se generen incompatibilidades con la versión de react original del proyecto y la traducción
  5.- Una vez terminado el proceso anterior hacer "npm start" y tras terminar ese proceso debería iniciarse en tu navegador, si no se iniciará en localhost:3000

- El juego se basa en adivinar la ciudad en función de los siguientes parámetros:
  * Continente
  *  País
  *  Distancia
  * Dirección
  * Población
  * Ciudad costera

- Prueba:
  * Ciudad secreta: Río de Janeiro (Brasil)
  
  * Jugador ingresa: Barcelona (España)
  
  * Respuesta del juego:
    · Continente: No coincide (Barcelona está en Europa, la ciudad secreta en América del Sur)
  	· País: No coincide (España vs Brasil)
  	· Distancia: 8,600 km (Distancia entre las ciudades)
  	· Dirección: Suroeste (Dirección desde la ciudad ingresada)
  	· Población: ↑1.6M (Barcelona (~1.6M) vs. Río de Janeiro (~6.7M))
  	· Ciudad costera: Sí (Ambas son ciudades costeras)
  
- El jugador va respondiendo hasta que se acaben los intentos o acierte la ciudad.

- Modos de juego:

	* Modo clásico
		· Sin límite de tiempo
		· Numero de intentos ilimitados
		
	* Modo personalizado
		· El usuario elige que parámetros usar como pista.
		· El usuario puede establecer un tiempo determinado.
		· El usuario puede elegir cuantos intentos tener.
		
		
	- Formas de jugar:
	
		* Un jugador
			· Modo clásico
			· Modo personalizado

		* Multijugador: 				

			· Gana el jugador que llegue antes a un número determinado de rondas (1 ronda, 3 rondas, 5 rondas).
		
			· 1 vs 1 misma ciudad
				· Dos usuarios por turnos tratan de adivinar la misma ciudad.
				· El usuario que necesite menos intentos adivinar la ciudad gana la ronda.
			
			· 1 vs 1 distinta ciudad
				· Cada usuario elige una ciudad entre las disponibles y el otro usuario trata de adivinar cuál es.
				· La ronda la gana el usuario que menos intentos haya necesitado para lograr adivinar la ciudad del oponente.
				
			· 1 vs 1 contrarreloj máximo número de ciudades
				· Adivinar el mayor número de ciudades en un determinado tiempo.
				· El que más ciudades adivine gana la ronda.

			· 1 vs 1 contrarreloj una ciudad
				· Adivinar una ciudad en el menor tiempo posible.
				· El que consiga adivinar la ciudad en el menor tiempo posible gana la ronda.

    
