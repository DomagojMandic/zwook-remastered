import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Roboto+Mono:ital,wght@0,100..700;1,100..700&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap');

:root {
  /* Background */
  --background-primary-100: #181c27;
  --background-primary-300: #131722;
  --background-primary-500: #0d121c; // MAIN 
  --background-secondary-100: #353945;
  --background-secondary-300: #2c313a;
  --background-secondary-500: #252a33; // MAIN 
  --background-surface-300:rgb(238, 203, 64);
  --background-surface-500: #efcc44; // MAIN 

  /* Text */
  --text-primary-100: #f5f7fa;
  --text-primary-300: #eef2f6; // MAIN 
  --text-secondary-100: #bfc7d1;
  --text-secondary-300: #9aa3b2; // MAIN 
  --text-dark-500: #0d121c;
  --text-neutral-500: #fcfcfd;
  --text-invert-500: #121926;
  --text-brand-500: rgba(82, 139, 255, 1 );

  /* Online status */
  --status-online: rgba(23, 178, 106, 1);
  --status-offline: rgba(240,68, 56,1);
  --status-background: #413f3acc;

  /* Border */
  --border-primary-300: #4a4d55; // MAIN 
  --border-primary-100: #6a6d75;
  --border-primary-lighter-500: #364152;

  /* Surface */
  --surface-primary-active-500: #3d4149;

  --backdrop-color: rgba(255, 255, 255, 0.1);

  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.04);
  --shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.12);

  --border-radius-tiny: 3px;
  --border-radius-sm: 5px;
  --border-radius-md: 7px;
  --border-radius-lg: 9px;

  /* For dark mode */
  --image-grayscale: 0;
  --image-opacity: 100%;

  /* Font */
  --font-main: "Roboto", sans-serif;
  --font-size-base: 1.6rem;
  --font-weight-normal: 400;
  --font-weight-semibold: 500;
  --font-weight-bold: 700;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;

  /* Creating animations for dark mode */
  transition: background-color 0.3s, border 0.3s;
}

html {
  font-size: 62.5%;
}

body {
  font-family: var(--font-main);
  color: var(--color-grey-700);
  letter-spacing: 0.03em; /* Added small letter spacing */

  transition: color 0.3s, background-color 0.3s;
  min-height: 100vh;
  line-height: 1.5;
  font-size: 1.6rem;
}

input,
button,
textarea,
select {
  font: inherit;
  color: inherit;
}

button {
  cursor: pointer;
}

*:disabled {
  cursor: not-allowed;
}

select:disabled,
input:disabled {
  background-color: var(--color-grey-200);
  color: var(--color-grey-500);
}

input:focus,
button:focus,
textarea:focus,
select:focus {
  outline: 2px solid var(--color-brand-600);
  outline-offset: -1px;
}

/* Parent selector */
button:has(svg) {
  line-height: 0;
}

a {
  color: inherit;
  text-decoration: none;
}

ul {
  list-style: none;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
  hyphens: auto;
}

img {
  max-width: 100%;

  /* For dark mode */
  filter: grayscale(var(--image-grayscale)) opacity(var(--image-opacity));
}

`;

export default GlobalStyles;
