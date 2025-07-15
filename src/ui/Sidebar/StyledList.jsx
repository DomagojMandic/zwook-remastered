import { NavLink } from "react-router";
import styled from "styled-components";

/* It should follow the chronology:

1) StyledList
2) StyledList.Item
3) StyledList.NavLink
?4.1) StyledList.Icon
?4.2) StyledList.Label
?4.3) StyledList.Notification - if needed, should be divided with a 
div, used with notification prop


*/

const StyledList = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  padding: 0;
  gap: 1rem;
`;

StyledList.Item = styled.li`
  margin-right: 1rem;
`;

StyledList.NavLink = styled(NavLink)`
  font-family: var(--font-main);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.2rem;
  padding: 1rem 2rem;
  color: var(--text-secondary-300);
  text-decoration: none;
  font-size: 1.4rem;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  background: none;
  transition: color 0.3s, background 0.3s;
  cursor: pointer;

  &:hover,
  &.active {
    color: var(--text-primary-300);
    background: var(--background-secondary-100);
  }
`;

StyledList.Label = styled.p`
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

StyledList.Notification = styled.p`
  background-color: var(--background-surface-500);
  color: var(--text-dark-500);
  font-weight: 600;
  letter-spacing: 0;
  font-size: 1.04rem;
  padding: 0.2rem 0.9rem 0.2rem 0.8rem;
  border-radius: 20px;
  width: auto;
`;

export default StyledList;
