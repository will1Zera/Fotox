'use strict';


let search = document.querySelector(".search__bar");
let title = document.querySelector(".main__title");
let references = document.querySelector(".main__references");
let pagination = document.querySelector(".page");
let total = document.querySelector(".page-total");
let left = document.querySelector(".fa-angle-left");
let right = document.querySelector(".fa-angle-right");
let pageContainer = document.querySelector(".main__pagination");


// Funções que pesquisam e carregam as imagens
const searchImages = async (text) =>{
    const key = '28670379-c439a255bcbfc6cf509c0f518';
    const url = `https://pixabay.com/api/?key=${key}&q=${text}`;
    const response = await fetch(url);
    return response.json();
    
};

const createCard = ({webformatURL, pageURL}) =>{
    const card = document.createElement('div');
    card.classList.add('card__container');
    card.innerHTML = `
        <a href="${pageURL}" target="_blank" class="card__image">
            <img src=${webformatURL} >
        </a>
    `;
    return card;
};

const loadGallery = async (text, page = 1) =>{
    const container = document.querySelector('.main__gallery');
    const {hits, totalHits} = await searchImages (`${text}&page=${page}`);
    const cards = hits.map(createCard);
    const totalPages = Math.ceil(totalHits / 20);
    container.replaceChildren(...cards);

    console.log(cards);

    pagination.value = page;
    total.textContent = `/ ${totalPages}`;
};


// Evento que captura o pressionamento da tecla Enter
search.addEventListener('keypress', ({key, target}) =>{
    if (key === 'Enter'){
        
        loadGallery(target.value);
        title.classList.add("display-none");
        references.classList.add("display-none");
        pageContainer.classList.remove("display-none");
    }
});

// Captura a tecla Enter e muda a page
pagination.addEventListener('keypress', ({key, target}) =>{
    const text = document.querySelector(".search__bar").value;
    if (key === 'Enter'){
        
        loadGallery(text, target.value);
    }
});

//Avança a página para direita
right.addEventListener('click', () =>{
    let page = Number(pagination.value);
    const totalPages = Number(total.textContent.replace('/', ''));
    const text = document.querySelector(".search__bar").value;
    if (page < totalPages){
        page++;

        loadGallery(text, page);
    }
});

//Avança a página para esquerda
left.addEventListener('click', ()=>{
    let page = Number(pagination.value);
    const text = document.querySelector(".search__bar").value;
    if (page > 1){
        page--;

        loadGallery(text, page);
    }
});