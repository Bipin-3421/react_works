import { useFormContext } from "react-hook-form";

import FormWrapper from "@/components/reusable/form-wrapper";
import { FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { MemberCreate, MemberUpdate } from "@/schema/members.schema";

const UserForm = () => {
  const { control } = useFormContext<MemberCreate | MemberUpdate>();

  return (
    <div className=" grid grid-cols-2 gap-4">
      <FormField
        control={control}
        name="name"
        render={({ field }) => (
          <FormWrapper label="Name" isRequired>
            <Input {...field} placeholder="Enter the name of user" />
          </FormWrapper>
        )}
      />
      <FormField
        control={control}
        name="email"
        render={({ field }) => (
          <FormWrapper label="Email" isRequired>
            <Input {...field} placeholder="Enter the email of user" />
          </FormWrapper>
        )}
      />
      <FormField
        control={control}
        name="phoneNumber"
        render={({ field }) => (
          <FormWrapper label="Phone Number " isRequired>
            <Input {...field} placeholder="Enter the phone number of user" />
          </FormWrapper>
        )}
      />
    </div>
  );
};

export default UserForm;
