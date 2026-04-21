export default function SearchBar({ query, setQuery, onSearch }) {
  return (
    <>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      <button onClick={onSearch}>Search</button>
    </>
  );
}