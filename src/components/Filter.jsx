export default function Filter({ filter, setFilter }) {
  return (
    <select value={filter} onChange={e => setFilter(e.target.value)}>
      <option value="">All</option>
      <option value="software">Software</option>
      <option value="design">Design</option>
      <option value="data">Data Science</option>
      <option value="devops">DevOps</option>
      <option value="product">Product</option>
      <option value="marketing">Marketing</option>
      <option value="finance">Finance</option>
      <option value="customer">Customer Support</option>
      <option value="hr">HR</option>
      <option value="ai">AI / ML</option>
    </select>
  );
}