import { useState } from "react";

function PokemonImage({ id, name, image }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return <div className="img-fallback">?</div>;
  }

  return (
    <img
      className="pokemon-img"
      src={image || `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
      alt={name}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}

export default PokemonImage;