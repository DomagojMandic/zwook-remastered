import styled from "styled-components";
import { formatTime, parseCustomDate } from "../../helpers/helpers";

const TitleContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  gap: 1rem;
  justify-content: center;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: center;
`;

const Image = styled.img`
  width: clamp(3rem, 3vw, 4rem);
  height: clamp(3rem, 3vw, 4rem);
  border-radius: 8px;
  border: 1px solid var(--border-primary-300);
`;
const SongContent = styled.span`
  display: flex;
  align-items: center;
  font-size: ${({ $maxFontSize = "1.2rem" }) =>
    `clamp(1rem, 1vw, ${$maxFontSize})`};
  color: ${({ color = "var(--text-primary-500)" }) =>
    color ? color : "var(--text-secondary-300)"};
`;

function PlaylistRowItem({ item, index }) {
  console.log(item);
  return (
    <>
      <SongContent>{index + 1}</SongContent>
      <TitleContainer>
        <Image src={item.cover_url} alt={item.title} />
        <TitleWrapper>
          <SongContent $maxFontSize="1.2rem">{item.title}</SongContent>
          <SongContent $maxFontSize="1rem" color="var(--text-secondary-300)">
            {item.artist}
          </SongContent>
        </TitleWrapper>
      </TitleContainer>
      <SongContent>{item.album}</SongContent>
      <SongContent>{parseCustomDate(item.created_at)}</SongContent>
      <SongContent>{formatTime(item.duration)}</SongContent>
    </>
  );
}

export default PlaylistRowItem;
