import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import UploadLogo from "@/components/ui/uploadLogo";

export default function ClinicInformation() {
  return (
    <Card className="flex flex-col gap-8 shadow-md border border-gray-300">
      <CardHeader className="gap-0 flex flex-col items-start border-b border-gray-300">
        <h3 className="text-lg font-semibold">Clinic Information</h3>
        <span className="text-xs text-gray-500">
          These details will be used in patient communications and invoices.
        </span>
      </CardHeader>

      <CardContent className="px-6 gap-6 flex flex-col">
        <div className="flex w-full items-center gap-4">
          <div className="shrink-0">
            <Field>
              <UploadLogo />
            </Field>
          </div>

          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <h3 className="text-sm font-semibold">Clinic Name</h3>

            <Input placeholder="Enter your clinic name" className="w-full border-gray-300 shadow-sm" />
          </div>
        </div>

        <div className="flex flex-row w-full justify-between items-center gap-3">
            <Field className="w-full">
              <h3 className="text-sm font-semibold">Contact Email</h3>
              <Input placeholder="Enter your clinic email" className="w-full border-gray-300 shadow-sm" />
            </Field>
            <Field className="w-full">
              <h3 className="text-sm font-semibold">Contact Phone</h3>
              <Input placeholder="Enter your clinic phone" className="w-full border-gray-300 shadow-sm" />
            </Field>
        </div>

        <Field className="w-full">
          <FieldLabel>Clinic Address</FieldLabel>
          <Textarea placeholder="Enter your clinic address and other details here" className="w-full border-gray-300 shadow-sm" rows={4} />
        </Field>

      </CardContent>
    </Card>
  );
}
