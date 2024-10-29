import { useForm } from "react-hook-form";

import FormDialog from "@/components/reusable/form-dialog";
import { Form } from "@/components/ui/form";

import MemberForm from "../_reusable/MemberForm";
import { useCreateUser } from "@/http/mutations/member.mutation";
import { MemberCreate, memberCreateSchema } from "@/schema/members.schema";
import { zodResolver } from "@hookform/resolvers/zod";

interface Props {
  isOpen: boolean;
  toggleModal: () => void;
}

const AddMember = ({ isOpen, toggleModal }: Props) => {
  const form = useForm<MemberCreate>({
    resolver: zodResolver(memberCreateSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
    },
  });
  const { mutate, isPending } = useCreateUser();

  const onSuccess = () => {
    form.reset();
    toggleModal();
  };

  const onSubmit = (data: MemberCreate) => {
    mutate({
      data,
      onSuccess,
    });
  };

  return (
    <FormDialog
      isOpen={isOpen}
      toggleModal={toggleModal}
      title="Add Member"
      mutateAction={{
        label: "Save Member",
        onClick: form.handleSubmit(onSubmit),
        isLoading: isPending,
      }}
      resetAction={{
        label: "Reset",
        onClick: form.reset,
      }}
    >
      <Form {...form}>
        <MemberForm />
      </Form>
    </FormDialog>
  );
};

export default AddMember;
