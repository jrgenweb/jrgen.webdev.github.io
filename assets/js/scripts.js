
/** Animation On Scroll */
AOS.init();


const projectsContentEl = document.querySelector('.projects__content'); //projects container
const navToggleEl = document.querySelector('.nav-toggle'); // navigation button
const navEl = document.querySelector('nav .wrapper');//top navigation



navToggleEl.addEventListener('click', handleNavigation);




//add or remove class from nav element
function handleNavigation() {
    navEl.classList.toggle('active');
    console.log('working')
}




//load projects from data.json
async function loadProjects() {
    const response = await fetch('public/data.json');
    const projects = await response.json();
    renderCard(projects);
}


//For create a card Element
/* <div class="card">
<div class="card__image">
    <img src="assets/img/projects/szerzonorbert.webp" alt="">
</div>
<div class="card__content">
    <h3>Project Tile</h3>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Et ipsum itaque laudantium iusto
        sequi explicabo sed, inventore corporis blanditiis nihil facilis quasi voluptatem optio
        expedita libero aliquid? Eveniet, iste natus.</p>
</div>
<div class="card__tags">
    HTML5, BootStrap, SCSS
</div>
<div class="card__footer">
    <a href="#" class="btn-link link--preview">Live Preview</a>
    <a href="#" class="btn-link link--code">View Code</a>
</div>

</div> */



function renderCard(data) {
    data.forEach(element => {
        projectsContentEl.appendChild(
            createCard(element));
    });
}

function createCard(item) {

    const cardEl = document.createElement('div');
    cardEl.classList.add('card');
    cardEl.dataset.aos = "zoom-in";
    const cardImageEl = document.createElement('div');
    cardImageEl.classList.add('card__image');
    const imgEl = document.createElement('img');
    if (item.category != 'FEM') {
        imgEl.src = 'dist/img/projects/' + item.img_url;
    } else {
        imgEl.src = item.img_url;

    }
    imgEl.alt = item.title + ' screenshot';

    cardImageEl.appendChild(imgEl);
    const cardContentEl = document.createElement('div');
    cardContentEl.classList.add('card__content');
    const cardTitleEl = document.createElement('h3');
    cardTitleEl.innerText = item.title;
    const cardDescriptionEl = document.createElement('p');
    cardDescriptionEl.innerText = item.description;

    cardContentEl.appendChild(cardTitleEl);
    cardContentEl.appendChild(cardDescriptionEl);


    const cardTagsEl = document.createElement('div');
    cardTagsEl.classList.add('card__tags');
    cardTagsEl.innerText = item.tags.toString();

    const cardFooterEl = document.createElement('div');
    cardFooterEl.classList.add('card__footer');

    const cardLinkView = document.createElement('a');
    cardLinkView.classList.add('btn-link', 'link--preview')
    cardLinkView.href = item.urls.live;
    cardLinkView.target = "_blank";
    cardLinkView.innerText = "Liew Preview"

    const cardLinkCode = document.createElement('a');
    cardLinkCode.classList.add('btn-link', 'link--code')
    cardLinkCode.href = item.urls.code;
    cardLinkCode.target = "_blank";
    cardLinkCode.innerText = "View Code"

    cardFooterEl.appendChild(cardLinkView);
    cardFooterEl.appendChild(cardLinkCode);

    cardEl.appendChild(cardImageEl);
    cardEl.appendChild(cardContentEl);
    cardEl.appendChild(cardTagsEl);
    cardEl.appendChild(cardFooterEl);

    return cardEl;

}


loadProjects()