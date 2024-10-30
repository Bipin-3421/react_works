import { Plus } from "lucide-react";

import { DataTable } from "@/components/data-table/data-table";
import CustomHeader from "@/components/reusable/CustomHeader";
import FetchWrapper from "@/components/reusable/fetch-wrapper";

import AddMember from "./_components/create/AddMember";
import UpdateMember from "./_components/update/UpdateMember";
import { columns } from "./_table/columns";
import { useModalStore } from "@/hooks/use-modal";
import { useGetMembers } from "@/http/queries/member.queries";
import { TMember } from "@/schema/members.schema";
import { ModalIds } from "@/types/index";

const MembersPage = () => {
  const { modals, openModal, closeModal, data: modalsData } = useModalStore();
  const { data, isLoading, ...res } = useGetMembers();

  return (
    <div>
      <CustomHeader title="MEMBERS" />
      <FetchWrapper isTable isLoading={isLoading} {...res}>
        <DataTable
          columns={columns as TMember[]}
          data={data || []}
          addButton={{
            label: "Add members",
            icon: <Plus className="w-5 h-5 mr-2" />,
            onClick: () => openModal(ModalIds.ADD_MEMBER),
          }}
        />
      </FetchWrapper>
      {modals["add-member"] && (
        <AddMember
          isOpen={modals["add-member"]}
          toggleModal={() => closeModal(ModalIds.ADD_MEMBER)}
        />
      )}
      {modals["update-member"] && (
        <UpdateMember
          isOpen={modals["update-member"]}
          toggleModal={() => closeModal(ModalIds.UPDATE_MEMBER)}
          initialData={modalsData["update-member"] ?? ({} as TMember)}
        />
      )}
    </div>
  );
};

export default MembersPage;
