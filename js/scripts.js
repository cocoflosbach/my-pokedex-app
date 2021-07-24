let pokemonRepository = (function (){
  let pokemonList = [];

  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function getAll() {
    return pokemonList;
  }

  function add(pokemon) {
    if (typeof pokemon === 'object' && 'name' in pokemon) {
      pokemonList.push(pokemon);
    } else {
      console.log('Incorrect entry.');
    }

  }

  //Create showDetails function
  function showDetails(pokemon) {
    console.log(pokemon)
  }


  // Create addListItem function
  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemon-list');

    let listItem = document.createElement('li');

    let button = document.createElement('button');
    button.innerText = pokemon.name;

    button.classList.add('button-class');
    // Add event listener to button
    button.addEventListener('click', function(showDetails) {
      console.log(pokemon);
    });

    listItem.appendChild(button);
    pokemonList.appendChild(listItem);
  }

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem
  };
})();

pokemonRepository.add(
  {
    name: "Wigglytuff",
    height: 1,
    weight: 12,
    abilities: ["cute-charm","frisk"],
    types: ["fairy","normal",]
  }
);
console.log(pokemonRepository.getAll());

pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});
  /*document.write( "<p>" + pokemon.name
                 + "<br>" + " Height: " + pokemon.height
                 + ", Weight: " + pokemon.weight
                 + ",  Abilities: " + pokemon.abilities
                 + ", Types: " + pokemon.types + "<p>")

  if (pokemon.height > 1.5) {
    document.write("Wow, that's big!!")
  }*/


 /*for (let i = 0; i < pokemonList.length; i++) {
  document.write( "<p>" + pokemonList[i].name
                 + "<br>" + " Height: " + pokemonList[i].height
                 + ", Weight: " + pokemonList[i].weight
                 + ",  Abilities: " + pokemonList[i].abilities
                 + ", Types: " + pokemonList[i].types + "<p>")

  if (pokemonList[i].height > 1.5) {
    document.write("Wow, that's big!")
  }
} */
