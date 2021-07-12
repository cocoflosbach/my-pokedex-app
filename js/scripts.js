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
      name: "pidgeotto", 
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

  return {
    getAll: getAll,
    add: add
  };
})();

for (let i = 0; i < pokemonList.length; i++) {
  document.write( "<p>" + pokemonList[i].name 
                 + "<br>" + " Height: " + pokemonList[i].height 
                 + ", Weight: " + pokemonList[i].weight 
                 + ",  Abilities: " + pokemonList[i].abilities 
                 + ", Types: " + pokemonList[i].types + "<p>")
  
  if (pokemonList[i].height > 1.5) {
    document.write("Wow, that's big!")
  }
}
