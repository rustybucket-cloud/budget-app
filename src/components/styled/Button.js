import { Button as MuiButton, styled } from "@mui/material";

export default styled(MuiButton)`
    width: 100%;
    max-width: 250px;
    @media only screen and (max-width: 860px) {
        max-width: auto;
    }
`