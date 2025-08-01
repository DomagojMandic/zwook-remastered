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

  @media (max-width: 991px) {
    width: 100%;
    min-width: 320px;
    max-width: 60rem;
    height: 24rem;
    border-radius: 0.6rem;

    &:hover {
      transform: scale(1.01);
    }
  }

  @media (max-width: 768px) {
    width: 100%;
    min-width: 280px;
    max-width: 100%;
    height: 20rem;
    border-radius: 0.5rem;
    margin: 0 auto;
  }

  @media (max-width: 480px) {
    height: 16rem;
    border-radius: 0.4rem;

    &:hover {
      transform: none;
    }
  }
`;

StyledBanner.Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding-left: 2.1rem;
  padding-bottom: 0.8rem;
  height: 100%;

  @media (max-width: 768px) {
    padding-left: 1.8rem;
    padding-bottom: 1rem;
  }

  @media (max-width: 480px) {
    padding-left: 1.5rem;
    padding-bottom: 1.2rem;
    padding-right: 1.5rem;
  }
`;

StyledBanner.Title = styled.h4`
  font-size: clamp(1.6rem, 2vw, 2.4rem);
  font-weight: 600;
  margin-bottom: 0.5rem;
  transition: all 0.3s;

  @media (max-width: 768px) {
    font-size: clamp(1.4rem, 2.5vw, 2rem);
    margin-bottom: 0.4rem;
  }

  @media (max-width: 480px) {
    font-size: clamp(1.2rem, 3vw, 1.6rem);
    margin-bottom: 0.3rem;
  }
`;

StyledBanner.Description = styled.p`
  font-size: clamp(1.2rem, 1.7vw, 1.6rem);
  margin-bottom: 1rem;
  transition: all 0.3s;
  padding-right: 2.1rem;
  padding-left: 0;
  line-height: 1.5;
  word-break: break-word;

  @media (max-width: 768px) {
    font-size: clamp(1rem, 2vw, 1.4rem);
    padding-right: 1.8rem;
    margin-bottom: 0.8rem;
    line-height: 1.4;
  }

  @media (max-width: 480px) {
    font-size: clamp(0.9rem, 2.5vw, 1.2rem);
    padding-right: 0;
    margin-bottom: 0.6rem;
    line-height: 1.3;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
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

export default StyledBanner;
