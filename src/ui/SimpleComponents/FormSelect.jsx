import React from "react";
import styled from "styled-components";
import AsyncSelect from "react-select/async";

// This component is fetching using a custom hook and displaying a list of entities as options
const StyledAsyncSelect = styled(AsyncSelect)`
  font-size: clamp(1.2rem, 2.5vw, 1.4rem);
  width: 100%;

  .react-select__control {
    background-color: var(--background-secondary-500);
    color: var(--text-primary-100);
    border: 1px solid var(--border-primary-300);
    border-radius: 8px;
    padding: clamp(0.8rem, 2vw, 1rem);
    box-shadow: none;
  }

  .react-select__menu {
    background-color: var(--background-secondary-500);
    border-radius: 8px;
    color: var(--text-primary-300);
  }

  .react-select__option {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .react-select__option:hover {
    background-color: var(--background-surface-500);
  }

  img {
    width: 30px;
    height: 30px;
    object-fit: cover;
    border-radius: 4px;
    margin-right: 8px;
  }
`;

// EACH OPTION
const CustomOption = ({
  innerRef,
  innerProps,
  data,
  isFocused,
  isSelected,
}) => {
  return (
    <div
      ref={innerRef}
      {...innerProps}
      style={{
        backgroundColor: isFocused
          ? "var(--background-secondary-100)"
          : "transparent",
        color: isSelected
          ? "var(--text-primary-300)"
          : "var(--text-primary-100)",
        display: "flex",
        alignItems: "center",
        padding: "8px 12px",
        cursor: "pointer",
        borderRadius: "8px",
      }}
    >
      {data.cover_url && <img src={data.cover_url} alt="" />}
      {data.title}
    </div>
  );
};

const customStyles = {
  singleValue: (provided) => ({
    ...provided,
    color: "var(--text-primary-100)", // OPTIONS COLOR
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "var(--text-secondary-300)", // PLACEHOLDER COLOR
  }),
};

function EntitySelect({
  items = [],
  value,
  onChange,
  placeholder = "Select or type",
}) {
  const mapToOptions = (entities) =>
    entities.map(({ id, title, cover_url }) => ({
      value: id,
      label: title,
      title,
      cover_url,
    }));

  const loadOptions = (inputValue, callback) => {
    const filtered = items.filter((item) =>
      item.title.toLowerCase().includes(inputValue.toLowerCase())
    );
    callback(mapToOptions(filtered));
  };

  const selectedOption = value
    ? {
        value: value.id,
        label: value.title,
        title: value.title,
        cover_url: value.cover_url,
      }
    : null;

  return (
    <StyledAsyncSelect
      cacheOptions
      defaultOptions={mapToOptions(items)}
      loadOptions={loadOptions}
      components={{ Option: CustomOption }}
      onChange={(option) => onChange(option)}
      value={selectedOption}
      placeholder={placeholder}
      isClearable
      classNamePrefix="react-select"
      styles={customStyles} // CUSTOM STYLES FOR THE INPUT CONTAINER
    />
  );
}

export default EntitySelect;
