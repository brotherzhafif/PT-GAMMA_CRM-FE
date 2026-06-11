import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import { getAccessToken } from "@/services/auth.service";

// pages
import Dashboard from "@/pages/dashboard";
import Inbox from "@/pages/inbox";
import Patients from "@/pages/patients";
import Appointments from "@/pages/appointments";
import Marketing from "@/pages/marketing";
import Loyalty from "@/pages/loyalty";
import Settings from "@/pages/settings";
// import General from "./pages/settings/general";
import WhatsapApi from "./pages/settings/whatsapp-api";
import ChatbotSettings from "./pages/settings/chatbot-settings";
import UserRoles from "./pages/settings/user-roles";
import Security from "./pages/settings/security";
import Feedback from "./pages/feedback";
import LoginPage from "./pages/auth/login";

function ProtectedRoute() {
  const location = useLocation();

  if (!getAccessToken()) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    element: <ProtectedRoute />,
    children: [
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
            path: "/feedback",
            element: <Feedback />,
            handle: { title: "Feedback & Support" },
          },
          {
            path: "/settings",
            element: <Settings />,
            handle: { title: "Settings" },

            children: [
              // {
              //   index: false,
              //   element: <General />,
              //   handle: { title: "General Settings" },
              // },
              {
                index: true,
                // path: "/settings/whatsapp-api",
                element: <WhatsapApi />,
                handle: { title: "General Settings" },
              },
              {
                path: "/settings/chatbot-settings",
                element: <ChatbotSettings />,
                handle: { title: "General Settings" },
              },
              {
                path: "/settings/user-roles",
                element: <UserRoles />,
                handle: { title: "General Settings" },
              },
              {
                path: "/settings/security",
                element: <Security />,
                handle: { title: "General Settings" },
              },
            ],
          }
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
