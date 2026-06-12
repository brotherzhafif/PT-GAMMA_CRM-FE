export default function PatientTags({ tags }) {
  const safeTags = tags || [];

  return (
    <div className="flex flex-wrap gap-1.5">
      {safeTags.map((tag) => (
        <span
          key={tag}
          className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-slate-100 text-slate-700"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
