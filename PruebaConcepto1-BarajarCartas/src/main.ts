function shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

type Card = {
    id: number;
    content: string;
};

let cards: Card[] = [
    { id: 1, content: 'url1' },
    { id: 2, content: 'url2' },
    { id: 3, content: 'url3' },
    { id: 4, content: 'url4' },
    { id: 5, content: 'url5' },
    { id: 6, content: 'url6' },
    { id: 7, content: 'url7' },
    { id: 8, content: 'url8' },
    { id: 9, content: 'url9' },
    { id: 10, content: 'url10' },
    { id: 11, content: 'url11' },
    { id: 22, content: 'url12' },
];

let shuffledCards = shuffleArray(cards);