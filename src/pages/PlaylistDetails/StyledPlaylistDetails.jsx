import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledPlaylistDetails = styled.div`
  margin: 3rem 3.5rem 3.5rem 3.5rem;
`;

StyledPlaylistDetails.Banner = styled(Link)`
  width: 100%;
  height: 30rem;
  display: block;
  border-radius: 16px;
  max-height: 30rem;
  background: ${(props) =>
    props.$backgroundImage
      ? `url(${props.$backgroundImage}) no-repeat center center / cover`
      : "none"};
`;

StyledPlaylistDetails.BannerContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-end;
  padding-left: clamp(1rem, 2vw, 2rem);
  padding-bottom: clamp(1.5rem, 2vw, 2rem);
  gap: clamp(1rem, 2vw, 2.5rem);
`;

StyledPlaylistDetails.BannerContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

StyledPlaylistDetails.BannerTitle = styled.h1`
  font-size: clamp(2rem, 3vw, 7rem);
  font-weight: 600;
  color: var(--text-primary-300);
  margin-top: 1rem;
`;

StyledPlaylistDetails.BannerIcon = styled.img`
  width: 15vw;
  height: 15vw;
  max-width: 15rem;
  max-height: 15rem;
  display: block;
  border-radius: 8px;
  object-fit: cover;
`;

StyledPlaylistDetails.BannerDescription = styled.p`
  font-size: clamp(1rem, 1.5vw, 1.4rem);
  color: var(--text-primary-300);
`;

export default StyledPlaylistDetails;
