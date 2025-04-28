import { createTheme } from "@mui/material";

// Define the light theme
export const getLightTheme = () => createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: "#724f33",  // Logo foreground color
            light: "#8a6547",
            dark: "#5a3e28",
        },
        secondary: {
            main: "#f3ebdc",  // Logo background color
            light: "#f8f3ea",
            dark: "#e5dbc8", 
        },
        error: {
            main: "#d32f2f",
            light: "#ef5350",
        },
        success: {
            main: "#2e7d32",
            light: "#4caf50",
        },
        background: {
            default: "#faf7f2",  // Lighter version of the logo background
            paper: "#ffffff",
        },
        text: {
            primary: "#3a2816",  // Darker brown for text
            secondary: "#6b5440",
        },
    },
    typography: {
        fontFamily: "'Raleway', 'Montserrat', 'Roboto', sans-serif", // Using Raleway as the main font - better for real estate
        h1: {
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
        },
        h2: {
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            fontSize: "3.5rem",
        },
        h3: {
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            fontSize: "2.5rem",
        },
        h4: {
            fontFamily: "'Playfair Display', serif",
            fontWeight: 600,
        },
        h5: {
            fontFamily: "'Playfair Display', serif",
            fontWeight: 600,
            letterSpacing: "0.02em",
        },
        h6: {
            fontFamily: "'Playfair Display', serif",
            fontWeight: 600,
        },
        subtitle1: {
            lineHeight: 1.8,
            letterSpacing: "0.01em",
        },
        body1: {
            lineHeight: 1.7,
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    textTransform: "none",
                    fontWeight: 600,
                    padding: "12px 24px",
                    transition: "all 0.3s ease-in-out",
                    letterSpacing: "0.03em",
                    position: "relative",
                    overflow: "hidden",
                    "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        opacity: 0,
                        transition: "opacity 0.3s ease-in-out",
                        background: "rgba(255, 255, 255, 0.1)",
                    },
                    "&:hover::before": {
                        opacity: 1,
                    },
                },
                containedPrimary: {
                    backgroundImage: "linear-gradient(135deg, #8a6547 0%, #724f33 70%, #5a3e28 100%)",
                    boxShadow: "0 4px 12px rgba(114, 79, 51, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.25)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    "&:hover": {
                        boxShadow: "0 6px 16px rgba(114, 79, 51, 0.45), inset 0 1px 1px rgba(255, 255, 255, 0.3)",
                        transform: "translateY(-2px)",
                        backgroundImage: "linear-gradient(135deg, #9a7557 0%, #825f43 70%, #6a4e38 100%)",
                    },
                    "&:active": {
                        boxShadow: "0 2px 8px rgba(114, 79, 51, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.2)",
                        transform: "translateY(1px)",
                    },
                },
                containedSecondary: {
                    backgroundImage: "linear-gradient(135deg, #f8f3ea 0%, #f3ebdc 70%, #e5dbc8 100%)",
                    boxShadow: "0 4px 12px rgba(243, 235, 220, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.35)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    color: "#6b5440",
                    "&:hover": {
                        boxShadow: "0 6px 16px rgba(243, 235, 220, 0.45), inset 0 1px 1px rgba(255, 255, 255, 0.4)",
                        transform: "translateY(-2px)",
                        backgroundImage: "linear-gradient(135deg, #fcf9f3 0%, #f8f3ea 70%, #f3ebdc 100%)",
                    },
                    "&:active": {
                        boxShadow: "0 2px 8px rgba(243, 235, 220, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.3)",
                        transform: "translateY(1px)",
                    },
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    borderRadius: 6,
                    fontSize: "0.95rem",
                    height: "36px",
                    transition: "all 0.25s ease-in-out",
                    border: "1px solid rgba(243, 235, 220, 0.25)",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.03)",
                    padding: "0 12px",
                    "&:hover": {
                        transform: "translateY(-1px)",
                        boxShadow: "0 3px 6px rgba(0, 0, 0, 0.06)",
                    },
                },
                filled: {
                    backgroundImage: "linear-gradient(to bottom, rgba(255,255,255,0.15), rgba(0,0,0,0.05))",
                    "&:hover": {
                        backgroundImage: "linear-gradient(to bottom, rgba(255,255,255,0.25), rgba(0,0,0,0.03))",
                    },
                },
                outlined: {
                    background: "rgba(255, 255, 255, 0.6)",
                    backdropFilter: "blur(8px)",
                    "&:hover": {
                        background: "rgba(255, 255, 255, 0.8)",
                    },
                },
                filledPrimary: {
                    backgroundImage: "linear-gradient(135deg, #8a6547 0%, #724f33 100%)",
                    border: "1px solid rgba(114, 79, 51, 0.1)",
                },
                filledSecondary: {
                    backgroundImage: "linear-gradient(135deg, #f8f3ea 0%, #f3ebdc 100%)",
                    border: "1px solid rgba(243, 235, 220, 0.1)",
                    color: "#6b5440",
                },
                outlinedPrimary: {
                    borderColor: "rgba(114, 79, 51, 0.5)",
                    "&:hover": {
                        borderColor: "#724f33",
                    },
                },
                outlinedSecondary: {
                    borderColor: "rgba(243, 235, 220, 0.5)",
                    "&:hover": {
                        borderColor: "#f3ebdc",
                    },
                },
                deleteIcon: {
                    color: "inherit",
                    opacity: 0.7,
                    "&:hover": {
                        opacity: 1,
                    },
                },
                label: {
                    fontWeight: 500,
                    padding:0,
                    paddingLeft: 10,
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    boxShadow: '0 4px 20px rgba(114, 79, 51, 0.1)',
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    boxShadow: '0 8px 40px rgba(114, 79, 51, 0.08)',
                    transition: 'box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out',
                }
            },
        },
        MuiModal: {
            styleOverrides: {
                backdrop: {
                    backgroundColor: 'rgba(58, 40, 22, 0.8)',
                },
            },
        },
    },
});
