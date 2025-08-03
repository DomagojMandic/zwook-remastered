import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import StyledAppLayout from "./StyledAppLayout";
import Sidebar from "../Sidebar/Sidebar";
import StyledMain from "../Main/StyledMain";
import Header from "../Header/Header";
import LoadingSuspense from "../SuspenseComponents/Suspense";

function AppLayout() {
  return (
    <StyledAppLayout>
      <Sidebar />
      <StyledMain>
        <Header />
        <Suspense fallback={<LoadingSuspense />}>
          <Outlet />
        </Suspense>
      </StyledMain>
    </StyledAppLayout>
  );
}

export default AppLayout;
