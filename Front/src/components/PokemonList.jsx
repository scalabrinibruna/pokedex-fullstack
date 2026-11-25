import PokemonCard from "./PokemonCard.jsx";

function PokemonList({ pokemon, onSelect }) {
  if (pokemon.length === 0) {
    return (
      <p className="empty">
        Nenhum Pokémon encontrado. Tente outro nome, ID ou tipo.
      </p>
    );
  }

  return (
    <section className="grid">
      {pokemon.map((item) => (
        <PokemonCard key={item.id} pokemon={item} onSelect={onSelect} />
      ))}
    </section>
  );
}

export default PokemonList;
