import InputField from "@/components/shared/InputField";
import { Card, CardContent } from "@/components/ui/card";
import { User } from "lucide-react";

interface Field {
  label: string;
  placeholder: string;
  id: string;
  type?: string;
}

interface CustomerInfoProps {
  fields: Field[];
  formData: any;
  handleChange: any
}

const CustomerInfo = ({ fields , formData, handleChange}: CustomerInfoProps) => {
  return (
    <Card>
      <CardContent>
        <h2 className="text-2xl font-semibold flex items-center gap-2 mb-8">
          <User size={20} /> Customer Information
        </h2>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          {fields.map(field => (
            <InputField
              key={field.id}
              label={field.label}
              placeholder={field.placeholder}
              id={field.id}
              type={field.type || 'text'}
              value={formData[field.id] || ''}
              onChange={e => handleChange(field.id, e.target.value)}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerInfo;
