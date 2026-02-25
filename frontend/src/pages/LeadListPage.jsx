import { useLeads } from "../context/LeadContext";
import Sidebar from "../layouts/Sidebar";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";

export default function LeadList() {
  const { leads } = useLeads();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [status, setStatus] = useState(searchParams.get("status") || "all");
  const [agent, setAgent] = useState(searchParams.get("agent") || "all");
  const [sort, setSort] = useState("");

  useEffect(() => {
    const params = {};

    if (status !== "all") params.status = status;
    if (agent !== "all") params.agent = agent;

    setSearchParams(params);
  }, [status, agent]);

  let filtered = [...leads];

  // Filters
  if (status !== "all") {
    filtered = filtered.filter((l) => l.status === status);
  }

  if (agent !== "all") {
    filtered = filtered.filter((l) => l.agent === agent);
  }

  // Sorting
  if (sort === "priority") {
    const order = { high: 1, medium: 2, low: 3 };
    filtered.sort((a, b) => order[a.priority] - order[b.priority]);
  }

  if (sort === "time") {
    filtered.sort((a, b) => a.timeToClose - b.timeToClose);
  }

  const agents = [...new Set(leads.map((l) => l.agent))];

  return (
    <div className="d-flex vh-100">
      <Sidebar />

      <main className="flex-grow-1 p-4 bg-light container-fluid">
        <h3 className="mb-4">Lead List</h3>

        {/* FILTER BAR (responsive) */}
        <div className="row g-2 mb-3">
          <div className="col-12 col-md">
            <label htmlFor="status" className="my-2">
              Status :
            </label>
            <select
              className="form-select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="all">All</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="qualified">Qualified</option>
            </select>
          </div>

          <div className="col-12 col-md">
            <label htmlFor="salesAgent" className="my-2">
              Sales Agent :
            </label>
            <select
              className="form-select"
              value={agent}
              onChange={(e) => setAgent(e.target.value)}
            >
              <option value="all">All</option>
              {agents.map((a) => (
                <option key={a}>{a}</option>
              ))}
            </select>
          </div>

          <div className="col-12 col-md">
            <label htmlFor="sortBy" className="my-2">
              Sort By :
            </label>
            <select
              className="form-select"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="priority">Priority</option>
              <option value="time">Time to Close</option>
            </select>
          </div>

          <div className="col-12 col-md-auto d-flex align-items-end">
            <button
              className="btn btn-primary w-100"
              onClick={() => navigate("/")}
            >
              Add New Lead
            </button>
          </div>
        </div>

        {/* RESPONSIVE TABLE */}
        <div className="card shadow-sm table-responsive">
          <table className="table table-hover mb-0">
            <thead>
              <tr>
                <th>Lead</th>
                <th>Status</th>
                <th>Sales Agent</th>
                <th>Priority</th>
                <th>Time to Close</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((lead) => (
                <tr
                  key={lead.id}
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(`/lead/${lead.id}`)}
                >
                  <td>{lead.name}</td>
                  <td className="text-capitalize">{lead.status}</td>
                  <td>{lead.agent}</td>
                  <td className="text-capitalize">{lead.priority}</td>
                  <td>{lead.timeToClose} days</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}