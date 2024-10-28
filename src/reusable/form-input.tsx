import { UseFormRegisterReturn } from "react-hook-form";

import FormWrapper from "@/reusable/form-wrapper";
import { Input } from "@/components/ui/input";

type FormInputFieldProps = {
  name: string;
  placeholder?: string;
  className?: string;
  label?: string;
  error?: string;
  required?: boolean;
  register?: UseFormRegisterReturn;
  disabled?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;
const FormInputField = (props: FormInputFieldProps) => {
  const { name, label, required, className, ...res } = props;

  return (
    <FormWrapper label={label} isRequired={required} className={className}>
      <Input
        id={props.register?.name || name}
        {...res}
        {...props.register}
        disabled={props.disabled}
        type={props.type || "text"}
        placeholder={props.placeholder}
        className="w-full"
      />
    </FormWrapper>
  );
};

export default FormInputField;
