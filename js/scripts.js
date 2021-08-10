let pokemonRepository = (function (){
   // define modal variable
  let pokedexPokemonList = document.querySelector('.pokemon-list');
  let modalContainer = document.querySelector('#modal-container');
  let modal = document.querySelector('.modal');
  let modalClose = document.querySelector('.modal-close');
  let searchInput = document.querySelector('#search-bar');
  //let searchButton = document.querySelector('.search-button')

    // Create Modal content
    let pokemonName = document.createElement('h1');
    pokemonName.classList.add('pokemon-name');

    let pokemonHeight = document.createElement('p');
    pokemonHeight.classList.add('pokemon-height');

    let pokemonImgFront = document.createElement('img');
    pokemonImgFront.classList.add('modal-img');

    /*let pokemonImgBack = document.createElement('img');
    pokemonImgBack.classList.add('modal-img');

    let pokemonWeight = document.createElement('p');
    pokemonWeight.classList.add('pokemon-weight');

    let pokemonTypes = document.createElement('p');
    pokemonTypes.classList.add('pokemon-types');

    let pokemonAbilities = document.createElement('p');
    pokemonTypes.classList.add('pokemon-Abilities');*/

    let modalBody = $(".modal-body");
    let modalTitle = $(".modal-title");
    let modalHeader = $(".modal-header");

    modalTitle.empty();
    modalBody.empty();

    modalTitle.append(pokemonName);
    modalBody.append(pokemonImgFront);
    //modalBody.append(pokemonImgBack);
    modalBody.append(pokemonHeight);
    //modalBody.append(pokemonWeight);
   // modalBody.append(pokemonTypes);
    //modalBody.append(pokemonAbilities);


  let pokemonList = [];

  // Link to pokemon API
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  // Function conditional to add pokemon
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
    listItem.classList.add('group-list-item')

    let button = document.createElement('button');
    button.innerText = pokemon.name;

    button.classList.add('button-class', 'btn', 'btn-primary');
    //Include Data target
    button.setAttribute('data-target', '#modal-container');
    button.setAttribute('data-toggle', 'modal') ;

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

    pokemonImgFront.src = pokemon.imageUrl;

    /*pokemonImgBack.src = pokemon.imageUrlBack;

    pokemonWeight.innerText = 'Weight: ' + pokemon.weight;

    pokemonTypes.innerText = 'Types: ' + pokemon.types;

    pokemonAbilities.innerText = 'Abilities: ' + pokemon.abilities;*/

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

  // Hide using escape key
  window.addEventListener('keydown', (e) => {
    let modalContainer = document.querySelector('#modal-container');
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });

  // Hide by clicking outside Modal
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
      pokemon.height = details.height;
      pokemon.weight = details.weight;
      pokemon.types = details.types;

    }).catch(function (e) {
      console.error(e);
    });
  }

  searchInput.addEventListener('input', function() {
    let listPokemonItem = document.querySelectorAll('li');
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
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
