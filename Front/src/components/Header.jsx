function Header({ page, onChangePage }) {
  return (
    <header className="header">
      <h1 className="header-title">
        <span className="pokeball" aria-hidden="true"></span>
        Pokédex
      </h1>
      <nav className="nav">
        <button
          className={page === "pokedex" ? "nav-btn active" : "nav-btn"}
          onClick={() => onChangePage("pokedex")}
        >
          Pokémon
        </button>
        <button
          className={page === "trainers" ? "nav-btn active" : "nav-btn"}
          onClick={() => onChangePage("trainers")}
        >
          Treinadores
        </button>
      </nav>
    </header>
  );
}

export default Header;
