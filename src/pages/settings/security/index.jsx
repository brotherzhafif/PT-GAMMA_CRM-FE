import AccountSecurity from "./components/accountSecurity";
import RecentLogin from "./components/recentLogin";
import SystemAuditLog from "./components/systemAuditLog";

export default function Security() {
  return (
    <div className="flex flex-col gap-5 h-full mb-10">
      <div className="flex flex-col gap-1">
        <h3 className="text-xl font-semibold">Security & Audit</h3>
        <p className="text-xs text-gray-500">
          Monitor account activity and enforce security policies.
        </p>
      </div>

      <div className="flex flex-col gap-5 pr-4">
        <AccountSecurity />
        <RecentLogin />
        <SystemAuditLog />
      </div>
    </div>
  );
}
