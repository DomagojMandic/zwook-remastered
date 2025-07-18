import styled from "styled-components";

const StyledMediaItemPage = styled.div`
  width: 100%;
  display: flex;
  margin: 2rem 0rem 2rem 0rem;
  flex-direction: column;
  gap: 3rem;
`;

StyledMediaItemPage.Container = styled.div`
  display: flex;
  gap: 2rem;
  margin-left: clamp(1rem, 2.5vw, 4rem);
  margin-right: clamp(1rem, 2.5vw, 4rem);
`;

StyledMediaItemPage.Image = styled.img`
  width: clamp(20%, 20vw, 40%);
  height: auto;
  border-radius: 8px;
  object-fit: cover;
`;

StyledMediaItemPage.DetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  color: var(--text-primary-300);
`;

StyledMediaItemPage.Title = styled.h2`
  font-size: clamp(2rem, 3.5vw, 6rem);
  font-weight: 600;
  margin-bottom: 0.5rem;
  transition: all 0.3s ease-in-out;
`;

StyledMediaItemPage.Type = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text-secondary-300);
  margin-bottom: 8px;
  text-transform: uppercase;
`;

StyledMediaItemPage.Description = styled.p`
  font-size: clamp(1.4rem, 1.7vw, 2.5rem);
  transition: all 0.3s;
  padding-right: 2.1rem;
  padding-left: 0;

  line-height: 1.5;
  word-break: break-word;
`;
StyledMediaItemPage.Metadata = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.2rem;
  font-size: 1.4rem;
  color: var(--text-secondary-300);
  margin-top: 1rem;
`;
export default StyledMediaItemPage;
