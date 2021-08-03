let pokemonRepository = (function (){
   // define modal variable
  let pokedexPokemonList = document.querySelector('.pokemon-list');
  let modalContainer = document.querySelector('#modal-container');
  let modal = document.querySelector('.modal');
  let modalClose = document.querySelector('.modal-close');
    // Create Modal content
  let pokemonName = document.createElement('h1');
  pokemonName.classList.add('pokemon-name');


  let pokemonHeight = document.createElement('p');
  pokemonHeight.classList.add('pokemon-height');

  //let pokemonWeight = document.createElement('p');
  //pokemonWeight.innerText = 'Weight: ' + pokemon.weight;
  //pokemonWeight.classList.add('pokemon-weight');


  //let pokemonTypes = document.createElement('p');
  //pokemonTypes.innerText = 'Types: ' + pokemon.types;
  //pokemonTypes.classList.add('pokemon-type');

  //let pokemonAbilities = document.createElement('p');
  //pokemonAbilities.innerText = 'Abilities: ' + pokemon.abilities;
  //pokemonTypes.classList.add('pokemon-abilities');

  let pokemonImg = document.createElement('img');
  pokemonImg.classList.add('pokemon-img');



  modal.appendChild(pokemonName);
  modal.appendChild(pokemonHeight);
  //modal.appendChild(pokemonWeight);
  //modal.appendChild(pokemonTypes);
  modal.appendChild(pokemonImg);
  //modal.appendChild(pokemonAbilities);

  let pokemonList = [];

  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function add(pokemon) {
    if (typeof pokemon === 'object' && 'name' in pokemon && 'detailsUrl' in pokemon) {
      pokemonList.push(pokemon);
    } else {
      console.log('Incorrect entry.');
    }

  }

  function getAll() {
    return pokemonList;
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

  // Create ShowModal function
  function showModal (pokemon) {
    pokemonName.innerText = pokemon.name.toUpperCase();

    pokemonHeight.innerText = 'Height: ' + pokemon.height;

    pokemonImg.src = pokemon.imageUrl;

    let modalContainer = document.querySelector('#modal-container');
    modalContainer.classList.add('is-visible');

  modalContainer.classList.add('is-visible');
  }

  //Create hideModal function

  function hideModal() {
    let modalContainer = document.querySelector('#modal-container');
    modalContainer.classList.remove('is-visible');
  }

  modalClose.addEventListener('click', hideModal);

  window.addEventListener('keydown', (e) => {
    let modalContainer = document.querySelector('#modal-container');
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });

  modalContainer.addEventListener('click', (e) => {
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

  //Create showDetails function
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }


  // Create loadList function
  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name.toUpperCase(),
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
