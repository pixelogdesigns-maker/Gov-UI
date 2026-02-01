import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        h1: { fontWeight: 700, fontFamily: '"Poppins", sans-serif' },
        h2: { fontWeight: 700, fontFamily: '"Poppins", sans-serif' },
        h3: { fontWeight: 600, fontFamily: '"Poppins", sans-serif' },
        h4: { fontWeight: 600, fontFamily: '"Poppins", sans-serif' },
        h5: { fontWeight: 600, fontFamily: '"Poppins", sans-serif' },
        h6: { fontWeight: 600, fontFamily: '"Poppins", sans-serif' },
        button: { textTransform: 'none', fontWeight: 600 },
    },
    palette: {
        primary: {
            main: '#2563eb', // Modern Vibrant Blue
            light: '#60a5fa',
            dark: '#1e40af',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#0ea5e9', // Sky Blue
            light: '#38bdf8',
            dark: '#0284c7',
            contrastText: '#ffffff',
        },
        background: {
            default: '#f8fafc', // Slate-50 custom
            paper: '#ffffff',
        },
        text: {
            primary: '#1e293b', // Slate-800
            secondary: '#64748b', // Slate-500
        },
    },
    shape: {
        borderRadius: 12, // More rounded corners for modern feel
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    boxShadow: 'none',
                    borderRadius: '8px',
                    padding: '10px 24px',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                        transform: 'translateY(-1px)',
                    },
                },
                containedPrimary: {
                    background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                    boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)', // Subtle Tailwind-like shadow
                    '&.MuiElevation1': {
                        boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
                    },
                    '&.MuiElevation2': {
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                    },
                    '&.MuiElevation3': {
                        boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
                    }
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        transition: 'all 0.2s',
                        '&:hover fieldset': {
                            borderColor: '#2563eb',
                        },
                        '&.Mui-focused fieldset': {
                            borderWidth: '2px',
                        },
                    },
                },
            },
        },
        MuiTableCell: {
            styleOverrides: {
                head: {
                    fontWeight: 600,
                    backgroundColor: '#f1f5f9',
                    color: '#334155',
                },
            },
        },
    },
});

export default theme;
