import StyledContentGallery from "./StyledContentGallery";
import ContentHeader from "../ContentHeader/ContentHeader";

/* Clean component with render props pattern */
function ContentGallery({ items, render, title, type }) {
  return (
    <>
      <ContentHeader title={title} type={type} />
      <StyledContentGallery>
        <StyledContentGallery.Grid>
          {items?.map((item) => render(item, type))}
        </StyledContentGallery.Grid>
      </StyledContentGallery>
    </>
  );
}

export default ContentGallery;
