import styled from "styled-components";
import DatePicker from "react-datepicker";

/* Styled input polje */
const StyledDatePicker = styled(DatePicker)`
  width: 100%;
  padding: 1rem 1.2rem;
  font-size: 1.4rem;
  font-family: var(--font-main);
  color: var(--text-primary-300);
  background-color: var(--background-secondary-500);
  border: 1.5px solid var(--border-primary-300);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-sm);
  transition: border-color 0.3s ease, color 0.3s ease, transform 0.3s ease;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: var(--background-surface-500);
    color: var(--background-surface-500);
    transform: scale(1.05);
  }

  &::placeholder {
    color: var(--text-secondary-300);
    font-size: 1.6rem;
  }

  &:hover {
    border-color: var(--background-surface-500);
    color: var(--background-surface-500);
  }
`;

/* Wrapper za kalendar i dropdown */
const StyledCalendarWrapper = styled.div`
  .react-datepicker {
    background-color: var(--background-primary-500);
    border: 1.5px solid var(--border-primary-300);
    border-radius: var(--border-radius-md);
    box-shadow: var(--shadow-md);
    font-family: var(--font-main);
    font-size: 1.8rem;
    color: var(--text-primary-300);
    padding: 1rem;
    width: 100%;
  }

  .react-datepicker__header {
    background-color: var(--background-primary-300);
    border-bottom: 1px solid var(--border-primary-300);
    padding: 0.8rem 0;
    border-radius: var(--border-radius-md) var(--border-radius-md) 0 0;
  }

  .react-datepicker__current-month {
    font-weight: var(--font-weight-semibold);
    font-size: 2rem;
    color: var(--text-primary-300);
  }

  .react-datepicker__day-names {
    margin-top: 0.8rem;
  }

  .react-datepicker__day-name {
    color: var(--text-secondary-300);
    font-weight: var(--font-weight-semibold);
    width: 2.5rem;
    line-height: 2.5rem;
    font-size: 1.4rem;
    text-align: center;
  }

  /* Dani - bijela boja */
  .react-datepicker__day {
    width: 2.5rem;
    height: 2.5rem;
    line-height: 2.5rem;
    font-size: 1.4rem;
    margin: 0.15rem;
    text-align: center;
    border-radius: var(--border-radius-sm);
    cursor: pointer;
    transition: background-color 0.2s ease, color 0.2s ease;
    color: var(--text-primary-100); /* bijeli datumi */
  }

  .react-datepicker__day:hover {
    background-color: var(--background-surface-500);
    color: var(--text-primary-300);
  }

  .react-datepicker__day--selected,
  .react-datepicker__day--keyboard-selected {
    background-color: var(--background-surface-500);
    color: var(--text-primary-300);
  }

  .react-datepicker__day--disabled {
    color: var(--text-secondary-300);
    cursor: not-allowed;
  }

  /* Dropdown za godine */
  .react-datepicker__year-dropdown-container {
    position: static !important; /* maknemo pozicioniranje */
    max-height: none !important;
    overflow-y: visible !important;
    background-color: var(--background-secondary-500);
    color: var(--text-primary-100);
    border-radius: var(--border-radius-md);
    border: 1.5px solid var(--border-primary-300);
    box-shadow: var(--shadow-md);
    width: 100px;
    z-index: 9999;
  }

  .react-datepicker__year-read-view--down-arrow {
    right: 1rem;
    top: 0.5rem;
  }

  .react-datepicker__year-dropdown {
    background-color: var(--background-secondary-500);
    color: var(--text-primary-100);
    border-radius: var(--border-radius-md);
    padding: 0.4rem 0;
    margin: 0;
  }

  .react-datepicker__year-option {
    padding: 0.6rem 1rem;
    font-size: 1.4rem;
    cursor: pointer;
    transition: background-color 0.2s ease;
    border-radius: var(--border-radius-sm);
    color: var(--text-primary-100);
  }

  .react-datepicker__year-option:hover,
  .react-datepicker__year-option--selected_year {
    background-color: var(--background-surface-500);
    color: var(--text-primary-300);
  }

  /* Strelice navigacije: malo niže */
  .react-datepicker__navigation {
    top: 1.5rem;
  }

  .react-datepicker__navigation-icon::before {
    border-color: var(--text-primary-300);
  }

  .react-datepicker__navigation--previous {
    left: 10px;
  }

  .react-datepicker__navigation--next {
    right: 10px;
  }
`;

export { StyledDatePicker, StyledCalendarWrapper };
