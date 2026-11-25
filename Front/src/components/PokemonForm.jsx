import { useState } from "react";

const statFields = [
  ["hp", "HP"],
  ["attack", "Ataque"],
  ["defense", "Defesa"],
  ["specialAttack", "Ataque especial"],
  ["specialDefense", "Defesa especial"],
  ["speed", "Velocidade"],
];

const emptyStats = {
  hp: 50,
  attack: 50,
  defense: 50,
  specialAttack: 50,
  specialDefense: 50,
  speed: 50,
};

function PokemonForm({ pokemon, types, error, onSave, onCancel }) {
  const editing = Boolean(pokemon.id);

  const [name, setName] = useState(pokemon.name ?? "");
  const [stats, setStats] = useState(pokemon.stats ?? emptyStats);
  const [image, setImage] = useState(pokemon.image ?? "");
  const [type1, setType1] = useState(String(pokemon.types?.[0]?.id ?? ""));
  const [type2, setType2] = useState(String(pokemon.types?.[1]?.id ?? ""));

  const selectableTypes = types.filter((type) => type.id !== 0);

  function handleSubmit(event) {
    event.preventDefault();

    const chosen = [...new Set([type1, type2].filter(Boolean))].map((id) => {
      const type = selectableTypes.find((t) => t.id === Number(id));
      return { id: type.id, name: type.name };
    });

    onSave({
      ...(editing ? { id: pokemon.id } : {}),
      name: name.trim(),
      image: image.trim() || null,
      stats,
      types: chosen,
    });
  }

  return (
    <div className="overlay" onClick={onCancel}>
      <div className="modal" onClick={(event) => event.stopPropagation()}>
        <h2 className="modal-name">{editing ? `Editar ${pokemon.name}` : "Novo Pokémon"}</h2>

        <form className="form" onSubmit={handleSubmit}>
          <label>
            Nome
            <input value={name} onChange={(event) => setName(event.target.value)} required />
          </label>
          <label>
            URL da imagem (opcional)
            <input value={image} onChange={(event) => setImage(event.target.value)} placeholder="https://..." />
          </label>

          <div className="form-row">
            <label>
              Tipo 1
              <select value={type1} onChange={(event) => setType1(event.target.value)}>
                <option value="">Nenhum</option>
                {selectableTypes.map((type) => (
                  <option key={type.id} value={type.id}>{type.name}</option>
                ))}
              </select>
            </label>
            <label>
              Tipo 2
              <select value={type2} onChange={(event) => setType2(event.target.value)}>
                <option value="">Nenhum</option>
                {selectableTypes.map((type) => (
                  <option key={type.id} value={type.id}>{type.name}</option>
                ))}
              </select>
            </label>
          </div>

          <div className="form-row">
            {statFields.map(([key, label]) => (
              <label key={key}>
                {label}
                <input
                  type="number"
                  min="0"
                  max="255"
                  value={stats[key]}
                  onChange={(event) => setStats({ ...stats, [key]: Number(event.target.value) })}
                  required
                />
              </label>
            ))}
          </div>

          {error && <p className="error">{error}</p>}

          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onCancel}>Cancelar</button>
            <button type="submit" className="save-btn">Salvar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PokemonForm;
