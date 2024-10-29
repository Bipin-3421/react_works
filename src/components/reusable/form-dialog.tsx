import { Loader2 } from "lucide-react";
import React, { ReactNode, useState } from "react";

import { cn } from "@/lib/utils";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "../ui/button";
import CustomAlert from "../ui/custom-alert";
import { baseButtonType } from "@/interface/global";

type TProps = {
  isFormDirty?: boolean;
  isOpen: boolean;
  toggleModal: () => void;
  children: React.ReactNode;
  className?: string;
  trigger?: string;
  isLoading?: boolean;
  mutateAction: baseButtonType;
  resetAction: baseButtonType;
} & (
  | { title?: string; header?: never }
  | { title?: never; header?: ReactNode }
);

const FormDialog: React.FC<TProps> = ({
  isFormDirty,
  isOpen,
  toggleModal,
  trigger,
  children,
  className,
  isLoading,
  resetAction,
  mutateAction,
  ...props
}) => {
  const [warning, setWarning] = useState(false);

  const handleModalClose = (): void => {
    if (isFormDirty) {
      setWarning(true);
    } else {
      toggleModal();
    }
  };

  return (
    <div className="relative">
      <Dialog open={isOpen} onOpenChange={handleModalClose}>
        <DialogTrigger>{trigger}</DialogTrigger>
        <DialogContent
          className={cn(
            "h-fit p-0 max-w-screen-2xl md:max-w-2xl flex flex-col justify-between ",
            className
          )}
        >
          {props.title ? (
            <div>
              <DialogHeader className="space-y-5">
                <DialogTitle className="text-2xl font-normal text-center">
                  {props.title}
                </DialogTitle>
              </DialogHeader>
              {children}
            </div>
          ) : (
            <>
              {props.header}
              {children}
            </>
          )}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90">
              <Loader2 className="animate-spin h-12 w-12" />
            </div>
          )}
          <DialogFooter className=" mt-4">
            {resetAction && (
              <Button
                onClick={resetAction.onClick && resetAction.onClick}
                variant={resetAction.variant || "ghost"}
                className={cn("space-x-2", resetAction.className)}
              >
                {resetAction.icon} {resetAction.label}
              </Button>
            )}
            {mutateAction && (
              <Button
                onClick={mutateAction.onClick && mutateAction.onClick}
                type="submit"
                variant={mutateAction.variant || "default"}
                className={cn("space-x-2", mutateAction.className)}
                isLoading={mutateAction.isLoading}
              >
                {mutateAction.icon} {mutateAction.label}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <CustomAlert
        isOpen={warning}
        setIsOpen={setWarning}
        btnAction={toggleModal}
        title="Are you sure?"
        desc="If you proceed, this action cannot be undone. Are you sure you want to continue? Form data will be lost."
        cancelName="No, Continue Editing"
        btnName="Yes, Cancel"
      />
    </div>
  );
};

export default FormDialog;
