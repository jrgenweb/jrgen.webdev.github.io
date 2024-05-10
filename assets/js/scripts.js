/** Animation On Scroll */
AOS.init();

const projectsContentEl = document.querySelector(".projects__content"); //projects container
const navToggleEl = document.querySelector(".nav-toggle"); // navigation button
const navEl = document.querySelector("nav .wrapper"); //top navigation

navToggleEl.addEventListener("click", handleNavigation);

let projects = [];

/**
 * swicth light and dark theme
 * detect the defalt scheme
 *
 */
const btnThemeSwitch = document.getElementById("themeMode");
const body = document.querySelector("body");

/** */
btnThemeSwitch.addEventListener("change", () => {
  console.log("Change");

  if (btnThemeSwitch.checked) {
    //set to dark
    body.classList.remove("light-theme");
    body.classList.add("dark-theme");

    console.log("dark");
  } else {
    //set to light
    body.classList.add("light-theme");
    body.classList.remove("dark-theme");

    console.log("light");
  }
});
/**
 *
 * @param {*} scheme
 * add class to body
 *
 *
 */
function setColorScheme(scheme) {
  switch (scheme) {
    case "dark":
      body.classList.remove("light-theme");
      body.classList.add("dark-theme");
      btnThemeSwitch.checked = true;
      console.log("dark");
      //Dark
      break;
    case "light":
      body.classList.add("light-theme");
      body.classList.remove("dark-theme");
      btnThemeSwitch.checked = false;
      console.log("light");
      // Light
      break;
    default:
      // Default
      console.log("light");
      break;
  }
}

function setSwicth(scheme) {}
function getPreferredColorScheme() {
  if (window.matchMedia) {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    } else {
      return "light";
    }
  }
  return "light";
}

function updateColorScheme() {
  setColorScheme(getPreferredColorScheme());
}
/** if change the color scheme */
if (window.matchMedia) {
  var colorSchemeQuery = window.matchMedia("(prefers-color-scheme: dark)");
  colorSchemeQuery.addEventListener("change", updateColorScheme);
}

updateColorScheme();

//add or remove class from nav element
function handleNavigation() {
  navEl.classList.toggle("active");
  navToggleEl.classList.toggle("active");
}

//load projects from data.json
async function loadProjects() {
  const response = await fetch("public/data.json");
  projects = await response.json();
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

/**
 * render cards
 *
 * first time render the first 6 card
 *
 *
 */
function renderCard(data) {
  for (let j = 0; j < 6; j++) {
    projectsContentEl.appendChild(createCard(data[j]));
  }

  const loadMoreBtn = document.createElement("a");
  loadMoreBtn.href = "#";
  loadMoreBtn.innerText = "Load More";
  loadMoreBtn.classList.add("btn-load-more");
  loadMoreBtn.addEventListener("click", loadMoreCard);
  projectsContentEl.parentNode.appendChild(loadMoreBtn);
  /* data.forEach((element) => {
    projectsContentEl.appendChild(createCard(element));
  }); */
}

/**
 *
 * when click load more button,
 * then load another 6 card, and add a load more button, while the all cards rendered
 *
 */
function loadMoreCard(event) {
  event.preventDefault();

  /**
   * first determine the starting position
   */

  let lastCards = false;
  const cards = document.querySelectorAll(".projects__content .card");
  const loadMoreBtn = document.querySelector(".btn-load-more");

  const startingPosition = cards.length;
  const endPosition =
    projects.length - startingPosition >= 6
      ? startingPosition + 6
      : (() => {
          lastCards = true;
          return startingPosition + (projects.length - startingPosition);
        })();
  //remove load more btn

  console.log("end", endPosition);

  let helper = projects.length - startingPosition;
  console.log(helper, cards.length);

  for (let i = startingPosition; i < endPosition; i++) {
    //projectsContentEl.insertBefore(createCard(projects[i]), loadMoreBtn);
    projectsContentEl.appendChild(createCard(projects[i]));
  }
  if (lastCards) loadMoreBtn.remove();
}

/**create card element */
function createCard(item) {
  const cardEl = document.createElement("div");
  cardEl.classList.add("card");
  cardEl.dataset.aos = "zoom-in";
  const cardImageEl = document.createElement("div");
  cardImageEl.classList.add("card__image");
  const imgEl = document.createElement("img");
  if (item.category != "FEM") {
    imgEl.src = "dist/img/projects/" + item.img_url;
  } else {
    imgEl.src = item.img_url;
  }
  imgEl.alt = item.title + " screenshot";

  cardImageEl.appendChild(imgEl);
  const cardContentEl = document.createElement("div");
  cardContentEl.classList.add("card__content");
  const cardTitleEl = document.createElement("h3");
  cardTitleEl.innerText = item.title;
  const cardDescriptionEl = document.createElement("p");
  cardDescriptionEl.innerText = item.description;

  cardContentEl.appendChild(cardTitleEl);
  cardContentEl.appendChild(cardDescriptionEl);

  const cardTagsEl = document.createElement("div");
  cardTagsEl.classList.add("card__tags");
  cardTagsEl.innerText = item.tags.toString();

  const cardFooterEl = document.createElement("div");
  cardFooterEl.classList.add("card__footer");

  const cardLinkView = document.createElement("a");
  cardLinkView.classList.add("btn-link", "link--preview");
  cardLinkView.href = item.urls.live;
  cardLinkView.target = "_blank";
  cardLinkView.innerText = "Liew Preview";

  const cardLinkCode = document.createElement("a");
  cardLinkCode.classList.add("btn-link", "link--code");
  cardLinkCode.href = item.urls.code;
  cardLinkCode.target = "_blank";
  cardLinkCode.innerText = "View Code";

  cardFooterEl.appendChild(cardLinkView);
  cardFooterEl.appendChild(cardLinkCode);

  cardEl.appendChild(cardImageEl);
  cardEl.appendChild(cardContentEl);
  cardEl.appendChild(cardTagsEl);
  cardEl.appendChild(cardFooterEl);

  return cardEl;
}

loadProjects();

/** scroll to top  */

const scrollToTopEl = document.querySelector(".scroll-to-top");
const headerEl = document.querySelector(".header");
window.onscroll = function () {
  if (
    document.body.scrollTop > headerEl.clientHeight ||
    document.documentElement.scrollTop > headerEl.clientHeight
  ) {
    scrollToTopEl.classList.add("active");
  } else {
    scrollToTopEl.classList.remove("active");
  }
};
