import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";

// pages
import Dashboard from "@/pages/dashboard";
import Inbox from "@/pages/inbox";
import Patients from "@/pages/patients";
import Appointments from "@/pages/appointments";
import Marketing from "@/pages/marketing";
import Loyalty from "@/pages/loyalty";
import Settings from "@/pages/settings";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/inbox" element={<Inbox />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/marketing" element={<Marketing />} />
          <Route path="/loyalty" element={<Loyalty />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;