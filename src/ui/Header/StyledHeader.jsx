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

  @media (max-width: 991px) {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100vw;
    margin-left: calc(-50vw + 50%);
    z-index: 1001;
    padding: 1rem 1.5rem;
    height: 5.6rem;
  }

  @media (max-width: 768px) {
    padding: 0.75rem 1rem;
    height: 5rem;
  }

  @media (max-width: 480px) {
    padding: 0.5rem 0.75rem;
    height: 4.5rem;
  }
`;

StyledHeader.Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;

  @media (max-width: 768px) {
    gap: 1rem;
  }

  @media (max-width: 480px) {
    gap: 0.5rem;
  }
`;

StyledHeader.Left = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  position: relative;
  color: var(--text-secondary-300);

  @media (max-width: 768px) {
    gap: 0.75rem;
  }

  @media (max-width: 480px) {
    gap: 0.5rem;
  }
`;

StyledHeader.Right = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 768px) {
    gap: 0.75rem;
  }

  @media (max-width: 480px) {
    gap: 0.5rem;
  }
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

  @media (max-width: 768px) {
    width: ${(props) => (props.size ? `calc(${props.size} * 0.9)` : "1.4rem")};
    height: ${(props) => (props.size ? `calc(${props.size} * 0.9)` : "1.4rem")};
    font-size: ${(props) =>
      props.size ? `calc(${props.size} * 0.9)` : "1.4rem"};
  }

  @media (max-width: 480px) {
    width: ${(props) => (props.size ? `calc(${props.size} * 0.8)` : "1.2rem")};
    height: ${(props) => (props.size ? `calc(${props.size} * 0.8)` : "1.2rem")};
    font-size: ${(props) =>
      props.size ? `calc(${props.size} * 0.8)` : "1.2rem"};
  }
`;

StyledHeader.IconWrapperInput = styled(StyledHeader.Icon)`
  position: absolute;
  left: 0.6rem;

  @media (max-width: 768px) {
    left: 0.5rem;
  }

  @media (max-width: 480px) {
    left: 0.4rem;
  }
`;

StyledHeader.Wrapper = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.3rem;

  @media (max-width: 480px) {
    gap: 0.2rem;
  }
`;

StyledHeader.Profile = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 768px) {
    gap: 0.75rem;
  }

  @media (max-width: 480px) {
    gap: 0.5rem;
  }
`;

StyledHeader.Avatar = styled.img`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  object-fit: cover;

  @media (max-width: 768px) {
    width: 3.5rem;
    height: 3.5rem;
  }

  @media (max-width: 480px) {
    width: 3rem;
    height: 3rem;
  }
`;

StyledHeader.UserInfo = styled.div`
  display: flex;
  flex-direction: ${(props) => props.direction || "row"};
  line-height: 1.1;
  gap: 0.5rem;

  @media (max-width: 768px) {
    gap: 0.25rem;
    ${(props) =>
      props.direction === "row" &&
      `
      flex-direction: column;
      align-items: flex-start;
    `}
  }

  @media (max-width: 480px) {
    display: none;
  }
`;

StyledHeader.UserName = styled.h4`
  margin: 0;
  font-size: 1.4rem;
  color: var(--text-primary-300);

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.1rem;
  }
`;

StyledHeader.UserEmail = styled.p`
  margin: 0;
  font-size: 1.2rem;
  color: var(--text-secondary-300);

  @media (max-width: 768px) {
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    display: none;
  }
`;

export default StyledHeader;
