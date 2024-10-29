import { cn } from "@/lib/utils";

import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Label } from "@/components/ui/label";

import { Switch } from "@/components/ui/switch";

type FormFieldProps = ReactChildren &
  ClassName & {
    label?: string;
    isRequired?: boolean;
    showSwitch?: {
      label: string;
      checked: boolean;
      onChange: (e: boolean) => void;
    };
  };

const FormWrapper: React.FC<FormFieldProps> = ({
  label,
  children,
  className,
  isRequired = false,
  showSwitch,
}) => {
  return (
    <FormItem className={cn("space-y-2", className)}>
      <div className=" flex items-center  justify-between py-0 my-0">
        {label && (
          <FormLabel className="font-normal flex items-start gap-x-[0.5px] pl-1">
            {label}
            {isRequired ? (
              <span className="text-red-500 font-thin text-xs leading-[8px]">
                *
              </span>
            ) : null}
          </FormLabel>
        )}
        {showSwitch && (
          <div className="flex items-center space-x-2 ">
            <Label htmlFor={showSwitch.label} className="font-normal text-xs">
              {showSwitch.label}
            </Label>
            <Switch
              id={showSwitch.label}
              checked={showSwitch.checked}
              onCheckedChange={showSwitch.onChange}
            />
          </div>
        )}
      </div>
      <FormControl>{children}</FormControl>
      <FormMessage />
    </FormItem>
  );
};

export default FormWrapper;
