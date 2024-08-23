const card1 = document.getElementById('card1') as HTMLElement;
const card2 = document.getElementById('card2') as HTMLElement;
const img1 = card1.querySelector('img') as HTMLImageElement;
const img2 = card2.querySelector('img') as HTMLImageElement;

const card1FrontImage = 'cat1.jpg';
const card2FrontImage = 'cat2.jpg';

card1.addEventListener('click', () => {
    img1.src = card1FrontImage;
});

card2.addEventListener('click', () => {
    img2.src = card2FrontImage;
});