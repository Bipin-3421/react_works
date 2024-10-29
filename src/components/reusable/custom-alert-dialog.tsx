import React from "react";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "../ui/dialog";
import useAlertDialogStore from "@/zustand/use-alert";
import { DialogClose } from "@radix-ui/react-dialog";

const CustomAlertDialog: React.FC = () => {
  const {
    isOpen,
    title,
    btnName,
    cancelName,
    btnAction,
    cancelAction,
    desc,
    img,
    imgSize,
    hideAlertDialog,
    isLoading,
  } = useAlertDialogStore();

  return (
    <Dialog open={isOpen} onOpenChange={hideAlertDialog}>
      <DialogContent className="lg:w-[450px] pt-8" showCloseButton={false}>
        {img && (
          <DialogHeader>
            <img
              src={img}
              className={`${
                img ? `size-[${imgSize}px]` : "w-4/5 h-[11/12] "
              } self-center`}
            />
          </DialogHeader>
        )}
        <div className="text-center px-8">
          <h2 className="text-2xl text-semibold  pb-2">
            {title?.length ? title : "Are You Sure?"}
          </h2>
          <p className=" text-gray-500 opacity-70 text-sm">
            {desc?.length
              ? desc
              : "If you delete this, the already used name will remain the same. If you add a new one with the same name, it will be treated as a new one."}
          </p>
        </div>
        <DialogFooter className="mt-6">
          <div className="w-full flex flex-col gap-2 items-center">
            <DialogClose asChild>
              <Button
                onClick={() => btnAction && btnAction()}
                className="w-4/5"
                isLoading={isLoading}
              >
                {btnName?.length ? btnName : "Yes, Cancel"}
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                variant={"ghost"}
                className="w-4/5 border-0 ring-0 hover:border"
                onClick={() => cancelAction && cancelAction()}
                disabled={isLoading}
              >
                {cancelName?.length ? cancelName : "No, Continue Editing"}
              </Button>
            </DialogClose>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CustomAlertDialog;
