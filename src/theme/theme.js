import { createTheme } from "@mui/material/styles";
import { blue, blueGrey } from "@mui/material/colors";

export const theme = createTheme({
    palette: {
        primary: {
            main: '#60DB90',
            light: '#75E68B',
        },
        secondary: {
            main: '#4CC2BC',
        },
        red: {
            main: '#DE3C35',
        },
        black: {
            main: '#121212'
        },
        blue: {
            main: blue[500],
            light: blue[300],
            dark: blue[700]
        },
        grey: {
            main: blueGrey[300]
        },
        accent: {
            main: '#ffffff'
        },
    },
    spacing: [0, 4, 8, 16, 32, 64],
});
