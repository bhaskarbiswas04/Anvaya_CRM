export default function AddLeadButton({ setOpen }) {
  return (
    <button className="btn btn-primary btn-lg shadow-sm" onClick={() => setOpen(true)}>
      + Add New Lead
    </button>
  );
}