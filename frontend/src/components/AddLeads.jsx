export default function AddLead({ newLead, setNewLead, addLead }) {
  return (
    <div className="mb-3 d-flex gap-2">
      <input
        className="form-control"
        placeholder="Enter lead name"
        value={newLead}
        onChange={(e) => setNewLead(e.target.value)}
      />
      <button className="btn btn-primary" onClick={addLead}>
        + Add Lead
      </button>
    </div>
  );
}