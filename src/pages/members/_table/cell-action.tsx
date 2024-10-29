import { Ellipsis, PenLine, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useModalStore } from "@/hooks/use-modal";
import { useDeleteMember } from "@/http/mutations/member.mutation";
import { TMember } from "@/schema/members.schema";
import { ModalIds } from "@/types";
import useAlertDialogStore from "@/zustand/use-alert";

export const CellAction = ({ data }: { data: TMember }) => {
  const { openModal } = useModalStore();
  const { hideAlertDialog, showAlertDialog } = useAlertDialogStore();
  const { mutate } = useDeleteMember();

  const handleDelete = () => {
    showAlertDialog({
      title: "Are you sure?",
      desc: "Are you sure you want to delete this item? This action cannot be undone.",
      btnName: "Yes, Delete It",
      cancelName: "No, Cancel",
      btnAction: () => mutate(data.id),
      cancelAction: () => hideAlertDialog(),
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <Ellipsis className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-[160px] border border-[#EBE9F1] shadow-sm"
      >
        <DropdownMenuItem
          onClick={(e) => {
            e.stopPropagation();
            openModal(ModalIds.UPDATE_MEMBER, data);
          }}
        >
          <PenLine className="h-4 w-4 mr-2" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={(e) => {
            e.stopPropagation();
            handleDelete();
          }}
        >
          <Trash2 className="h-4 w-4 mr-2 text-destructive" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
