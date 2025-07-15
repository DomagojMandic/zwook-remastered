import styled from "styled-components";

const StyledMediaItemPage = styled.div`
  width: 100%;
  display: flex;
  margin: 2rem 2.5rem;
  flex-direction: column;
  gap: 3rem;
`;

StyledMediaItemPage.Container = styled.div`
  display: flex;
  gap: 2rem;
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

StyledMediaItemPage.Description = styled.p`
  font-size: clamp(1.4rem, 1.7vw, 2.5rem);
  transition: all 0.3s;
  padding-right: 2.1rem;
  padding-left: 0;

  line-height: 1.5;
  word-break: break-word;
`;

export default StyledMediaItemPage;
