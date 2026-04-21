export default function Filter({ filter, setFilter }) {
  return (
    <select value={filter} onChange={e => setFilter(e.target.value)}>
      <option value="">All</option>
      <option value="software">Software</option>
      <option value="design">Design</option>
    </select>
  );
}