import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import StyledAppLayout from "./StyledAppLayout";
import Sidebar from "../Sidebar/Sidebar";
import StyledMain from "../Main/StyledMain";
import Header from "../Header/Header";
import LoadingSuspense from "../SuspenseComponents/Suspense";
import { useAuth } from "../../contexts/AuthContext";
import SetupFinished from "../SetupFinished.jsx/SetupFinished";

function AppLayout() {
  const { user } = useAuth();
  return (
    <StyledAppLayout>
      <Sidebar />
      <StyledMain>
        {!user.setup_finished && <SetupFinished />}
        <Header />
        <Suspense fallback={<LoadingSuspense />}>
          <Outlet />
        </Suspense>
      </StyledMain>
    </StyledAppLayout>
  );
}

export default AppLayout;
