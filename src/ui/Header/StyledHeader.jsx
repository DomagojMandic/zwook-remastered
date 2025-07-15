import styled from "styled-components";

// 1) StyledHeader component
// 2) StyledHeader.Nav for navigation
// 3) StyledHeader.Left for left-aligned items
// 4) StyledHeader.Right for right-aligned items
// 5.?1) StyledHeader.Profile for user profile section
// 5?.2) StyledHeader.Avatar for user avatar
// 5?.3) StyledHeader.UserInfo for user information
// 5?.4) StyledHeader.UserName for user name
// 5?.5) StyledHeader.UserEmail for user email

const StyledHeader = styled.header`
  border-bottom: 1px solid var(--border-primary-300);
  padding: 1.5rem 2.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: 6.8rem;
  position: sticky;
  top: 0;
  background-color: var(--text-dark-500);
  z-index: 1000;
`;

StyledHeader.Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
`;

StyledHeader.Left = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  position: relative;
  color: var(--text-secondary-300);
`;

StyledHeader.Right = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

StyledHeader.Icon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => (props.size ? props.size : "1.6rem")};
  height: ${(props) => (props.size ? props.size : "1.6rem")};
  border-radius: 50%;
  color: var(--text-secondary-300);

  font-size: ${(props) => (props.size ? props.size : "1.6rem")};
  transition: all 0.3s;

  ${(props) =>
    props.$hover &&
    `
      &:hover {
        color: var(--background-surface-500);
        cursor: pointer;
      }
    `}
`;

StyledHeader.IconWrapperInput = styled(StyledHeader.Icon)`
  position: absolute;
  left: 0.6rem;
`;

StyledHeader.Wrapper = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.3rem;
`;

StyledHeader.Profile = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

StyledHeader.Avatar = styled.img`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  object-fit: cover;
`;

StyledHeader.UserInfo = styled.div`
  display: flex;
  flex-direction: ${(props) => props.direction || "row"};
  line-height: 1.1;
  gap: 0.5rem;
`;

StyledHeader.UserName = styled.h4`
  margin: 0;
  font-size: 1.4rem;
  color: var(--text-primary-300);
`;

StyledHeader.UserEmail = styled.p`
  margin: 0;
  font-size: 1.2rem;
  color: var(--text-secondary-300);
`;

export default StyledHeader;
