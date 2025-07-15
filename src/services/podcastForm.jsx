import FormLabel from "../ui/SimpleComponents/FormLabel";
import FormInput from "../ui/SimpleComponents/FormInput";
import { StyledFormWrapper } from "../pages/Podcasts/CreatePodcasts";
import FormTextarea from "../ui/SimpleComponents/FormTextarea";
import FormCheckbox from "../ui/SimpleComponents/FormCheckbox";
import FormCheckboxLabel from "../ui/SimpleComponents/FormCheckboxLabel";

/**
 * Creates a container with a label and input field based on the provided configuration object.
 * @param {Object} input - The configuration object for the input element.
 * @param {number} index - The index of the input element in the list.
 * @returns {HTMLDivElement} The container element with label and input.
 */
/**
 * Creates an input element with a label.
 *
 */

export function createInput(input, index) {
  if (input.type === "text") {
    return (
      <StyledFormWrapper key={index}>
        <FormLabel htmlFor={input.htmlFor}>{input.label}</FormLabel>
        <FormInput
          type={input.type}
          placeholder={input.placeholder}
          id={input.htmlFor}
        />
      </StyledFormWrapper>
    );
  }

  if (input.type === "textarea") {
    return (
      <StyledFormWrapper key={index}>
        <FormLabel htmlFor={input.htmlFor}>{input.label}</FormLabel>
        <FormTextarea placeholder={input.placeholder} id={input.htmlFor} />
      </StyledFormWrapper>
    );
  }

  if (input.type === "checkbox") {
    return (
      <StyledFormWrapper key={index}>
        <FormCheckboxLabel htmlFor={input.htmlFor}>
          <FormCheckbox id={input.htmlFor} />
          <span>{input.label}</span>
        </FormCheckboxLabel>
      </StyledFormWrapper>
    );
  }
}
