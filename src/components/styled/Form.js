/** @jsxRuntime classic */
/** @jsx jsx */
import { Dialog, DialogContent, DialogTitle, DialogContentText, useTheme } from "@mui/material";
import { jsx, css } from "@emotion/react"

const content = (spacer) => css`
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
`

export default function DialogForm({ title, description, children, ...props }) {
    const theme = useTheme()
    return (
        <Dialog {...props}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent css={content(theme.spacing(2))}>
                { description && <DialogContentText>{description}</DialogContentText>}
                { children }
            </DialogContent>
        </Dialog>
    )
}