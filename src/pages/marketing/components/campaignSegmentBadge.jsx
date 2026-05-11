export default function CampaignSegmentBadge({
  segment,
}) {
  return (
    <span className="inline-flex items-center rounded-full border border-gray-300 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-700">
      {segment}
    </span>
  );
}