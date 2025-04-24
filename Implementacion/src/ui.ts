import { iniciaPartida, sonPareja, parejaEncontrada, parejaNoEncontrada, sePuedeVoltearLaCarta, voltearLaCarta } from './motor';
import { tablero } from './modelo';

// Referencias al DOM
const btnIniciar = document.getElementById('btn-iniciar') as HTMLButtonElement;
const tableroElement = document.getElementById('tablero') as HTMLDivElement;


// Función para iniciar la partida
const iniciarPartidaHandler = () => {
  iniciaPartida(tablero);
  renderizarTablero1();
};


// Función para renderizar el tablero de cartas
const renderizarTablero1 = () => {
  tableroElement.innerHTML = '';
  tablero.cartas.forEach((carta, indice) => {
    const cartaElement = document.createElement('img');
    cartaElement.src = carta.estaVuelta || carta.encontrada ? carta.imagen : 'ruta-a-imagen-carta-boca-abajo.png';
    cartaElement.classList.add('carta');
    cartaElement.setAttribute('data-indice-array', indice.toString());
    cartaElement.addEventListener('click', () => manejarClickCarta1(indice));
    tableroElement.appendChild(cartaElement);
  });
};

// Función para manejar el clic en una carta
const manejarClickCarta1 = (indice: number) => {
  if (sePuedeVoltearLaCarta(tablero, indice)) {
    voltearLaCarta(tablero, indice);
    renderizarTablero1();

    if (tablero.estadoPartida === 'DosCartasLevantadas') {
      const { indiceCartaVolteadaA, indiceCartaVolteadaB } = tablero;

      if (indiceCartaVolteadaA !== undefined && indiceCartaVolteadaB !== undefined) {
        if (sonPareja(indiceCartaVolteadaA, indiceCartaVolteadaB, tablero)) {
          parejaEncontrada(tablero, indiceCartaVolteadaA, indiceCartaVolteadaB);
        } else {
          setTimeout(() => {
            parejaNoEncontrada(tablero, indiceCartaVolteadaA, indiceCartaVolteadaB);
            renderizarTablero1();
          }, 1000);
        }
      }
    }
  }
};

// Asociar el botón "Iniciar Partida" al evento de iniciar la partida
btnIniciar.addEventListener('click', iniciarPartidaHandler);

// Inicializar tablero vacío al inicio (iniciarPartida)
/*tablero = {
  cartas: [],
  estadoPartida: 'PartidaNoIniciada',
};*/

// Inicializamos el tablero en la UI (mostrando las cartas boca abajo)
renderizarTablero1();


// Apartados opcionales
// 1. Mostrar cuántos intentos lleva el usuario
let intentos = 0;
const intentosElement = document.getElementById('intentos') as HTMLDivElement;

const actualizarIntentos = () => {
  intentos++;
  intentosElement.textContent = `Intentos: ${intentos}`;
};

const manejarClickCarta2 = (indice: number) => {
  if (sePuedeVoltearLaCarta(tablero, indice)) {
    voltearLaCarta(tablero, indice);
    renderizarTablero2();

    if (tablero.estadoPartida === 'DosCartasLevantadas') {
      const { indiceCartaVolteadaA, indiceCartaVolteadaB } = tablero;

      if (indiceCartaVolteadaA !== undefined && indiceCartaVolteadaB !== undefined) {
        if (sonPareja(indiceCartaVolteadaA, indiceCartaVolteadaB, tablero)) {
          parejaEncontrada(tablero, indiceCartaVolteadaA, indiceCartaVolteadaB);
        } else {
          setTimeout(() => {
            parejaNoEncontrada(tablero, indiceCartaVolteadaA, indiceCartaVolteadaB);
            renderizarTablero2();
          }, 1000);
        }
        actualizarIntentos();
      }
    }
  }
};

//2. Mostrar una animación cuando el usuario pinche en una carta

const renderizarTablero2 = () => {
    tableroElement.innerHTML = '';
    tablero.cartas.forEach((carta, indice) => {
      const cartaElement = document.createElement('img');
      cartaElement.src = carta.estaVuelta || carta.encontrada ? carta.imagen : 'ruta-a-imagen-carta-boca-abajo.png';
      cartaElement.classList.add('carta');
      cartaElement.setAttribute('data-indice-array', indice.toString());
  
      cartaElement.classList.add('animacion-carta');
      
      cartaElement.addEventListener('click', () => manejarClickCarta2(indice));
      tableroElement.appendChild(cartaElement);
    });
  };

// 4. Mostrar un mensaje si el usuario pincha en una carta ya volteada
const manejarClickCarta3 = (indice: number) => {
    const carta = tablero.cartas[indice];
    if (carta.estaVuelta || carta.encontrada) {
      alert("Esta carta ya está volteada o ya ha sido encontrada.");
      return;
    }
  
    if (sePuedeVoltearLaCarta(tablero, indice)) {
      voltearLaCarta(tablero, indice);
      renderizarTablero3();
  
      if (tablero.estadoPartida === 'DosCartasLevantadas') {
        const { indiceCartaVolteadaA, indiceCartaVolteadaB } = tablero;
  
        if (indiceCartaVolteadaA !== undefined && indiceCartaVolteadaB !== undefined) {
          if (sonPareja(indiceCartaVolteadaA, indiceCartaVolteadaB, tablero)) {
            parejaEncontrada(tablero, indiceCartaVolteadaA, indiceCartaVolteadaB);
          } else {
            setTimeout(() => {
              parejaNoEncontrada(tablero, indiceCartaVolteadaA, indiceCartaVolteadaB);
              renderizarTablero3();
            }, 1000);
          }
          actualizarIntentos();
        }
      }
    }
  };

  const renderizarTablero3 = () => {
    tableroElement.innerHTML = '';
    tablero.cartas.forEach((carta, indice) => {
      const cartaElement = document.createElement('img');
      cartaElement.src = carta.estaVuelta || carta.encontrada ? carta.imagen : 'ruta-a-imagen-carta-boca-abajo.png';
      cartaElement.classList.add('carta');
      cartaElement.setAttribute('data-indice-array', indice.toString());
  
      cartaElement.classList.add('animacion-carta');
      
      cartaElement.addEventListener('click', () => manejarClickCarta3(indice));
      tableroElement.appendChild(cartaElement);
    });
  };