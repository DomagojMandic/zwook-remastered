import StyledFeaturedCard from "./StyledFeaturedSection";
import FeaturedButton from "../Buttons/FeaturedButton";

import albertflores from "../../assets/mock-avatars/image=albertflores.png";
import anneteblack from "../../assets/mock-avatars/image=annetteblack.png";
import archieyoung from "../../assets/mock-avatars/image=archieyoung.png";
import brooklynsimmons from "../../assets/mock-avatars/image=brooklynsimmons.png";
import useDragToScroll from "../../hooks/useDragToScroll";

function FeaturedSection({ title = "Featured", buttons = [], items = [] }) {
  const ref = useDragToScroll();

  return (
    <StyledFeaturedCard>
      <StyledFeaturedCard.TitleWrapper>
        <StyledFeaturedCard.Title>{title}</StyledFeaturedCard.Title>
        {buttons.length > 0 && (
          <StyledFeaturedCard.ButtonWrapper>
            {buttons.map((buttonComponent) => {
              return buttonComponent;
            })}
          </StyledFeaturedCard.ButtonWrapper>
        )}
      </StyledFeaturedCard.TitleWrapper>
      <StyledFeaturedCard.ItemWrapper ref={ref}>
        {items.map((item) => {
          return (
            <StyledFeaturedCard.Item
              to={`/media/${item.type}/${item.id}`}
              key={item.id}
            >
              <StyledFeaturedCard.Figure>
                <StyledFeaturedCard.Image
                  src={item.backgroundImage}
                  alt={item.title}
                />
                <StyledFeaturedCard.ItemTitle>
                  {item.title}
                </StyledFeaturedCard.ItemTitle>
              </StyledFeaturedCard.Figure>
            </StyledFeaturedCard.Item>
          );
        })}
      </StyledFeaturedCard.ItemWrapper>
    </StyledFeaturedCard>
  );
}

export default FeaturedSection;
