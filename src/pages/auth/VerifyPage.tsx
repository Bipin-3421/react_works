import { useLocation, useNavigate } from "react-router-dom";

import VerifyOTPForm from "./verify/VerifyForn";
import { routes } from "@/constants/route";

const VerifyPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { email } = location.state;
  if (!email) {
    navigate(routes.LOGIN);
  }

  return (
    <div>
      <div className="space-y-6">
        <h1 className="text-center text-2xl 3xl:text-3xl font-bold text-dark-300">
          Verify your <span className="text-primary">Email</span>
        </h1>
        <p className="text-center font-light 3xl:text-base text-sm">
          We've sent an email with a signup code to your email{" "}
          <span className="font-normal ">{email}</span>{" "}
        </p>
        <VerifyOTPForm email={email} />
      </div>
    </div>
  );
};

export default VerifyPage;
