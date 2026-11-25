import PokemonImage from "./PokemonImage.jsx";
import TypeBadges from "./TypeBadges.jsx";

function PokemonCard({ pokemon, onSelect }) {
  const { stats } = pokemon;
  const mainType = pokemon.types.length > 0 ? pokemon.types[0].name : "Typeless";

  return (
    <article
      className={`card t-${mainType.toLowerCase()}`}
      onClick={() => onSelect(pokemon)}
    >
      <span className="card-id">#{pokemon.id}</span>
     <PokemonImage id={pokemon.id} name={pokemon.name} image={pokemon.image} />
      <h2 className="card-name">{pokemon.name}</h2>
      <TypeBadges types={pokemon.types} />

      <ul className="stats-mini">
        <li>HP <strong>{stats.hp}</strong></li>
        <li>Atq <strong>{stats.attack}</strong></li>
        <li>Def <strong>{stats.defense}</strong></li>
        <li>Atq Esp <strong>{stats.specialAttack}</strong></li>
        <li>Def Esp <strong>{stats.specialDefense}</strong></li>
        <li>Vel <strong>{stats.speed}</strong></li>
      </ul>
    </article>
  );
}

export default PokemonCard;
