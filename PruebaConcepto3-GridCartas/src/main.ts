const gridCartas = document.getElementById("grid-container") as HTMLDivElement;

for (let i = 0 ; i < 12; i++) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.textContent = 'Inserta aquí foto de animal';

  gridCartas.appendChild(card);
}
