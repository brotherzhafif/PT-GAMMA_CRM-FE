// import RolePermissions from "./components/rolePermissions";
import TeamMembers from "./components/teamMembers";

export default function UserRoles() {
  return (
    <div className="flex flex-col gap-5 h-full mb-10 px-3 py-3 sm:px-4">
      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-semibold sm:text-xl">Users & Roles</h3>
        <p className="text-xs leading-4 text-gray-500">
          Manage team access, permissions, and roles within the CRM.
        </p>
      </div>

      <div className="flex flex-col gap-5 pr-0 sm:pr-4">
        <TeamMembers />
        {/* <RolePermissions /> */}
      </div>
    </div>
  );
}
