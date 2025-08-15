import { FaSearch } from "react-icons/fa";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { CiWavePulse1 } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import StyledInput from "../SimpleComponents/StyledInput";
import StyledHeader from "./StyledHeader";
import avatarImg from "../../assets/mock-avatars/image=albertflores.webp";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";

function Header() {
  const [openDropDown, setOpenDropDown] = useState(false);
  const { user, logoutUser } = useAuth();

  console.log(user);

  return (
    <StyledHeader>
      <StyledHeader.Nav>
        <StyledHeader.Left>
          <StyledHeader.IconWrapperInput>
            <FaSearch />
          </StyledHeader.IconWrapperInput>
          <StyledInput
            placeholder="Search anything here"
            type="text"
            $paddingLeft="3.3rem"
          />
        </StyledHeader.Left>
        <StyledHeader.Right>
          <StyledHeader.Profile>
            <StyledHeader.Wrapper>
              <StyledHeader.Icon size="2.4rem" $hover={true}>
                <CiWavePulse1 />
              </StyledHeader.Icon>
              <StyledHeader.Icon size="2.4rem" $hover={true}>
                <IoIosNotificationsOutline />
              </StyledHeader.Icon>
            </StyledHeader.Wrapper>
            <StyledHeader.Avatar src={avatarImg} alt="User Avatar" />
            <StyledHeader.UserInfo direction="column">
              <StyledHeader.UserName>
                {user.full_name || undefined}
              </StyledHeader.UserName>
              <StyledHeader.UserEmail>
                {user.email || undefined}
              </StyledHeader.UserEmail>
            </StyledHeader.UserInfo>
          </StyledHeader.Profile>
          <StyledHeader.DropdownContainer>
            <StyledHeader.Wrapper>
              <StyledHeader.Icon
                size="2.4rem"
                $hover={true}
                $isOpen={openDropDown}
                onClick={() => setOpenDropDown(!openDropDown)}
              >
                <MdOutlineKeyboardArrowDown />
              </StyledHeader.Icon>
            </StyledHeader.Wrapper>

            <StyledHeader.DropdownMenu $isOpen={openDropDown}>
              <StyledHeader.DropdownItem onClick={null}>
                My Profile
              </StyledHeader.DropdownItem>
              <StyledHeader.DropdownItem onClick={null}>
                Settings
              </StyledHeader.DropdownItem>
              <StyledHeader.DropdownDivider />
              <StyledHeader.DropdownItem onClick={() => logoutUser()}>
                Sign Out
              </StyledHeader.DropdownItem>
            </StyledHeader.DropdownMenu>
          </StyledHeader.DropdownContainer>
        </StyledHeader.Right>
      </StyledHeader.Nav>
    </StyledHeader>
  );
}

export default Header;
