export function getStatusClasses(status) {
  switch (status) {
    case "Active":
      return "bg-emerald-100 text-emerald-700 border border-emerald-200";

    case "Inactive":
      return "bg-rose-100 text-rose-700 border border-rose-200";

    case "New":
      return "bg-blue-100 text-blue-700 border border-blue-200";

    default:
      return "bg-muted text-foreground";
  }
}

export function formatPatientName(name) {
  return name;
}

export function getInitials(name) {
  if (!name) return "";

  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function formatVisits(visits) {
  return `${visits} visits`;
}

export function formatPoints(points) {
  return `${points} pts`;
}