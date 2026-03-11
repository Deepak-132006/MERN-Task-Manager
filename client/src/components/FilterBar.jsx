function FilterBar({ filter, setFilter, onAdd }) {
  const filters = ["all", "pending", "completed"];
  return (
    <div>
      <div>
        {filters.map((f) => {
          <button key={f} onClick={() => setFilter(f)}>
            {f}
          </button>;
        })}
      </div>
      <button onClick={onAdd}>Add Task</button>
    </div>
  );
}

export default FilterBar;