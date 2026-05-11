import { NavLink } from "react-router-dom";

const tabs = [
  { label: "General", path: "/settings" },
  { label: "WhatsApp API", path: "/settings/whatsapp-api" },
  { label: "Chatbot Settings", path: "/settings/chatbot-settings" },
  { label: "Users & Roles", path: "/settings/users-roles" },
  { label: "Security", path: "/settings/security" },
];

export default function SettingsTabs() {
  return (
    <div className="flex gap-2">
      {tabs.map((tab) => (
        <NavLink
          key={tab.path}
          to={tab.path}
          end={tab.path === "/settings"}
          className={({ isActive }) =>
            `px-4 py-2 rounded-lg text-sm transition ${
              isActive
                ? "bg-primary text-white"
                : "text-gray-500 hover:bg-gray-100"
            }`
          }
        >
          {tab.label}
        </NavLink>
      ))}
    </div>
  );
}