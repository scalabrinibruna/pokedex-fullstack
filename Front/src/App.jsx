import { useEffect, useState } from "react";
import {
  getPokemons,
  getPokemon,
  getTrainers,
  getTypes,
  createPokemon,
  updatePokemon,
  deletePokemon,
} from "./api.js";
import Header from "./components/Header.jsx";
import SearchBar from "./components/SearchBar.jsx";
import TypeFilter from "./components/TypeFilter.jsx";
import PokemonList from "./components/PokemonList.jsx";
import PokemonDetails from "./components/PokemonDetails.jsx";
import PokemonForm from "./components/PokemonForm.jsx";
import TrainerSection from "./components/TrainerSection.jsx";

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [page, setPage] = useState("pokedex");
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [formPokemon, setFormPokemon] = useState(null); // {} = novo, objeto = edição
  const [formError, setFormError] = useState("");

  async function loadData() {
    try {
      const [pokemonData, trainerData, typeData] = await Promise.all([
        getPokemons(),
        getTrainers(),
        getTypes(),
      ]);
      setPokemons(pokemonData);
      setTrainers(trainerData);
      setTypes(typeData);
      setError("");
    } catch {
      setError("Não foi possível carregar os dados. Verifique se o back-end está rodando.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  const typeNames = [
    ...new Set(pokemons.flatMap((pokemon) => pokemon.types.map((type) => type.name))),
  ].sort();

  const term = search.trim().toLowerCase().replace("#", "");

  const filteredPokemon = pokemons.filter((pokemon) => {
    const matchesSearch =
      term === "" ||
      pokemon.name.toLowerCase().includes(term) ||
      String(pokemon.id) === term;

    const matchesType =
      selectedType === "all" ||
      pokemon.types.some((type) => type.name === selectedType);

    return matchesSearch && matchesType;
  });

  async function handleSave(pokemon) {
    try {
      if (pokemon.id) {
        await updatePokemon(pokemon.id, pokemon);
      } else {
        await createPokemon(pokemon);
      }
      setFormPokemon(null);
      setSelectedPokemon(null);
      setFormError("");
      await loadData();
    } catch (err) {
      setFormError(err.message);
    }
  }

  async function handleDelete(pokemon) {
    if (!window.confirm(`Excluir ${pokemon.name}?`)) return;
    try {
      await deletePokemon(pokemon.id);
      setSelectedPokemon(null);
      await loadData();
    } catch (err) {
      setError(err.message);
    }
  }

  function closeForm() {
    setFormPokemon(null);
    setFormError("");
  }
  
  async function handleSelect(pokemon) {
  try {
    setSelectedPokemon(await getPokemon(pokemon.id));
  } catch (err) {
    setError(err.message);
  } 
}

  return (
    <div className="app">
      <Header page={page} onChangePage={setPage} />

      <main className="main">
        {error && <p className="error">{error}</p>}
        {loading && <p className="empty">Carregando...</p>}

        {!loading && !error && page === "pokedex" && (
          <>
            <div className="controls">
              <SearchBar value={search} onChange={setSearch} />
              <TypeFilter
                types={typeNames}
                value={selectedType}
                onChange={setSelectedType}
              />
              <button className="new-btn" onClick={() => setFormPokemon({})}>
                + Novo Pokémon
              </button>
            </div>

            <p className="counter">
              Mostrando {filteredPokemon.length} de {pokemons.length} Pokémon
            </p>

            <PokemonList pokemon={filteredPokemon} onSelect={handleSelect} />
          </>
        )}

        {!loading && !error && page === "trainers" && (
          <TrainerSection trainers={trainers} pokemon={pokemons} />
        )}
      </main>

      {selectedPokemon && (
        <PokemonDetails
          pokemon={selectedPokemon}
          onClose={() => setSelectedPokemon(null)}
          onEdit={setFormPokemon}
          onDelete={handleDelete}
        />
      )}

      {formPokemon && (
        <PokemonForm
          pokemon={formPokemon}
          types={types}
          error={formError}
          onSave={handleSave}
          onCancel={closeForm}
        />
      )}
    </div>
  );
}

export default App;
