let pokemonRepository = (function (){
   // define modal variable
  let modalContainer = document.querySelector('#modal-container');
  let modal = document.querySelector('.modal');
  let modalClose = document.querySelector('.modal-close');
  let pokemonList = [];

  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function getAll() {
    return pokemonList;
  }

  function add(pokemon) {
    if (typeof pokemon === 'object' && 'name' in pokemon && 'detailsUrl' in pokemon) {
      pokemonList.push(pokemon);
    } else {
      console.log('Incorrect entry.');
    }

  }

  //Create showDetails function
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      console.log(pokemon);
    });
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
    button.addEventListener("click", function(event) {
      showDetails(pokemon);
    });
  }

  // Create loadList function
  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
        console.log(pokemon)
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  // Create loadDetails function
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // Now we add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails
  };
})();

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
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
