import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { IAttribute } from '@/types/attribute';

export default function AttributeValuesModal({
  attribute,
}: {
  attribute: IAttribute;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Values
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{attribute.name} Values</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <table className="w-full text-left border">
            <thead>
              <tr>
                <th className="border px-2 py-1">Value</th>
                <th className="border px-2 py-1">Meta</th>
              </tr>
            </thead>
            <tbody>
              {attribute.attributes.map((attr, idx) => (
                <tr key={idx}>
                  <td className="border px-2 py-1">{attr.value}</td>
                  <td className="border px-2 py-1">{attr.meta}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DialogContent>
    </Dialog>
  );
}
