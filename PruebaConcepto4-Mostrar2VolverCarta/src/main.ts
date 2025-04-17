const containerCards = document.getElementById('grid-container') as HTMLDivElement;

const cardZero = 'https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/refs/heads/main/memo/1.png';
const cardOne = 'https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/refs/heads/main/memo/6.png';
const cardTwo = 'https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/refs/heads/main/memo/5.png';

const cardsToFlip = [cardOne, cardTwo]

for (let i = 0; i < 2; i++) {
    const card = document.createElement('div');
    card.classList.add('card');

    const imageCard = document.createElement('img');
    imageCard.classList.add('imageCard');
    imageCard.src = cardZero;

    card.addEventListener("click", () => {
        imageCard.src = cardsToFlip[i];
    })

    card.appendChild(imageCard);
    containerCards.appendChild(card);
};