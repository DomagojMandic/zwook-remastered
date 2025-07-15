import { Outlet } from "react-router-dom";
import StyledSidebar from "../Sidebar/StyledSidebar";
import StyledAppLayout from "./StyledAppLayout";
import Sidebar from "../Sidebar/Sidebar";
import StyledMain from "../Main/StyledMain";
import Header from "../Header/Header";

function AppLayout() {
  return (
    <StyledAppLayout>
      <Sidebar />
      <StyledMain>
        <Header />
        <Outlet />
      </StyledMain>
    </StyledAppLayout>
  );
}

export default AppLayout;
