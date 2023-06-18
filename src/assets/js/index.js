const URL = "https://pokeapi.co/api/v2/pokemon";
async function getData() {
  try {
    const response = await fetch(URL);
    let pokemonList = await response.json();
    pokemonList = pokemonList.results;
    let data = [];
    for (let item of pokemonList) {
      const pokemonData = await getOnePokemon(item.url);
      data.push(pokemonData);
    }
    let htmlContent = "";
    for (let item of data) {
      htmlContent += createCard(item.name, item.image);
    }
    const contentCardsDiv = document.querySelector("#content-cards");
    contentCardsDiv.innerHTML = htmlContent;
    return data;
  } catch (error) {
    console.log(error);
  }
}
async function getOnePokemon(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    let output = {
      name: data.name,
      image: data.sprites.other.dream_world.front_default,
    };
    return output;
  } catch (error) {
    console.log(error);
  }
}
function createCard(name, image) {
  return `<div class="card" style="width: 18rem;">
    <img class="card-img-top" src=${image} alt=${name}>
    <div class="card-body">
      <p class="card-text"><strong>${name.toUpperCase()}</strong></p>
    </div>
  </div>`;
}
getData();
