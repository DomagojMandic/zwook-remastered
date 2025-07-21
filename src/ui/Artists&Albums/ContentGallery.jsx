import StyledContentGallery from "./StyledContentGallery";
import ContentHeader from "../ContentHeader/ContentHeader";

/* Clean component with render props pattern */
function ContentGallery({
  items,
  type,
  render,
  title,
  createButtonText,
  onCreateClick,
}) {
  return (
    <>
      <ContentHeader
        title={title}
        createButtonText={createButtonText}
        onCreateClick={onCreateClick}
      />
      <StyledContentGallery>
        <StyledContentGallery.Grid>
          {items?.map((item) => render(item, type))}
        </StyledContentGallery.Grid>
      </StyledContentGallery>
    </>
  );
}

export default ContentGallery;
