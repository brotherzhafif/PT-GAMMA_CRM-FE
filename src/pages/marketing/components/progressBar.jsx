import { Progress } from "@/components/ui/progress";

export default function ProgressBar({ value = 0 }) {
  return <Progress value={value} className="h-2" />;
}
