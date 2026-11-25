function TypeFilter({ types, value, onChange }) {
  return (
    <select
      className="type-select"
      value={value}
      onChange={(event) => onChange(event.target.value)}
    >
      <option value="all">Todos os tipos</option>
      {types.map((type) => (
        <option key={type} value={type}>
          {type}
        </option>
      ))}
    </select>
  );
}

export default TypeFilter;
