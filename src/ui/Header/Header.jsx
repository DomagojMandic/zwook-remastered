import { FaSearch } from "react-icons/fa";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { CiWavePulse1 } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import StyledInput from "../SimpleComponents/StyledInput";
import StyledHeader from "./StyledHeader";
import avatarImg from "../../assets/mock-avatars/image=albertflores.png";

function Header() {
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
              <StyledHeader.UserName>John Doe</StyledHeader.UserName>
              <StyledHeader.UserEmail>avatar@zwook.com</StyledHeader.UserEmail>
            </StyledHeader.UserInfo>
          </StyledHeader.Profile>
          <StyledHeader.Wrapper>
            <StyledHeader.Icon size="2.4rem" $hover={true}>
              <MdOutlineKeyboardArrowDown />
            </StyledHeader.Icon>
          </StyledHeader.Wrapper>
        </StyledHeader.Right>
      </StyledHeader.Nav>
    </StyledHeader>
  );
}

export default Header;
