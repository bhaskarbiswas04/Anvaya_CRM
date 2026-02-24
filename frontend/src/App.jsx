import { Routes, Route } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage"
// import Leads from "./pages/Leads";
// import Sales from "./pages/Sales";
// import Agents from "./pages/Agents";
// import Reports from "./pages/Reports";
// import Settings from "./pages/Settings";

import LeadDetails from "./pages/LeadDetails";



export default function App() {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/lead/:id" element={<LeadDetails />} />
      {/* <Route path="/leads" element={<Leads />} />
      <Route path="/sales" element={<Sales />} />
      <Route path="/agents" element={<Agents />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/settings" element={<Settings />} /> */}
    </Routes>
  );
}
