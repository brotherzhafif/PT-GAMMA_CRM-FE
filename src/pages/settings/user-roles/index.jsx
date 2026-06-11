// import RolePermissions from "./components/rolePermissions";
import TeamMembers from "./components/teamMembers";

export default function UserRoles() {
  return (
    <div className="flex flex-col gap-5 h-full mb-10">
      <div className="flex flex-col gap-1">
        <h3 className="text-xl font-semibold">Users & Roles</h3>
        <p className="text-xs text-gray-500">
          Manage team access, permissions, and roles within the CRM.
        </p>
      </div>

      <div className="flex flex-col gap-5 pr-4">
        <TeamMembers />
        {/* <RolePermissions /> */}
      </div>
    </div>
  );
}
