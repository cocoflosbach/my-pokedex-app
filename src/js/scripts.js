const pokemonRepository = (function() {
  // define modal variable
  const pokedexPokemonList = document.querySelector('.pokemon-list');
  const modalContainer = document.querySelector('#modal-container');
  const modal = document.querySelector('.modal');
  const modalClose = document.querySelector('.modal-close');
  const searchInput = document.querySelector('#search-bar');
  //let searchButton = document.querySelector('.search-button')

  // Create Modal content
  const pokemonName = document.createElement('h1');
  pokemonName.classList.add('pokemon-name');

  const pokemonHeight = document.createElement('p');
  pokemonHeight.classList.add('pokemon-height');

  const pokemonImgFront = document.createElement('img');
  pokemonImgFront.classList.add('modal-img');

  const pokemonImgBack = document.createElement('img');
  pokemonImgBack.classList.add('modal-img');

  const pokemonWeight = document.createElement('p');
  pokemonWeight.classList.add('pokemon-weight');

  const pokemonTypes = document.createElement('p');
  pokemonTypes.classList.add('pokemon-types');

  const pokemonAbilities = document.createElement('p');
  pokemonTypes.classList.add('pokemon-Abilities');

  let modalBody = $('.modal-body');
  let modalTitle = $('.modal-title');
  let modalHeader = $('.modal-header');

  modalTitle.empty();
  modalBody.empty();

  modalTitle.append(pokemonName);
  modalBody.append(pokemonImgFront);
  modalBody.append(pokemonImgBack);
  modalBody.append(pokemonHeight);
  modalBody.append(pokemonWeight);
  modalBody.append(pokemonTypes);
  modalBody.append(pokemonAbilities);

  const pokemonList = [];

  // Link to pokemon API
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  // Function conditional to add pokemon
  function add(pokemon) {
    if (
      typeof pokemon === 'object' &&
      'name' in pokemon &&
      'detailsUrl' in pokemon
    ) {
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
    listItem.classList.add('group-list-item');

    let button = document.createElement('button');
    button.innerText = pokemon.name;

    button.classList.add('button-class', 'btn', 'btn-danger');
    //Include Data target
    button.setAttribute('data-target', '#modal-container');
    button.setAttribute('data-toggle', 'modal');

    // // Add event listener to button
    // button.addEventListener('click', function(showDetails) {
    //   console.log(pokemon);
    // });

    listItem.appendChild(button);
    pokemonList.appendChild(listItem);
    button.addEventListener('click', function(event) {
      showDetails(pokemon);
    });
  }

  // Create ShowModal function
  function showModal(pokemon) {
    pokemonName.innerText = pokemon.name.toUpperCase();

    pokemonHeight.innerText = 'Height: ' + pokemon.height;

    pokemonImgFront.src = pokemon.imageUrlFront;

    pokemonImgBack.src = pokemon.imageUrlBack;

    pokemonWeight.innerText = 'Weight: ' + pokemon.weight;

    pokemonTypes.innerText = 'Types: ' + pokemon.types;

    pokemonAbilities.innerText = 'Abilities: ' + pokemon.abilities;

    const modalContainer = document.querySelector('#modal-container');
    modalContainer.classList.add('is-visible');

    modalContainer.classList.add('is-visible');
  }

  //Create hideModal function

  function hideModal() {
    const modalContainer = document.querySelector('#modal-container');
    modalContainer.classList.remove('is-visible');
  }

  modalClose.addEventListener('click', hideModal);

  // Hide using escape key
  window.addEventListener('keydown', e => {
    const modalContainer = document.querySelector('#modal-container');
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });

  // Hide by clicking outside Modal
  modalContainer.addEventListener('click', e => {
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

  //Create showDetails function
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function() {
      showModal(pokemon);
    });
  }

  // Create loadList function
  function loadList() {
    return fetch(apiUrl)
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        json.results.forEach(function(item) {
          const pokemon = {
            name: item.name.toUpperCase(),
            detailsUrl: item.url
          };
          add(pokemon);
          console.log(pokemon);
        });
      })
      .catch(function(e) {
        console.error(e);
      });
  }

  // Create loadDetails function
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(details) {
        item.imageUrlFront = details.sprites.front_default;
        item.imageUrlBack = details.sprites.back_default;
        item.height = details.height;
        item.weight = details.weight;

        item.types = details.types.map(function(x) {
          return x.type.name;
        });
        item.abilities = details.abilities.map(function(x) {
          return x.ability.name;
        });
      })
      .catch(function(e) {
        console.error(e);
      });
  }

  searchInput.addEventListener('input', function() {
    const listPokemonItem = document.querySelectorAll('li');
    let value = searchInput.value.toUpperCase();

    listPokemonItem.forEach(function(pokemon) {
      if (pokemon.innerText.toUpperCase().indexOf(value) > -1) {
        pokemon.style.display = 'block';
      } else {
        pokemon.style.display = 'none';
      }
    });
  });

  //searchButton.addEventListener('click', searchPokemon);

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails
  };
})();

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
