import { createContext, useContext, useState } from "react";

const LeadContext = createContext();

export function LeadProvider({ children }) {
  const [leads, setLeads] = useState([
    {
      id: 1,
      name: "Rahul",
      status: "new",
      agent: "John",
      source: "Referral",
      priority: "high",
      timeToClose: 30,
      comments: [],
    },
    {
      id: 2,
      name: "Priya",
      status: "contacted",
      agent: "Sarah",
      source: "Website",
      priority: "medium",
      timeToClose: 20,
      comments: [],
    },
    {
      id: 3,
      name: "Amit",
      status: "qualified",
      agent: "Mike",
      source: "Cold Call",
      priority: "low",
      timeToClose: 15,
      comments: [],
    },
  ]);

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