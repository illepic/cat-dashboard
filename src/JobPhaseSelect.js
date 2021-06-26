function JobPhaseSelect({ changeCallback }) {
  return (
    <div className="bg-white p-4">
      <h1>Job Phase</h1>
      <select onChange={(e) => changeCallback(e.target.value)}>
        <option value="">Select</option>
        <option value="Job Phase A">Job Phase A</option>
        <option value="Job Phase B">Job Phase B</option>
      </select>
    </div>
  );
}

export default JobPhaseSelect;
