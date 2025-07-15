import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledBanner = styled(Link)`
  background: ${(props) =>
    props.$backgroundImage
      ? `url(${props.$backgroundImage})`
      : "linear-gradient(90deg, #ffe259 0%, #ffa751 100%)"};
  background-size: cover;
  background-position: center;
  display: block;

  width: 74rem;
  height: 28rem;
  border-radius: 0.8rem;
  transition: all 0.3s;
  color: var(--text-primary-300);
  flex-grow: 1;

  &:hover {
    color: var(--background-surface-500);
    transform: scale(1.02);
  }
`;

StyledBanner.Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding-left: 2.1rem;
  padding-bottom: 0.8rem;
  height: 100%;
`;

StyledBanner.Title = styled.h4`
  font-size: clamp(1.6rem, 2vw, 2.4rem);
  font-weight: 600;
  margin-bottom: 0.5rem;
  transition: all 0.3s;
`;

StyledBanner.Description = styled.p`
  font-size: clamp(1.2rem, 1.7vw, 1.6rem);
  margin-bottom: 1rem;
  transition: all 0.3s;
  padding-right: 2.1rem;
  padding-left: 0;

  line-height: 1.5;
  word-break: break-word;
`;

StyledBanner.Icon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => (props.size ? props.size : "1.6rem")};
  height: ${(props) => (props.size ? props.size : "1.6rem")};
  border-radius: 50%;

  font-size: ${(props) => (props.size ? props.size : "1.6rem")};
  transition: all 0.3s;
`;

export default StyledBanner;
