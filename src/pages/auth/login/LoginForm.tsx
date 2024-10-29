import { useForm } from "react-hook-form";

import FormInputField from "@/components/reusable/form-input";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";

import { useLoginMutation } from "@/http/mutations/auth.mutations";
import { TLogin, loginSchema } from "@/schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";

const LoginForm = () => {
  const form = useForm<TLogin>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
    },
  });
  const { mutate: loginMutation, isPending } = useLoginMutation();

  const onSubmit = async (values: TLogin) => {
    loginMutation(values.email);
  };

  return (
    <div className="space-y-5 3xl:space-y-8 pt-6 3xl:pt-8">
      <Form {...form}>
        <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4 3xl:space-y-5">
            <FormField
              name="email"
              render={({ field }) => (
                <FormInputField placeholder="Enter email address" {...field} />
              )}
            />
            <p className="text-xs  leading-relaxed">
              <span className="text-gray-500">
                By signing up, you agree to our{" "}
              </span>
              <b>
                <u className="text-dark">Privacy Policies</u>
              </b>{" "}
              &{" "}
              <b>
                <u className="text-dark">Terms and Conditions</u>
              </b>
            </p>
          </div>
          <Button
            type="submit"
            className="w-full"
            isLoading={form.formState.isSubmitting || isPending}
          >
            Send OTP
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
