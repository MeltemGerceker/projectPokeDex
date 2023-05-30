const pokeContainer = document.querySelector(".poke-container");
const search = document.querySelector(".search");
const searchBtn = document.querySelector(".search-btn");
const searchInput = document.querySelector(".search-input");

const pokemonCount = 151;

const bg_color = {
    grass: "#8bd369",
    fire: "#ff603f",
    water: "#3399ff",
    bug: "#aabb22",
    normal: "#aaaa99",
    flying: "#9aa8fa",
    poison: "#b76ea4",
    electric: "#ffd34e",
    ground: "#e2c56a",
    fairy: "#f1a8ec",
    psychic: "#ff6ea4",
    fighting: "#c56e5c",
    rock: "#c5b679",
    dragon: "#7766ee",
    ice: "#66ccff"
}

searchInput.addEventListener('input', (e) => {
    //console.log(searchInput.value);
    const searchValue = searchInput.value.toLowerCase();
    const pokemonNames = document.querySelectorAll(".poke-name");
    
    pokemonNames.forEach((pokemonName) => {
        if (pokemonName.innerHTML.toLowerCase().includes(searchValue)) {
            pokemonName.parentElement.parentElement.style.display = "block";
        } else {
            pokemonName.parentElement.parentElement.style.display = "none";
        }
        
    });
});

searchBtn.addEventListener('click', () => {
    search.classList.toggle('active'); // toggle oldugu icin active'i ekle/cikar yapiyor
});

const fetchPokemons = async () => {
    for (let i = 1; i < pokemonCount; i++) {
        await getPokemon(i);
    }
};

const getPokemon = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const response = await fetch(url);
    const data = await response.json();
    //console.log(data);
    createPokemonCard(data);
};

const createPokemonCard = (data) => {
    const pokemonDiv = document.createElement("div");
    pokemonDiv.classList.add("pokemon");

    const pokemonId = data.id.toString().padStart(3, '0');
    const pokemonType = data.types[0].type.name;
    const pokemonBackground = bg_color[pokemonType];

    pokemonDiv.style.backgroundColor = `${pokemonBackground}`;

    const pokemonDivInnerHTML = 
        `<div class="image-container">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png" alt="first pokemon">
        </div>
        <div class="poke-info">
            <span class="poke-id">#${pokemonId}</span>
            <h3 class="poke-name">${data.name}</h3>
            <div class="small">
                <small class="poke-experience">
                    <i class="fa solid fa-flask"></i> ${data.base_experience} exp
                </small>
                <small class="poke-weight">
                    <i class="fa-solid fa-weight-hanging"></i> ${data.weight} kg
                </small>
            </div>
            <div class="poke-type">
                <i class="fa-brands fa-uncharted"></i> ${pokemonType}
            </div>
        </div>`;
    pokemonDiv.innerHTML = pokemonDivInnerHTML;
    pokeContainer.appendChild(pokemonDiv);
};

fetchPokemons();