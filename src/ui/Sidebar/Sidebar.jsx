import StyledSidebar from "./StyledSidebar";
import StyledList from "./StyledList";
import Logo from "../Logo/Logo";

import sidebarItems from "../../data/sidebarItems";
import SidebarItem from "./SidebarItem";

function Sidebar() {
  return (
    <StyledSidebar>
      <Logo />
      <StyledList>
        {sidebarItems.map((item) => {
          return (
            <SidebarItem
              key={item.label}
              label={item.label}
              icon={item.icon}
              path={item.path}
              notification={item.notification}
            />
          );
        })}
      </StyledList>
    </StyledSidebar>
  );
}

export default Sidebar;
