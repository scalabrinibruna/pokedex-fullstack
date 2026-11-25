function SearchBar({ value, onChange }) {
  return (
    <div className="search">
      <input
        className="search-input"
        type="text"
        placeholder="Pesquisar por nome ou ID..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
      {value !== "" && (
        <button className="clear-btn" onClick={() => onChange("")}>
          Limpar
        </button>
      )}
    </div>
  );
}

export default SearchBar;
