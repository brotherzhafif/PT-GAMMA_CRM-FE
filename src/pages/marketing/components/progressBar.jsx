export default function ProgressBar({
  value = 0,
}) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
      <div
        className="h-full rounded-full bg-emerald-500 transition-all"
        style={{
          width: `${value}%`,
        }}
      />
    </div>
  );
}