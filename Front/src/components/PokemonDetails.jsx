import PokemonImage from "./PokemonImage.jsx";
import TypeBadges from "./TypeBadges.jsx";

function PokemonDetails({ pokemon, onClose, onEdit, onDelete }) {
  const { stats } = pokemon;


  const statList = [
    { label: "HP", value: stats.hp },
    { label: "Ataque", value: stats.attack },
    { label: "Defesa", value: stats.defense },
    { label: "Ataque especial", value: stats.specialAttack },
    { label: "Defesa especial", value: stats.specialDefense },
    { label: "Velocidade", value: stats.speed },
  ];

  return (
    <div className="overlay" onClick={onClose}>
      {/* stopPropagation evita fechar ao clicar dentro do modal */}
      <div className="modal" onClick={(event) => event.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          Fechar ✕
        </button>

        <PokemonImage id={pokemon.id} name={pokemon.name} image={pokemon.image} />
        <p className="modal-id">ID: #{pokemon.id}</p>
        <h2 className="modal-name">{pokemon.name}</h2>
        <TypeBadges types={pokemon.types} />

        <ul className="stat-list">
          {statList.map((stat) => (
            <li key={stat.label} className="stat-row">
              <span className="stat-label">{stat.label}</span>
              <strong className="stat-value">{stat.value}</strong>
              <div className="bar">
                <div
                  className="bar-fill"
                  style={{ width: `${Math.min(stat.value / 2.5, 100)}%` }}
                ></div>
              </div>
            </li>
          ))}
        </ul>

        <div className="modal-actions">
          <button className="edit-btn" onClick={() => onEdit(pokemon)}>Editar</button>
          <button className="delete-btn" onClick={() => onDelete(pokemon)}>Excluir</button>
        </div>
      </div>
    </div>
  );
}

export default PokemonDetails;
