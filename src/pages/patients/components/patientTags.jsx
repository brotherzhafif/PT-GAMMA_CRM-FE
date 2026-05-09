export default function PatientTags({ tags }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className="px-2 py-1 rounded-full text-xs bg-muted"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}