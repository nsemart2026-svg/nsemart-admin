import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { ReactNode } from "react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface ReusableDialogProps {
  trigger: ReactNode;
  children: ReactNode;
  title?: string;
  contentClassName?: string;
}

export const ReusableDialog = ({
  trigger,
  children,
  title,
  contentClassName,
}: ReusableDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className={contentClassName}>
        <DialogTitle
          className={title ? "text-sm font-semibold opacity-80" : undefined}
        >
          {title ? title : <VisuallyHidden>Dialog</VisuallyHidden>}
          {title && <hr className="my-4 border-black" />}
        </DialogTitle>
        {children}
      </DialogContent>
    </Dialog>
  );
};
