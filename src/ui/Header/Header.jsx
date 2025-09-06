import { FaSearch } from "react-icons/fa";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { CiWavePulse1 } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import StyledInput from "../SimpleComponents/StyledInput";
import StyledHeader from "./StyledHeader";
import avatarImg from "../../assets/mock-avatars/image=albertflores.webp";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";
import { useSelector } from "react-redux";

function Header() {
  const [openDropDown, setOpenDropDown] = useState(false);
  const { user } = useSelector((state) => state.user);
  const { logoutUser } = useAuth();

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
            <StyledHeader.Avatar
              src={
                user.cover_url ||
                "https://abawfcbqrulsptzzrfta.supabase.co/storage/v1/object/public/images/users/defaultProfilePicture.jpg"
              }
              alt="User Avatar"
            />
            <StyledHeader.UserInfo direction="column">
              <StyledHeader.UserName>
                {user.display_name || user.full_name}
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
