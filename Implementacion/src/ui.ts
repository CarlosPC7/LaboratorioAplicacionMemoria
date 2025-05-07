import { iniciaPartida, sonPareja, parejaEncontrada, parejaNoEncontrada, sePuedeVoltearLaCarta, voltearLaCarta } from './motor';
import { Tablero, tablero } from './modelo';

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
  const cartaElement = document.querySelector(`img[data-indice-array="${indice}"]`) as HTMLImageElement;

  if (cartaElement) {
    cartaElement.classList.add('animacion-carta');
    setTimeout(() => {
      cartaElement.classList.remove('animacion-carta');

    if (sePuedeVoltearLaCarta(tablero, indice)) {
        voltearLaCarta(tablero, indice);
        renderizarTablero1();
        esLaSegundaCarta(tablero);
        } else {
        mostrarMensajeCartaVolteada(indice);
      }
    }, 600);
    } else {
    // Si no hay carta (por algún error), ejecutar directamente
    if (sePuedeVoltearLaCarta(tablero, indice)) {
      voltearLaCarta(tablero, indice);
      renderizarTablero1();
      esLaSegundaCarta(tablero);
    } else {
      mostrarMensajeCartaVolteada(indice);
    }
  }
};

const esLaSegundaCarta = (tablero: Tablero) => {
  const indiceCartaA = tablero.indiceCartaVolteadaA;
  const indiceCartaB = tablero.indiceCartaVolteadaB;

  if (indiceCartaA !== undefined && indiceCartaB !== undefined) {
        if (sonPareja(indiceCartaA, indiceCartaB, tablero)) {
          parejaEncontrada(tablero, indiceCartaA, indiceCartaB);
        } else {
          setTimeout(() => {
            parejaNoEncontrada(tablero, indiceCartaA, indiceCartaB);
            renderizarTablero1();
          }, 1000);
          actualizarIntentos();
        }
      }
}


// Asociar el botón "Iniciar Partida" al evento de iniciar la partida
btnIniciar.addEventListener('click', iniciarPartidaHandler);

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

//2. Mostrar una animación cuando el usuario pinche en una carta
// Añadido a función el código cartaElement.classList.remove('animacion-carta');

// 4. Mostrar un mensaje si el usuario pincha en una carta ya volteada
const mostrarMensajeCartaVolteada = (indice: number) => {
  const carta = tablero.cartas[indice];
    if (carta.estaVuelta || carta.encontrada) {
      alert("Esta carta ya está volteada o ya ha sido encontrada.");
    }
}