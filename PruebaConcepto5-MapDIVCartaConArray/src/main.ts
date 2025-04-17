interface InfoCarta {
    idFoto: number;
    imagen: string;
  }
  
  const cartas: InfoCarta[] = [
    { idFoto: 1, imagen: "https://github.com/Lemoncode/fotos-ejemplos/blob/main/memo/1.png?raw=true" },
    { idFoto: 2, imagen: "https://github.com/Lemoncode/fotos-ejemplos/blob/main/memo/2.png?raw=true" },
    { idFoto: 3, imagen: "https://github.com/Lemoncode/fotos-ejemplos/blob/main/memo/3.png?raw=true" },
    { idFoto: 4, imagen: "https://github.com/Lemoncode/fotos-ejemplos/blob/main/memo/4.png?raw=true" },
    { idFoto: 5, imagen: "https://github.com/Lemoncode/fotos-ejemplos/blob/main/memo/5.png?raw=true" },
    { idFoto: 6, imagen: "https://github.com/Lemoncode/fotos-ejemplos/blob/main/memo/6.png?raw=true" },
  ];


const gridContainer = document.getElementById('grid-container') as HTMLDivElement;
  
cartas.forEach((_, index) => {
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card');
    cardDiv.setAttribute('data-index', index.toString());
  
    const cardImg = document.createElement('img');
    cardImg.src = "back-of-card.jpg";
    cardImg.alt = `Carta ${index + 1}`;
    cardImg.setAttribute('data-index', index.toString());
  
    cardDiv.appendChild(cardImg);
    gridContainer.appendChild(cardDiv);
  });


  gridContainer.addEventListener('click', (event) => {
    const target = event.target as HTMLImageElement;
    
    if (target && target.tagName === 'IMG') {
      const index = parseInt(target.getAttribute('data-index')!, 10);
      const carta = cartas[index];
      target.src = carta.imagen;
    }
  });