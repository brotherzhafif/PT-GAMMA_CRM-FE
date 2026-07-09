export function KnowledgeSearchResults({ results, keyword, onJumpTo }) {
  if (!keyword.trim()) return null;

  return (
    <div className="flex flex-col gap-1 rounded-lg border border-gray-300 p-3 text-xs shadow-sm">
      {results.length === 0 ? (
        <span className="text-gray-500">Tidak ditemukan di field manapun.</span>
      ) : (
        results.map((r) => (
          <button
            key={r.field}
            type="button"
            onClick={() => onJumpTo(r.field)}
            className="flex flex-col items-start gap-0.5 rounded border border-gray-200 p-2 text-left hover:bg-muted"
          >
            <span className="font-medium">
              {r.label} <span className="text-gray-400">({r.count}x)</span>
            </span>
            <span className="text-gray-500">{r.snippet}</span>
          </button>
        ))
      )}
    </div>
  );
}