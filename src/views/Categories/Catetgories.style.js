import { css } from "@emotion/react"

export default {
    addCategoryButton: ({ color }) => css`
        background-color: ${color};
    `,
    availableAmount: css`
        text-align: right;
    `,
    availableBar: ({ percentage, spacer, color }) => css`
        width: ${percentage * 100}%; 
        background-color: ${percentage * 100 > 0 ? color.green : color.red};
        padding: ${spacer};
    `,
    bar: css`
        width: 100%;
        background-color: gray;
    `,
    cards: ({ gap }) => css`
        display: grid;
        gap: ${gap};
        padding-bottom: ${gap};
    `,
    category: ({ spacer, color }) => css`
        boxShadow: 0 0 10px 2px rgba(0, 0, 0, .5);
        marginTop: ${spacer};
        padding: ${spacer};
        backgroundColor: ${color};
    `,
    categoryContainer: css`
        display: flex;
        gap: 8px;
        align-items: center;
    `,
    deleteButton: css`
        animation: grow 2s ease-out;
        overflow: hidden;
        max-width: 100px;
        
        @keyframes grow {
            0% {
                width: 0px;
            }
            100% {
                width: 100%;
            }
        }
    `,
    formButton: css`
        width: 40px;
        height: 40px;
        margin-right: 12px;
    `,
    formContent: (spacer) => css`
        display: grid;
        gap: ${spacer};
        padding-top: ${spacer} !important;
        min-width: 600px;
        .MuiInputBase-root, .MuiFormControl-root {
            width: 100%;
        }
        label {
            z-index: 999;
        }
    `,
    formHeader: css`
        display: flex;
        justify-content: space-between;
        align-items: center;
    `,
    info: ({ spacer }) => css`
        display: flex;
        justify-content: space-between;
        width: 100%;
        padding: ${spacer};
    `,
    topSection: ({ color }) => css`
        display: flex;
        justify-content: space-between;
        h1 { color: ${color}; }
    `,
}