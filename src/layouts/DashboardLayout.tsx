import React, { Suspense } from "react";
import { Navigate, Outlet } from "react-router-dom";

import Navbar from "@/components/navbar/Navbar";
import CustomAlertDialog from "@/components/reusable/custom-alert-dialog";
import LoadingScreen from "@/components/reusable/loading";
import Sidebar from "@/components/sidebar/Sidebar";

import { routes } from "@/constants/route";
import { useGetMemberQuery } from "@/http/queries/auth.queries";
import useTokenStore from "@/store";
import { useMemberDetailsStore } from "@/zustand/use-member-details";
import { useConfig } from "@/zustand/useConfig";

const DashboardLayout = () => {
  const expanded = useConfig((state) => state.expanded);
  const { token } = useTokenStore((state) => state);
  const { data, isLoading } = useGetMemberQuery();
  const { MemberDetails, SetMemberDetails } = useMemberDetailsStore();

  React.useEffect(() => {
    if (data && Object.values(MemberDetails).every((value) => !value)) {
      SetMemberDetails(data);
    }
  }, [data, MemberDetails, SetMemberDetails]);

  if (token === "") {
    return <Navigate to={routes.LOGIN} replace />;
  }

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Suspense fallback={<LoadingScreen />}>
      {/* //TODO: fix with a better loading spinner */}
      <section className="flex gap-2 ">
        <Sidebar />
        <div
          className={`w-full h-screen overflow-y-scroll scrollbar-thin ${expanded ? "lg:ml-[250px]" : "ml-20"}`}
        >
          <Navbar />

          <main className="flex-1 flex-col max-w-screen w-full  px-8 gap-y-8 mx-auto mt-[2rem]">
            <Outlet />
            <CustomAlertDialog />
          </main>
        </div>
      </section>
    </Suspense>
  );
};

export default DashboardLayout;
