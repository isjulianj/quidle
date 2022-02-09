import {createTheme} from '@mui/material/styles';
import {red} from '@mui/material/colors';

// A custom theme
export const theme = createTheme({
    palette: {
        primary: {
            main: '#556cd6',
        },
        secondary: {
            main: '#19857b',
        },
        error: {
            main: red.A400,
        },
    },
    typography: {
        fontFamily: ['Euclid Circular A', "Helvetica", "Arial", "sans-serif"].join(','),
    },
});
