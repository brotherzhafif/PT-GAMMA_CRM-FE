import { NavLink } from "react-router-dom";

const menus = [
  { label: "General", path: "/settings" },
  { label: "WhatsApp API", path: "/settings/whatsapp-api" },
  { label: "Chatbot Settings", path: "/settings/chatbot-settings" },
  { label: "Users & Roles", path: "/settings/users-roles" },
  { label: "Security", path: "/settings/security" },
];

export default function Sidebar() {
  return (
    <aside className="w-[260px] bg-white border-r p-4 flex flex-col h-full">
      <h2 className="text-lg font-semibold mb-4">Settings</h2>

      <div className="flex flex-col gap-1">
        {menus.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/settings"}
            className={({ isActive }) =>
              `px-3 py-2 rounded-lg text-sm transition flex flex-col gap-2 ${
                isActive
                  ? "bg-green-100 text-green-600 font-medium"
                  : "text-gray-600 hover:bg-gray-100"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </div>
    </aside>
  );
}