import StyledIcon from "../SimpleComponents/StyledIcon";
import StyledList from "./StyledList";

function SidebarItem({ label, icon, path, notification }) {
  return (
    <StyledList.Item>
      <StyledList.NavLink to={path}>
        <StyledIcon>{icon}</StyledIcon>
        <StyledList.Label>{label}</StyledList.Label>
        {notification && (
          <StyledList.Notification>{notification}</StyledList.Notification>
        )}
        <StyledList.Tooltip className="tooltip">{label}</StyledList.Tooltip>
      </StyledList.NavLink>
    </StyledList.Item>
  );
}

export default SidebarItem;
