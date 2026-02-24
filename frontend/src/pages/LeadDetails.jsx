import { useParams, useNavigate } from "react-router-dom";
import { useLeads } from "../context/LeadContext";
import Sidebar from "../layouts/Sidebar";
import { useState } from "react";
import EditLeadModal from "../components/EditLeadModal";

export default function LeadDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { leads, addComment, updateLead } = useLeads();

  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState("");

  const lead = leads?.find((lead) => lead.id === parseInt(id));

  if (!lead) {
    return (
      <div className="p-4">
        <h3>Lead not found</h3>
      </div>
    );
  }

  const submit = () => {
    if (!comment.trim()) return;
    addComment(lead.id, comment);
    setComment("");
  };

  return (
    <div className="d-flex vh-100">
      <Sidebar />

      <main className="flex-grow-1 p-4 bg-light container-fluid">
        {/* Back button */}
        <button
          className="btn btn-secondary mb-3"
          onClick={() => navigate("/")}
        >
          ← Back
        </button>

        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3>Lead : {lead.name}</h3>

          <button
            className="btn btn-outline-primary"
            onClick={() => setOpen(true)}
          >
            Edit Lead
          </button>
        </div>

        {/* Lead details card */}
        <div className="card p-4 shadow-sm mb-4">
          <p>
            <b>Sales Agent:</b> {lead.agent}
          </p>
          <p>
            <b>Lead Source:</b> {lead.source}
          </p>
          <p>
            <b>Status:</b> {lead.status}
          </p>
          <p>
            <b>Priority:</b> {lead.priority}
          </p>
          <p>
            <b>Time to Close:</b> {lead.timeToClose} days
          </p>
        </div>

        {/* Comments section */}
        <div className="card p-4 shadow-sm">
          <h5 className="mb-3">Comments</h5>

          {lead.comments?.length === 0 && (
            <p className="text-muted">No comments yet.</p>
          )}

          {lead.comments?.map((c) => (
            <div key={c.id} className="border-bottom mb-2 pb-2">
              <strong>{c.author}</strong>
              <small className="text-muted ms-2">{c.timestamp}</small>
              <p className="mb-0">{c.text}</p>
            </div>
          ))}

          {/* Add comment */}
          <div className="d-flex gap-2 mt-3">
            <input
              className="form-control"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add comment..."
            />
            <button className="btn btn-primary" onClick={submit}>
              Submit
            </button>
          </div>
        </div>

        {/* Edit modal */}
        {open && (
          <EditLeadModal
            lead={lead}
            updateLead={updateLead}
            close={() => setOpen(false)}
          />
        )}
      </main>
    </div>
  );
}