const cardContainer = document.getElementById('card-container') as HTMLDivElement;
const cardImage = document.getElementById('card-image') as HTMLImageElement;

const hiddenImageSrc = 'back-of-card.jpg';
const revealedImageSrc = 'https://example.com/images/gatito.jpg';


const revealCard = () => {
    cardImage.src = revealedImageSrc;
};

cardContainer.addEventListener('click', revealCard);

