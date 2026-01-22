
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

interface SettingsCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export function SettingsCard({ title, description, children }: SettingsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">{children}</CardContent>
    </Card>
  );
}
