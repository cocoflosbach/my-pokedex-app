let pokemonRepository = (function (){
  let pokemonList = [
    {
      name: "Bulbasaur",
      height: 0.7,
      weight: 6.9,
      abilities: ["clorophyll","overgrow"],
      types: ["grass","poison",]
    },
    {
      name: "Charizard",
      height: 1.7,
      weight: 90.5,
      abilities: ["blaze","solar-power"],
      types: ["fire","flying",]
    },
    {
      name: "Butterfree",
      height: 1.1,
      weight: 32,
      abilities: ["compoundeyes","tinted-lens"],
      types: ["bug","flying",]
    },
    {
      name: "Beedrill",
      height: 1,
      weight: 29.5,
      abilities: ["swarm","sniper"],
      types: ["bug","poison",]
    },
    {
      name: "Pidgeotto",
      height: 1.1,
      weight: 30,
      abilities: ["keen-eye","tangled-feet","big-pecks"],
      types: ["flying","normal",]
    },

  ];

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
