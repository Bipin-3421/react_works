/* eslint-disable react-refresh/only-export-components */
import { LucideIcon } from "lucide-react";
import React from "react";

import { cn } from "@/lib/utils";

type TypoProps = ReactChildren & ClassName;

type WithIconProps = TypoProps & {
  Icon: LucideIcon;
  reverseIcon?: boolean;
};

const H1 = ({ children, className }: TypoProps): React.JSX.Element => {
  return <h1 className={cn("text-4xl font-bold", className)}>{children}</h1>;
};

const H2 = ({ children, className }: TypoProps): React.JSX.Element => {
  return <h2 className={cn("text-3xl font-bold", className)}>{children}</h2>;
};

const H3 = ({ children, className }: TypoProps): React.JSX.Element => {
  return (
    <h2 className={cn("text-2xl font-semibold", className)}>{children}</h2>
  );
};

const H4 = ({ children, className }: TypoProps): React.JSX.Element => {
  return <h2 className={cn("text-xl font-semibold", className)}>{children}</h2>;
};

const SemiBold = ({ children, className }: TypoProps): React.JSX.Element => {
  return <p className={cn("text-lg font-medium", className)}>{children}</p>;
};

const Bold = ({ children, className }: TypoProps): React.JSX.Element => {
  return <p className={cn("text-lg font-semibold", className)}>{children}</p>;
};

const P = ({ children, className }: TypoProps): React.JSX.Element => {
  return <p className={cn("text-lg font-normal", className)}>{children}</p>;
};

const WithIcon = ({
  children,
  className,
  Icon,
  reverseIcon = false,
}: WithIconProps): React.JSX.Element => {
  return (
    <div className={cn("flex gap-x-3 items-center", className)}>
      {reverseIcon ? (
        <>
          {children}
          <Icon size={22} />
        </>
      ) : (
        <>
          <Icon size={22} />
          {children}
        </>
      )}
    </div>
  );
};

export { H1, H2, H3, H4, SemiBold, Bold, P, WithIcon };
