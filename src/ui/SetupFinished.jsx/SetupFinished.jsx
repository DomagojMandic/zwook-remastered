import { Link } from "react-router";
import { useState } from "react";

import { IoMdClose } from "react-icons/io";
import StyledSetupFinished from "./StyledSetupFinished";
import IconButton from "../Buttons/IconButton";

function SetupFinished() {
  const [open, setOpen] = useState(true);

  return (
    open && (
      <StyledSetupFinished>
        Finish setting up your profile{" "}
        <StyledSetupFinished.Path to="/settings">
          {" "}
          here
        </StyledSetupFinished.Path>
        <IconButton
          onClick={() => setOpen(false)}
          $position="absolute"
          $top="0.5rem"
          $right="1rem"
          $bottom="auto"
          $left="auto"
        >
          <IoMdClose />
        </IconButton>
      </StyledSetupFinished>
    )
  );
}

export default SetupFinished;
