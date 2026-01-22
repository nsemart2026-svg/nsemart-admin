import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import React from "react";
interface QuickActionsProps {
  saveButtonText?: string;
}
const QuickActions = ({ saveButtonText }: QuickActionsProps) => {
  return (
    <div className="border rounded-lg p-6 space-y-4 bg-white ">
      <h2 className="font-semibold text-2xl">Quick Actions</h2>
      <Button className="w-full">
        <Save /> {saveButtonText}
      </Button>
      <Button variant="secondary" className="w-full">
        Save as Draft
      </Button>
      <button className="w-full text-sm opacity-80 hover:underline">
        Cancel
      </button>
    </div>
  );
};

export default QuickActions;
