import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
      "Hi John, it's time for your monthly dental checkup. Schedule your appointment now to maintain your healthy smile.",
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
      <Label className="text-xs">Campaign Template</Label>

      <Select
        onValueChange={(value) => {
          const selectedTemplate = templates.find(
            (template) => template.id === Number(value)
          );

          if (selectedTemplate) {
            onSelectTemplate?.(selectedTemplate.message);
          }
        }}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Choose template" />
        </SelectTrigger>

        <SelectContent>
          {templates.map((template) => (
            <SelectItem key={template.id} value={String(template.id)}>
              {template.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
