const templates = [
  {
    id: 1,
    name: "Dental Promo",
    message:
      "Hello John, enjoy our exclusive dental whitening promotion with up to 25% discount this week. Book your appointment today.",
  },
  {
    id: 2,
    name: "Routine Checkup",
    message:
      "Hi John, it’s time for your monthly dental checkup. Schedule your appointment now to maintain your healthy smile.",
  },
  {
    id: 3,
    name: "Brace Consultation",
    message:
      "Hello John, start your smile transformation journey with our professional orthodontic consultation this month.",
  },
];

export default function TemplateSelector({ onSelectTemplate }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium">
        Campaign Template
      </label>

      <select
        onChange={(e) => {
          const selectedId = Number(e.target.value);

          const selectedTemplate = templates.find(
            (template) => template.id === selectedId
          );

          if (selectedTemplate) {
            onSelectTemplate?.(selectedTemplate.message);
          }
        }}
        className="h-10 rounded-xl border border-gray-300 bg-white px-3 text-sm outline-none"
      >
        <option value="">
          Choose template
        </option>

        {templates.map((template) => (
          <option key={template.id} value={template.id}>
            {template.name}
          </option>
        ))}
      </select>
    </div>
  );
}