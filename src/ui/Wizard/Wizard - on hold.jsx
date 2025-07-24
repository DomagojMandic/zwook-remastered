import { useState } from "react";
import { StyledWizard } from "./StyledWizard";
import IconButton from "../Buttons/IconButton";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";

function Wizard({}) {
  const [steps, setSteps] = useState();

  return (
    <StyledWizard>
      <StyledWizard.Header>
        <StyledWizard.Progress>
          <StyledWizard.ProgressBar />
        </StyledWizard.Progress>
        <StyledWizard.StepList>
          <StyledWizard.ListItem>{`Create an \n Artist`}</StyledWizard.ListItem>
          <StyledWizard.ListItem>{`Create an \n Album`}</StyledWizard.ListItem>
          <StyledWizard.ListItem>{`Upload a \n Song`}</StyledWizard.ListItem>
        </StyledWizard.StepList>
      </StyledWizard.Header>
      <StyledWizard.Container>
        <IconButton>
          <MdKeyboardArrowLeft />
        </IconButton>
        <IconButton>
          <MdKeyboardArrowRight />
        </IconButton>
      </StyledWizard.Container>
    </StyledWizard>
  );
}

export default Wizard;
