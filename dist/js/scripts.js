let pokemonRepository = (function() {
  document.querySelector('.pokemon-list');
  let e = document.querySelector('#modal-container'),
    t =
      (document.querySelector('.modal'),
      document.querySelector('.modal-close')),
    n = document.querySelector('#search-bar'),
    o = document.createElement('h1');
  o.classList.add('pokemon-name');
  let i = document.createElement('p');
  i.classList.add('pokemon-height');
  let l = document.createElement('img');
  l.classList.add('modal-img');
  let c = $('.modal-body'),
    a = $('.modal-title');
  $('.modal-header');
  a.empty(), c.empty(), a.append(o), c.append(l), c.append(i);
  let r = [],
    s = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  function d(e) {
    'object' == typeof e && 'name' in e && 'detailsUrl' in e
      ? r.push(e)
      : console.log('Incorrect entry.');
  }
  function u() {
    document.querySelector('#modal-container').classList.remove('is-visible');
  }
  function m(e) {
    let t = e.detailsUrl;
    return fetch(t)
      .then(function(e) {
        return e.json();
      })
      .then(function(t) {
        (e.imageUrl = t.sprites.front_default),
          (e.height = t.height),
          (e.types = t.types),
          (pokemon.height = t.height),
          (pokemon.weight = t.weight),
          (pokemon.types = t.types);
      })
      .catch(function(e) {
        console.error(e);
      });
  }
  return (
    t.addEventListener('click', u),
    window.addEventListener('keydown', e => {
      let t = document.querySelector('#modal-container');
      'Escape' === e.key && t.classList.contains('is-visible') && u();
    }),
    e.addEventListener('click', t => {
      t.target === e && u();
    }),
    n.addEventListener('input', function() {
      let e = document.querySelectorAll('li'),
        t = n.value.toUpperCase();
      e.forEach(function(e) {
        e.innerText.toUpperCase().indexOf(t) > -1
          ? (e.style.display = 'block')
          : (e.style.display = 'none');
      });
    }),
    {
      getAll: function() {
        return r;
      },
      add: d,
      addListItem: function(e) {
        let t = document.querySelector('.pokemon-list'),
          n = document.createElement('li');
        n.classList.add('group-list-item');
        let c = document.createElement('button');
        (c.innerText = e.name),
          c.classList.add('button-class', 'btn', 'btn-danger'),
          c.setAttribute('data-target', '#modal-container'),
          c.setAttribute('data-toggle', 'modal'),
          c.addEventListener('click', function(t) {
            console.log(e);
          }),
          n.appendChild(c),
          t.appendChild(n),
          c.addEventListener('click', function(t) {
            !(function(e) {
              m(e).then(function() {
                !(function(e) {
                  (o.innerText = e.name.toUpperCase()),
                    (i.innerText = 'Height: ' + e.height),
                    (l.src = e.imageUrl);
                  let t = document.querySelector('#modal-container');
                  t.classList.add('is-visible'), t.classList.add('is-visible');
                })(e);
              });
            })(e);
          });
      },
      loadList: function() {
        return fetch(s)
          .then(function(e) {
            return e.json();
          })
          .then(function(e) {
            e.results.forEach(function(e) {
              let t = { name: e.name.toUpperCase(), detailsUrl: e.url };
              d(t), console.log(t);
            });
          })
          .catch(function(e) {
            console.error(e);
          });
      },
      loadDetails: m
    }
  );
})();
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(e) {
    pokemonRepository.addListItem(e);
  });
});
