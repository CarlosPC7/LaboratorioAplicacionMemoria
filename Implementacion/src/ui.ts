import { iniciaPartida, sonPareja, parejaEncontrada, parejaNoEncontrada, sePuedeVoltearLaCarta, voltearLaCarta } from './motor';
import { Tablero, tablero } from './modelo';

// Referencias al DOM
const btnIniciar = document.getElementById('btn-iniciar');
const tableroElement = document.getElementById('tablero');


// Función para iniciar la partida
const iniciarPartidaHandler = () => {
  iniciaPartida(tablero);
};


// Función para renderizar el tablero de cartas
const renderizarTablero = () => {
  if (tableroElement && tableroElement instanceof HTMLDivElement) {
  tableroElement.innerHTML = '';
  tablero.cartas.forEach((carta, indice) => {
    const cartaElement = document.createElement('img');
    cartaElement.src = carta.estaVuelta || carta.encontrada ? carta.imagen : 'ruta-a-imagen-carta-boca-abajo.png';
    cartaElement.classList.add('carta');
    cartaElement.setAttribute('data-indice-array', indice.toString());
    cartaElement.addEventListener('click', () => manejarClickCarta(indice));
    tableroElement.appendChild(cartaElement);
  });
}
};

const mostrarCartaAnimal = (indiceCarta: number, urlCarta: string) => {
  const elementoImagen = document.querySelector(`img[data-indice-array="${indiceCarta}"]`);

  if (elementoImagen !== null && elementoImagen !== undefined && elementoImagen instanceof HTMLImageElement) {
    elementoImagen.src = urlCarta;
  }
}

// Función para manejar el clic en una carta
const manejarClickCarta = (indice: number) => {
  const cartaElement = document.querySelector(`img[data-indice-array="${indice}"]`);

  if (cartaElement && cartaElement instanceof HTMLImageElement) {
    cartaElement.classList.add('animacion-carta');
    setTimeout(() => {
      cartaElement.classList.remove('animacion-carta');

    if (sePuedeVoltearLaCarta(tablero, indice)) {
        voltearLaCarta(tablero, indice);
        mostrarCartaAnimal(indice, tablero.cartas[indice].imagen);
        esLaSegundaCarta(tablero);
        } else {
        mostrarMensajeCartaVolteada(indice);
      }
    }, 600);
    } else {
    console.error('error!')
  }
};

const darleLaVueltaALasCartas = () => {
  for (let indice = 0; tablero.cartas.length > indice; indice++) {
    const elementoImagen = document.querySelector(`img[data-indice-array="${indice}"]`);

    if (elementoImagen !== null && elementoImagen !== undefined && elementoImagen instanceof HTMLImageElement) {
      if (!tablero.cartas[indice].encontrada && !tablero.cartas[indice].estaVuelta) {
        elementoImagen.src = '';
      }
    }
  }
}

const esLaSegundaCarta = (tablero: Tablero) => {
  const indiceCartaA = tablero.indiceCartaVolteadaA;
  const indiceCartaB = tablero.indiceCartaVolteadaB;

  if (indiceCartaA !== undefined && indiceCartaB !== undefined) {
        if (sonPareja(indiceCartaA, indiceCartaB, tablero)) {
          parejaEncontrada(tablero, indiceCartaA, indiceCartaB);
        } else {
          setTimeout(() => {
            parejaNoEncontrada(tablero, indiceCartaA, indiceCartaB);
            darleLaVueltaALasCartas();
          }, 1000);
          actualizarIntentos();
        }
      }
}


// Asociar el botón "Iniciar Partida" al evento de iniciar la partida
const mostrarInicioSesion = () => {
  if (btnIniciar && btnIniciar instanceof HTMLButtonElement) {
    btnIniciar.addEventListener('click', iniciarPartidaHandler);
  }
  renderizarTablero();
}

document.addEventListener("DOMContentLoaded", mostrarInicioSesion);

// // Inicializamos el tablero en la UI (mostrando las cartas boca abajo)
// renderizarTablero1();


// Apartados opcionales
// 1. Mostrar cuántos intentos lleva el usuario
let intentos = 0;
const intentosElement = document.getElementById('intentos');

const actualizarIntentos = () => {
  if (intentosElement && intentosElement instanceof HTMLDivElement) {
  intentos++;
  intentosElement.textContent = `Intentos: ${intentos}`;
}
};

//2. Mostrar una animación cuando el usuario pinche en una carta
//3. Mostrar un efecto hover cuando el usuario ponga el ratón sobre una carta
// Añadidos a función el código cartaElement.classList.remove('animacion-carta');

// 4. Mostrar un mensaje si el usuario pincha en una carta ya volteada
const mostrarMensajeCartaVolteada = (indice: number) => {
  const carta = tablero.cartas[indice];
    if (carta.estaVuelta || carta.encontrada) {
      alert("Esta carta ya está volteada o ya ha sido encontrada.");
    }
}