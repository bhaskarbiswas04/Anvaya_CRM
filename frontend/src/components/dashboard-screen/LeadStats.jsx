export default function LeadStats({ leads }) {
  const stats = {
    new: leads.filter((l) => l.status === "new").length,
    contacted: leads.filter((l) => l.status === "contacted").length,
    qualified: leads.filter((l) => l.status === "qualified").length,
  };

  return (
    <div className="row mb-4">
      <div className="col-md-4">
        <div className="card shadow-sm border-0 p-3 bg-primary text-white">
          <h6>New</h6>
          <h3>{stats.new}</h3>
        </div>
      </div>

      <div className="col-md-4">
        <div className="card shadow-sm border-0 p-3 bg-warning text-dark">
          <h6>Contacted</h6>
          <h3>{stats.contacted}</h3>
        </div>
      </div>

      <div className="col-md-4">
        <div className="card shadow-sm border-0 p-3 bg-success text-white">
          <h6>Qualified</h6>
          <h3>{stats.qualified}</h3>
        </div>
      </div>
    </div>
  );
}
