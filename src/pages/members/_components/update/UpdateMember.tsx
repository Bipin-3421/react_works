import { useForm } from "react-hook-form";

import FormDialog from "@/components/reusable/form-dialog";
import { Form } from "@/components/ui/form";

import MemberForm from "../_reusable/MemberForm";
import { useUpdateMember } from "@/http/mutations/member.mutation";
import { MemberUpdate, memberUpdateSchema } from "@/schema/members.schema";
import { zodResolver } from "@hookform/resolvers/zod";

interface Props {
  isOpen: boolean;
  toggleModal: () => void;
  initialData: MemberUpdate;
}

const UpdateUser = ({ isOpen, toggleModal, initialData }: Props) => {
  const form = useForm<MemberUpdate>({
    resolver: zodResolver(memberUpdateSchema),
    defaultValues: initialData,
  });

  const { mutate, isPending } = useUpdateMember();

  const onSuccess = () => {
    toggleModal();
    form.reset();
  };

  const onSubmit = (data: MemberUpdate) => {
    mutate({ id: initialData.id, data }, { onSuccess });
  };

  return (
    <FormDialog
      isOpen={isOpen}
      toggleModal={toggleModal}
      title="Update User"
      mutateAction={{
        label: "Save Changes",
        onClick: form.handleSubmit(onSubmit),
        isLoading: isPending,
      }}
      resetAction={{
        label: "Discard",
        onClick: form.reset,
      }}
    >
      <Form {...form}>
        <MemberForm />
      </Form>
    </FormDialog>
  );
};

export default UpdateUser;
