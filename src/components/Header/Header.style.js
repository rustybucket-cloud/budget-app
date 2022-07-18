import { css } from "@emotion/react"

export default {
  container: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  header: (xl, spacer) => css`
    display: flex;
    justify-content: space-between;
    flex-basis: 1;
    align-items: center;
    max-width: ${xl}px;
    margin: auto;
    padding: ${spacer};

    h1 {
      width: 100%;
    }
  `,
  menuButton: (mediaQuery) => css`
    display: none;
    ${mediaQuery} {
      display: block;
    }
  `,
  li: ({spacer}) => css`
    padding: ${spacer};
  `,
  ul: css`
    list-style-type: none;
    display: flex;
  `,
  nav: (mediaQuery) => css`
    display: none;
    ${mediaQuery} {
      width: 100%;
      display: flex;
      justify-content: flex-end;
    }
  `,
}


/* @media screen and (min-width: 650px) {
    header {
        display: flex;
        justify-content: space-between;
        flex-basis: 1;
        align-items: center;
    }
    header div {
        width: 100%;
    }
    header nav {
        width: 100%;
    }
    nav ul {
        justify-content: flex-end;
        align-items: center;
    }
    nav ul li {
        padding: 1em;
    }
    header i::before {
        display: none;
    }
}
@media screen and (max-width: 649px) {
    nav {
      position: absolute;
      right:0;
      top: 0; 
      background-color: aquamarine;
      height: 100vh;
      z-index: 1;
      width: 0;
      transition: width 1s;
      display: none;
    }
    nav i {
      text-align: left;
      width: 100%;
      padding-left: .5em;
      padding-top: .5em;
      font-size: 2em;
    }
    nav ul {
      padding: .5em;
      width: 100%;
      list-style-type: none;
      font-size: 1.5em;
      flex-direction: column;
    }
    nav li {
      border-bottom: 1px solid black;
      width: 100%;
      padding: .5em;
      white-space: nowrap;
    }
    nav li:hover {
      color: white;
    }

    .open {
        right: 0;
        width: 75vw;
        transition: width 1s;
        display: flex;
      }
      .slide {
        transform: translateX(-75vw);
        transition: transform 1s;
      }
      .slideBack {
        transform: translateX(0);
        transition: transform 1s;
      }
} */