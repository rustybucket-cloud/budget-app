import { css } from "@emotion/react";

export default {
    background: (color) => css`
        background-color: ${color};
        position: absolute;
        inset: 0;
        display: grid;
    `,
    card: css`
        max-width: 1000px;
        width: 100%;
        margin: auto;
        transition: height 1s !important;
    `,
    form: (spacer) => css`
        display: grid;
        gap: ${spacer};
    `,
    header: (color) => css`
        color: ${color};
    `,
    links: (spacer) => css`
        padding-top: ${spacer};
        display: grid;
    `
}