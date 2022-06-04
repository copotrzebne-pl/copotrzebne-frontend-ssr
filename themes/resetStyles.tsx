import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  html {
    position: relative;
    margin: 0;
    text-size-adjust: 100%;
    scroll-behavior: smooth;
    box-sizing: border-box;
  }

  body {
    margin: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  *::before,
  *::after {
    box-sizing: inherit;
  }

  * {
    box-sizing: border-box;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
  }

  #__next {
    position: relative; /* needed for footer positioning*/
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    height: auto !important; /* real browsers */
    height: 100%; /* IE6: treaded as min-height*/

    min-height: 100%; /* real browsers */
  }

  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  main,
  menu,
  nav,
  section,
  summary {
    display: block;
  }

  audio,
  canvas,
  progress,
  video {
    display: inline-block;
    vertical-align: baseline;
  }

  audio:not([controls]) {
    display: none;
    height: 0;
  }

  [hidden],
  template {
    display: none;
  }

  * {
    &:active, &:hover, &:focus {
        outline: none;
    }
  }

  a {
    color: #000000;
    text-decoration: none;
    background-color: transparent;
    transition: color 0.2s ease-in-out;
    &:hover {
        color: #000000;
    }
  }

  input:-webkit-autofill {
    color: #000000 !important;
    background-color: unset;
    box-shadow: 0 0 0px 1000px #ffffff inset;
  }

  input::-ms-clear, input::-ms-reveal {
    display: none;
  }

  ul {
    margin-top: 0;
    margin-bottom: 0;
    padding-left: 0;

    list-style-type: none;

    /* stylelint-disable */
    -webkit-margin-before: 0em;
    -webkit-margin-after: 0em;
    -webkit-margin-start: 0px;
    -webkit-margin-end: 0px;
    -webkit-padding-start: 0px;
    /* stylelint-enable */
  }

  p, h1, h2, h3, h4, h5, h6 {
    margin-top: 0;
    margin-bottom: 0;
    /* stylelint-disable */
    -webkit-margin-before: 0em;
    -webkit-margin-after: 0em;
    /* stylelint-enable */
  }

  abbr[title] {
    border-bottom: 1px dotted;
  }

  b,
  strong {
    font-weight: 600;
  }

  dfn {
    font-style: italic;
  }

  mark {
    color: inherit;
    background: #ff0;
  }

  small {
    font-size: 80%;
  }

  sub,
  sup {
    position: relative;
    font-size: 75%;
    line-height: 0;
    vertical-align: baseline;
  }

  sup {
    top: -0.5em;
  }

  sub {
    bottom: -0.25em;
  }

  img {
    border: 0;
  }

  svg:not(:root) {
    overflow: hidden;
  }

  figure {
    margin: 0;
  }

  hr {
    box-sizing: content-box;
    height: 0;
  }

  pre {
    overflow: auto;
  }


  code,
  kbd,
  pre,
  samp {
    font-size: 1em;
    font-family: monospace;
  }

  button,
  input,
  optgroup,
  select,
  textarea {
    margin: 0;
    color: inherit;
    font: inherit;
  }

  button {
    overflow: visible;
    border: none;
  }

  button,
  select {
    text-transform: none;
  }

  button,
  html input[type="button"],
  input[type="reset"],
  input[type="submit"] {
    cursor: pointer;
    appearance: button;
  }

  button[disabled],
  html input[disabled] {
    cursor: default;
  }

  button::-moz-focus-inner,
  input::-moz-focus-inner {
    padding: 0;
    border: 0;
  }

  input {
    line-height: normal;
  }

  input[type="checkbox"],
  input[type="radio"] {
    box-sizing: border-box;
    padding: 0;
  }

  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    height: auto;
  }

  input[type="search"] {
    box-sizing: content-box;
    appearance: textfield;
  }

  input[type="search"]::-webkit-search-cancel-button,
  input[type="search"]::-webkit-search-decoration {
    appearance: none;
  }

  fieldset {
    margin: 0 2px;
    padding: 0.35em 0.625em 0.75em;
    border: none;
  }

  legend {
    padding: 0;
    border: 0;
  }

  textarea {
    overflow: auto;
  }

  optgroup {
    font-weight: 600;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  td,
  th {
    padding: 0;
  }
`
