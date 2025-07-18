import styled from "styled-components";

import { useState } from "react";
import { MdOutlineStarBorder } from "react-icons/md";
import StarButton from "../Buttons/StarButton";
import { STARS_ARRAY } from "../../data/starRating";

const StyledStarRating = styled.div`
  display: flex;
  gap: 0.4rem;
  align-items: center;
`;

const StyledSpan = styled.span`
  font-size: ${(props) => props.size || "12px"};
  color: var(--text-secondary-300);
  font-weight: 500;
  margin-left: 0.5rem;
  opacity: ${(props) => (props.rating > 0 ? 1 : 0.6)};
  transition: opacity 0.2s ease;
`;

function StarRating({ rating, onRatingChange, type, size = "20px" }) {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <StyledStarRating>
      {STARS_ARRAY.map((star) => (
        <StarButton
          key={star}
          isActive={star <= (hoverRating || rating)}
          onClick={() => onRatingChange(star)}
          onMouseEnter={() => setHoverRating(star)}
          onMouseLeave={() => setHoverRating(0)}
          size={size}
        />
      ))}
      <StyledSpan rating={rating}>
        {rating > 0 ? `${rating}/5` : "Rate"}
      </StyledSpan>
    </StyledStarRating>
  );
}

export default StarRating;
