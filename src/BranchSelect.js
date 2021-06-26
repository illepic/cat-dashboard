function BranchSelect({ branches = [], changeCallback }) {
  return (
    <div className="bg-white p-4">
      <h1>Cats</h1>
      <select onChange={(e) => changeCallback(e.target.value)}>
        <option value="">Select</option>
        {branches.map((branch) => (
          <option value={branch.id} key={branch.id}>
            {branch.name}
          </option>
        ))}
        {/* <option value="Location A">Location A</option>
        <option value="Location B">Location B</option> */}
      </select>
    </div>
  );
}

export default BranchSelect;
