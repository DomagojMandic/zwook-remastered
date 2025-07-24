import styled from "styled-components";

export const StyledWizard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  height: 65%;
  width: 90%;
  margin: 0 auto;
  background-color: var(--background-secondary-300);
  border-radius: 16px;
  align-self: center;
`;

StyledWizard.Header = styled.header`
  padding-top: 2rem;
  width: 100%;
  height: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;

  & > * {
    width: 90%;
  }
`;

StyledWizard.Progress = styled.div`
  height: 1.2rem;

  background-color: var(--background-secondary-100);
  border-radius: 12px;
`;

StyledWizard.ProgressBar = styled.div`
  height: 100%;
  width: auto;
  background-color: var(--background-surface-500);
  border-radius: 12px;
`;

StyledWizard.StepList = styled.ol`
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  flex-wrap: nowrap;
  width: 100%;
  padding: 0 1.5rem;
  margin: 0;
  list-style: none;
`;

StyledWizard.ListItem = styled.li`
  position: relative;
  font-size: clamp(1.2rem, 2.5vw - 0.5rem, 2rem);
  text-align: center;
  min-width: 80px;
  padding: 0.5rem 0.5rem;
  white-space: pre-line;
`;

/* Wizard body */

StyledWizard.Container = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

export default StyledWizard;
