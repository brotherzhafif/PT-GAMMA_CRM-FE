import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";

// pages
import Dashboard from "@/pages/dashboard";
import Inbox from "@/pages/inbox";
import Patients from "@/pages/patients";
import Appointments from "@/pages/appointments";
import Marketing from "@/pages/marketing";
import Loyalty from "@/pages/loyalty";
import Settings from "@/pages/settings";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
        handle: { title: "Operational Overview" },
      },
      {
        path: "/inbox",
        element: <Inbox />,
        handle: { title: "Inbox & Conversations" },
      },
      {
        path: "/patients",
        element: <Patients />,
        handle: { title: "Patients Database" },
      },
      {
        path: "/appointments",
        element: <Appointments />,
        handle: { title: "Appointments Schedule" },
      },
      {
        path: "/marketing",
        element: <Marketing />,
        handle: { title: "Marketing & Campaigns" },
      },
      {
        path: "/loyalty",
        element: <Loyalty />,
        handle: { title: "Point & Rewards" },
      },
      {
        path: "/settings",
        element: <Settings />,
        handle: { title: "Settings" },
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;