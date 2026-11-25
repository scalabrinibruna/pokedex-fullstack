function TypeBadges({ types }) {
  if (types.length === 0) {
    return <span className="badge t-typeless">Sem tipo</span>;
  }

  return (
    <div className="badges">
      {types.map((type) => (
        <span key={type.id} className={`badge t-${type.name.toLowerCase()}`}>
          {type.name}
        </span>
      ))}
    </div>
  );
}

export default TypeBadges;
