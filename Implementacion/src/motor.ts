import {Tablero, Carta} from './modelo';
/*
En el motor nos va a hacer falta un método para barajar cartas
*/
export const barajarCartas = (cartas : Carta[]): Carta[] => {
    for (let i = cartas.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cartas[i], cartas[j]] = [cartas[j], cartas[i]];
      }
      return cartas;
  };
  
  /*
    Una carta se puede voltear si no está encontrada y no está ya volteada, o no hay dos cartas ya volteadas
  */
export const sePuedeVoltearLaCarta = (tablero: Tablero, indice: number ): boolean => {
    const carta = tablero.cartas[indice];
    const { estadoPartida } = tablero;

        return (
            !carta.encontrada &&
            !carta.estaVuelta &&
            (estadoPartida === "CeroCartasLevantadas" || estadoPartida === "UnaCartaLevantada")
        );
};
  
export const voltearLaCarta = (tablero: Tablero, indice: number) : void => {
    if (sePuedeVoltearLaCarta(tablero, indice)) {
        const carta = tablero.cartas[indice];
        carta.estaVuelta = true;
    
        if (tablero.estadoPartida === "CeroCartasLevantadas") {
          tablero.indiceCartaVolteadaA = indice;
          tablero.estadoPartida = "UnaCartaLevantada";
        } else if (tablero.estadoPartida === "UnaCartaLevantada") {
          tablero.indiceCartaVolteadaB = indice;
          tablero.estadoPartida = "DosCartasLevantadas";
        }
      }
};
  
  /*
    Dos cartas son pareja si en el array de tablero de cada una tienen el mismo id
  */
export const sonPareja = (indiceA: number, indiceB: number, tablero: Tablero): boolean => {
    const cartaA = tablero.cartas[indiceA];
    const cartaB = tablero.cartas[indiceB];
        return cartaA.idFoto === cartaB.idFoto;
};
  
  /*
    Aquí asumimos ya que son pareja, lo que hacemos es marcarlas como encontradas y comprobar si la partida esta completa.
  */
export const parejaEncontrada = (tablero: Tablero, indiceA: number, indiceB: number) : void => {
    tablero.cartas[indiceA].encontrada = true;
    tablero.cartas[indiceB].encontrada = true;
    tablero.indiceCartaVolteadaA = undefined;
    tablero.indiceCartaVolteadaB = undefined;
    tablero.estadoPartida = esPartidaCompleta(tablero) ? "PartidaCompleta" : "CeroCartasLevantadas";
};
  
  /*
    Aquí asumimos que no son pareja y las volvemos a poner boca abajo
  */
export const parejaNoEncontrada = (tablero: Tablero, indiceA :number, indiceB : number) : void => {
    tablero.cartas[indiceA].estaVuelta = false;
    tablero.cartas[indiceB].estaVuelta = false;
    tablero.indiceCartaVolteadaA = undefined;
    tablero.indiceCartaVolteadaB = undefined;
    tablero.estadoPartida = "CeroCartasLevantadas";
};
  
  /*
    Esto lo podemos comprobar o bien utilizando every, o bien utilizando un contador (cartasEncontradas)
  */
export const esPartidaCompleta = (tablero: Tablero) : boolean => {
    return tablero.cartas.every(carta => carta.encontrada);
};
  
  /*
  Iniciar partida
  */
  
export const iniciaPartida = (tablero: Tablero): void => {
    tablero.cartas = barajarCartas(tablero.cartas.map(carta => ({
        ...carta,
        estaVuelta: false,
        encontrada: false
      })));
      tablero.estadoPartida = "CeroCartasLevantadas";
      tablero.indiceCartaVolteadaA = undefined;
      tablero.indiceCartaVolteadaB = undefined;
};