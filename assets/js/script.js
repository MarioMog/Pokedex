const nameSearch = document.getElementById("nameSearch");
const btnSearch = document.getElementById("btnSearch");
const pokeImg = document.getElementById("spriteImg");
const buttonPage = document.getElementById("changePage");
const p1 = document.querySelector(".p1");
const p2 = document.querySelector(".p2");

let actualPage = 0;

const changePage = () => {
  if (buttonPage.innerText != "Ver ataques") {
    p1.style.display = "block";
    p2.style.display = "none";
    buttonPage.innerText = "Ver ataques";
  } else {
    {
      buttonPage.innerText = "Ver stats";
      p2.style.display = "block";
      p1.style.display = "none";
    }
  }
};
buttonPage.addEventListener("click", changePage);
const myFunction = (event) => {
  event.preventDefault();
  const value = nameSearch.value;
  fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
    //asigna los datos en un json
    .then((data) => data.json())
    // inserta el render  en nuestro response
    .then((res) => renderPokemon(res))
    //try catch para control de errores
    .catch((err) => console.log(err));
};

//recopila los sprites del pokemon que estamos buscando
const renderPokemon = (data) => {
  actualPage = 1;
  const name = data.forms[0].name;
  let abilities = "";
  let count = 0;

  data.abilities.forEach(({ ability }) => {
    count++;
    abilities += `<div class="stat-container"><p>Atack ${count}: ${ability.name}</p></div>`;
  });
  document.getElementById("p2").innerHTML = abilities;
  document.getElementById("pokemonName").innerHTML = `${
    name.charAt(0).toUpperCase() + name.slice(1)
  }<span class="right-align">Nº ${data.id}</span>`;
  const sprite = data.sprites.front_default;
  pokeImg.setAttribute("src", sprite);
  pokeImg.setAttribute("alt", name);

  data.stats.forEach((stat) => {
    document.getElementById(
      stat.stat.name
    ).innerHTML = `<p>${stat.stat.name}<span class="right-align">${stat.base_stat}</span></p>`;
  });
  let types = ``;
  data.types.forEach((type) => {
    types += `<div class="type ${type.type.name}"><label>${type.type.name}</label></div>`;
  });
  document.getElementById("types").innerHTML = types;
};

btnSearch.addEventListener("click", myFunction, false);
