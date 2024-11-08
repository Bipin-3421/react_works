import React from "react";
import { useNavigate } from "react-router-dom";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPSlot } from "@/components/ui/input-otp";

import { authRoutes } from "@/constants/route";
import {
  useLoginMutation,
  useVerifyMutation,
} from "@/http/mutations/auth.mutations";

const VerifyOTPForm = ({ email }: { email: string }) => {
  const navigate = useNavigate();
  // if (!email) {
  //   navigate(routes.LOGIN);
  // }
  const [success, setSuccess] = React.useState(false);
  const [hasSent, setHasSent] = React.useState(false);
  const { mutate: resendOtp, isPending: isOTPResendLoading } =
    useLoginMutation();
  const { mutate: verifyOTPMutation, isPending: isVerifyingMailOTP } =
    useVerifyMutation();

  const onVerifyCompleted = () => {
    setSuccess(true);
    navigate(authRoutes.MEMBERS); // Redirect to dashboard
  };

  const handleSubmit = (otp: string) => {
    setHasSent(true);
    verifyOTPMutation({ email, otp, onVerifyCompleted });
  };

  const handleResend = async () => {
    resendOtp(email);
  };

  const className = cn(
    !isVerifyingMailOTP &&
      success &&
      hasSent &&
      "ring-1 ring-green-500/50 ring-offset-background",
    !isVerifyingMailOTP &&
      !success &&
      hasSent &&
      "ring-1 ring-red-500/50 ring-offset-background"
  );
  return (
    <div className="space-y-8">
      <InputOTP
        maxLength={5}
        className="h-fit"
        onComplete={handleSubmit}
        onChangeCapture={() => setHasSent(false)}
        disabled={isVerifyingMailOTP}
        autoFocus
      >
        <InputOTPSlot index={0} className={className} />
        <InputOTPSlot index={1} className={className} />
        <InputOTPSlot index={2} className={className} />
        <InputOTPSlot index={3} className={className} />
        <InputOTPSlot index={4} className={className} />
      </InputOTP>

      <div className="flex items-center justify-center 3xl:text-base text-sm">
        <Button
          className="w-full"
          onClick={handleResend}
          disabled={isOTPResendLoading || isVerifyingMailOTP}
          isLoading={isOTPResendLoading}
        >
          Send OTP again
        </Button>
      </div>
    </div>
  );
};

export default VerifyOTPForm;
