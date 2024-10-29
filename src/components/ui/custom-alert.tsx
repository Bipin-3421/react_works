import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "../ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";

interface AldAlertProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  btnName?: string;
  cancelName?: string;
  btnAction?: () => void;
  cancelAction?: () => void;
  title?: string;
  desc?: string;
  img?: string;
  imgSize?: number;
}

const CustomAlert: React.FC<AldAlertProps> = ({
  isOpen,
  setIsOpen,
  title,
  btnName,
  cancelName,
  btnAction,
  cancelAction,
  desc,
  img,
  imgSize,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="lg:w-[450px] py-4">
        <DialogHeader>
          <img
            src={img && img}
            className={`${
              img ? `size-[${imgSize}px]` : "w-4/5 h-[11/12] "
            } self-center`}
          />
        </DialogHeader>
        <div className="text-center">
          <h2 className="text-2xl text-semibold text-aldgray pb-2">
            {title?.length ? title : " Are You Sure ?"}
          </h2>
          <p className="text-aldgray opacity-70 text-base">
            {desc?.length
              ? desc
              : "if you delete this already used name will be as it is. if you add new on same name it will be treated as new one."}
          </p>
        </div>
        <DialogFooter className="mt-6">
          <div className="w-full flex flex-col gap-2 items-center">
            <DialogClose asChild>
              <Button
                onClick={() => btnAction && btnAction()}
                className="w-4/5"
              >
                {btnName?.length ? btnName : "Yes, Cancel"}
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                variant={"ghost"}
                className="w-4/5 border-0 ring-0 hover:border"
                onClick={() => cancelAction && cancelAction()}
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

export default CustomAlert;
