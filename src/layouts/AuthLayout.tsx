import { Outlet } from "react-router-dom";
import { IMAGES } from "../constants/images";

const AuthLayout = () => {
  return (
    <div className=" h-screen  place-items-center overflow-auto p-12 3xl:p-16">
      <div className="flex size-full flex-col items-center space-y-24 3xl:space-y-32">
        <img src={IMAGES.LOGO} className="size-52 rounded-md" alt="logo" />
        <div className="relative w-full max-w-sm 3xl:max-w-md rounded-2xl border bg-background px-8 3xl:px-12 py-10 3xl:py-14">
          <img
            alt="Abstract image top"
            src={IMAGES.LOGIN_ABSTRACT_TOP}
            className="absolute -left-1/3 top-[-25%] -z-10 size-48 3xl:size-56 select-none"
          />

          <Outlet />
          <img
            alt="Abstract image bottom"
            src={IMAGES.LOGIN_ABSTRACT_BOTTOM}
            className="absolute -right-1/4 bottom-[-30%] -z-10 size-48 3xl:size-56 select-none"
          />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
