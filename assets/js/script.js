const nameSearch = document.getElementById("nameSearch");
const btnSearch = document.getElementById("btnSearch");
const pokeImg = document.getElementById("spriteImg");

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
  const name = data.forms[0].name;
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
