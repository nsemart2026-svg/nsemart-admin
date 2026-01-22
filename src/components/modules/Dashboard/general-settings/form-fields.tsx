// components/form-fields.tsx
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function TextField({ label, placeholder, defaultValue }: { label: string; placeholder?: string; defaultValue?: string }) {
  return (
    <div className="space-y-1">
      <Label>{label}</Label>
      <Input placeholder={placeholder}  defaultValue={defaultValue} />
    </div>
  );
}

export function SelectField({ label, placeholder, options }: { label: string; placeholder?: string; options: string[] }) {
  return (
    <div className="space-y-1">
      <Label>{label}</Label>
      <Select >
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt, i) => (
            <SelectItem key={i} value={opt}>{opt}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export function ToggleField({ label, description }: { label: string; description?: string }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <Label>{label}</Label>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>
      <Switch />
    </div>
  );
}
