function TrainerSection({ trainers, pokemon }) {
  return (
    <section>
      <h2 className="section-title">Treinadores</h2>
      <div className="trainer-grid">
        {trainers.map((trainer) => {
          const team = trainer.pokemonIds
            .map((id) => pokemon.find((p) => p.id === id))
            .filter(Boolean);

          return (
            <article key={trainer.id} className="trainer-card">
              <h3 className="trainer-name">{trainer.name}</h3>
              <p className="trainer-badges">🏅 Insígnias: {trainer.badges}</p>

              <p className="trainer-label">Pokémon ({team.length}):</p>
              <ul className="team">
                {/* O índice entra na key porque um ID pode se repetir (ex.: Koga) */}
                {team.map((p, index) => (
                  <li key={`${p.id}-${index}`} className="team-item">
                    #{p.id} {p.name}
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default TrainerSection;
