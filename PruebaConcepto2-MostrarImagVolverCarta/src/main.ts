const cardContainer = document.getElementById('card-container') as HTMLDivElement;
const cardImage = document.getElementById('card-image') as HTMLImageElement;

const hiddenImageSrc = cardImage.src;
const revealedImageSrc = 'https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/refs/heads/main/memo/1.png';

let isRevealed = false;

const revealCard = () => {
    isRevealed = !isRevealed;
    cardImage.src = isRevealed ? revealedImageSrc : hiddenImageSrc ;
};

cardContainer.addEventListener('click', revealCard);

