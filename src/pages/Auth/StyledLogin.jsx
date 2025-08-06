import styled from "styled-components";

const StyledLogin = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100dvh;
  min-width: 100%;
  overflow: hidden;
  background-color: var(--background-primary-100);
`;

StyledLogin.Left = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100dvh;
  width: 100%;
  background-color: var(--text-dark-500);
  padding: 2rem;
  position: relative;
  z-index: 9999;
`;

StyledLogin.Right = styled.div`
  height: 100dvh;
  width: 100%;
  background-color: var(--background-surface-500);
  position: relative;
  overflow: hidden;
`;

StyledLogin.WelcomeTitle = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  color: var(--text-primary-300);
  margin: 0;
  text-align: center;
`;

StyledLogin.WelcomeText = styled.p`
  font-size: 1.4rem;
  color: var(--text-secondary-300);
  margin: 0;
  text-align: center;
  font-weight: var(--font-weight-semibold);

  a {
    color: var(--color-primary-500);
    text-decoration: none;
    font-weight: var(--font-weight-semibold);

    &:hover {
      text-decoration: underline;
    }
  }
`;

export default StyledLogin;
