import { createContext, useContext, useState } from "react";
import leads_data from "../dummy_datas/leads_data"

const LeadContext = createContext();

export function LeadProvider({ children }) {
  const [leads, setLeads] = useState(leads_data);

  // ✅ addComment function (MISSING BEFORE)
  const addComment = (leadId, text) => {
    const comment = {
      id: Date.now(),
      author: "Admin",
      text,
      timestamp: new Date().toLocaleString(),
    };

    setLeads((prev) =>
      prev.map((lead) =>
        lead.id === leadId
          ? { ...lead, comments: [...lead.comments, comment] }
          : lead,
      ),
    );
  };

  // ✅ updateLead function
  const updateLead = (updatedLead) => {
    setLeads((prev) =>
      prev.map((lead) => (lead.id === updatedLead.id ? updatedLead : lead)),
    );
  };

  return (
    <LeadContext.Provider value={{ leads, addComment, updateLead }}>
      {children}
    </LeadContext.Provider>
  );
}

export const useLeads = () => useContext(LeadContext);