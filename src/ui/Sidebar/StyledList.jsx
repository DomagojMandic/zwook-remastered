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
  position: relative;

  @media (max-width: 991px) {
    margin-right: 0;
  }
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
  position: relative;

  &:hover,
  &.active {
    color: var(--text-primary-300);
    background: var(--background-secondary-100);
  }

  @media (max-width: 991px) {
    padding: 1rem;
    justify-content: center;
    gap: 0;
    width: 50px;
    height: 50px;

    &:hover {
      .tooltip {
        opacity: 1;
        visibility: visible;
        transform: translateX(0);
      }
    }
  }
`;

StyledList.Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;

  @media (max-width: 991px) {
    font-size: 2rem;
  }
`;

StyledList.Label = styled.p`
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 991px) {
    display: none;
  }
`;

StyledList.Tooltip = styled.div`
  position: absolute;
  left: 100%;
  top: 50%;
  transform: translateY(-50%) translateX(-10px);
  background: var(--background-secondary-100);
  color: var(--text-primary-300);
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 1.2rem;
  font-weight: 500;
  white-space: nowrap;
  z-index: 1000;
  margin-left: 0.5rem;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.2s, visibility 0.2s, transform 0.2s;
  pointer-events: none;

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: -5px;
    transform: translateY(-50%);
    border: 5px solid transparent;
    border-right-color: var(--background-surface-900);
  }

  @media (min-width: 992px) {
    display: none;
  }
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

  @media (max-width: 991px) {
    position: absolute;
    top: -5px;
    right: -5px;
    min-width: 18px;
    height: 18px;
    padding: 0;
    font-size: 0.8rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
  }
`;

export default StyledList;
