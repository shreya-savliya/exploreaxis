import { createTheme } from "@mui/material";
import { colors } from "./colors";

const typographyOptions = {
  fontFamily: "El Messiri, Raleway, sans-serif",

  h1: {
    fontFamily: "El Messiri",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 20,
    lineHeight: "31px",
    color: colors.basics.black,
  },
  h2: {
    fontFamily: "El Messiri",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 18,
    lineHeight: "28px",
    color: colors.basics.black,
  },
  h3: {
    fontFamily: "El Messiri",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 16,
    lineHeight: "25px",
    color: colors.basics.black,
  },
  h4: {
    fontFamily: "El Messiri",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 14,
    lineHeight: "22px",
    color: colors.basics.black,
  },
  body1: {
    fontFamily: "Raleway",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 16,
    lineHeight: "19px",
    color: colors.basics.black,
  },
  body2: {
    fontFamily: "Raleway",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 14,
    lineHeight: "16px",
    color: colors.basics.black,
  },
  subtitle1: {
    fontFamily: "Raleway",
    fontStyle: "normal",
    fontWeight: 700,
    fontSize: 16,
    lineHeight: "19px",
    color: colors.basics.black,
  },
  subtitle2: {
    fontFamily: "Raleway",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: 14,
    lineHeight: "140%",
    color: colors.basics.black,
  },
};

const palette = {
  primary: {
    main: colors.basics.primary,
  },
  secondary: {
    main: colors.basics.secondary,
  },
};

const componentOptions = {
  MuiSlider: {
    defaultProps: {
      color: "primary",
    },
    styleOverrides: {
      rail: {
        boxShadow: "inset 0px 4px 4px rgba(0, 0, 0, 0.25)",
        background: colors.basics.secondary,
      },
      track: {
        color: colors.basics.primary,
      },
      thumb: {
        color: colors.basics.primary,
      },
    },
  },
  MuiButton: {
    defaultProps: {
      variant: "contained",
      color: "primary",
    },
    styleOverrides: {
      root: {
        boxSizing: "border-box",
        borderRadius: 5,
        textTransform: "none",
      },
      contained: ({ theme }) => ({
        boxShadow: theme.shadows[0],
        fontFamily: "Raleway",
        fontStyle: "normal",
        fontWeight: 500,
        fontSize: "16px",
        lineHeight: "130%",
        padding: "14px 23px",
        "&:hover": {
          boxShadow: theme.shadows[0],
        },
        "&:disabled": {
          background: colors.grey[20],
          color: colors.grey[30],
        },
      }),
      outlined: ({ theme }) => ({
        boxShadow: theme.shadows[0],
        fontFamily: "Raleway",
        fontStyle: "normal",
        fontSize: "16px",
        lineHeight: "130%",
        textTransform: "none",
        padding: "14px 23px",
        fontWeight: 500,
        "&:hover": {
          boxShadow: theme.shadows[0],
        },
        "&:disabled": {
          background: colors.basics.white,
          color: colors.grey[10],
        },
      }),
      text: ({ theme }) => ({
        boxShadow: theme.shadows[0],
        fontFamily: "Raleway",
        fontStyle: "normal",
        fontSize: "16px",
        lineHeight: "130%",
        textTransform: "none",
        padding: "14px 25px",
        fontWeight: 500,
        "&:hover": {
          boxShadow: theme.shadows[0],
        },
      }),
      containedPrimary: ({ theme }) => ({
        backgroundColor: colors.basics.primary,
        border: "1px solid",
        ":hover": {
          background: colors.basics.primary,
        },
      }),
      containedSecondary: ({ theme }) => ({
        backgroundColor: colors.grey[30],
        color: colors.basics.secondary,
        ":hover": {
          backgroundColor: colors.grey[30],
        },
      }),
      outlinedPrimary: ({ theme }) => ({
        backgroundColor: colors.basics.secondary,
        color: colors.basics.primary,
        border: `1px solid ${colors.basics.primary}`,
        ":hover": {
          backgroundColor: colors.basics.secondary,
          border: `1px solid ${colors.basics.primary}`,
        },
      }),
      outlinedSecondary: ({ theme }) => ({
        backgroundColor: colors.basics.white,
        color: colors.grey[10],
        border: `2px solid ${colors.grey[10]}`,
        ":hover": {
          backgroundColor: colors.basics.white,
          border: `2px solid ${colors.grey[10]}`,
        },
      }),
      textPrimary: ({ theme }) => ({
        color: colors.basics.primary,
        ":hover": {
          backgroundColor: colors.basics.transparent,
          color: colors.basics.primary,
        },
      }),
    },
  },
  MuiTextField: {
    styleOverrides: {
      root: ({ theme }) => ({
        width: "100%",
        maxHeight: "52.8px",
        height: "100%",
        "& fieldset": {
          maxHeight: "52.8px",
          height: "100%",
        },
        "& label.Mui-focused": {
          color: "#4B69CF",
          fontWeight: 400,
          fontSize: 15,
        },
        "& .MuiInput-underline:after": {
          borderBottomColor: colors.grey[30],
        },
        "input::-webkit-outer-spin-button": {
          "-webkit-appearance": "none",
          margin: 0,
        },
        "input::-webkit-inner-spin-button": {
          "-webkit-appearance": "none",
          margin: 0,
        },
        "input[type=number]": {
          "-moz-appearance": "textfield",
        },

        "&.MuiOutlinedInput-root": {
          "& fieldset": {
            borderWidth: 1,
            borderColor: colors.grey[30],
            borderRadius: 5,
          },
          "&:hover fieldset": {
            borderColor: colors.grey[30],
          },
          "&.Mui-focused fieldset": {
            borderWidth: 1,
            borderColor: colors.grey[30],
          },
        },
      }),
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: ({ theme }) => ({
        "&.MuiOutlinedInput-root": {
          maxHeight: "52.8px",
          height: "100%",
          "& fieldset": {
            borderWidth: 1,
            borderColor: colors.grey[30],
            borderRadius: 5,
            maxHeight: "52.8px",
            height: "100%",
            top: "-3px",
          },
          "&:hover fieldset": {
            borderColor: colors.grey[30],
          },
          "&.Mui-focused fieldset": {
            borderWidth: 1,
            borderColor: colors.grey[30],
          },
        },
      }),
    },
  },
  MuiMenu: {
    styleOverrides: {
      root: ({ ownerState, theme }) => ({
        "& .MuiMenu-paper": {
          boxShadow: "none",
          maxHeight: "100% !important",
        },
        "& .MuiMenu-list": {
          boxShadow: "none",
          background: colors.basics.white,
          border: `1px solid ${colors.grey[30]}`,
          borderRadius: "5px",
          paddingTop: "22px",
          paddingBottom: "22px",
          paddingLeft: "16px",
          paddingRight: "16px",
          "& li": {
            paddingRight: 0,
            paddingLeft: 0,
          },
        },
      }),
    },
  },
  MuiMenuItem: {
    styleOverrides: {
      root: ({ ownerState, theme }) => ({
        background: `${colors.basics.transparent} !important`,
        "&:hover": {
          background: colors.basics.transparent,
        },
        "&.Mui-selected:hover": {
          background: colors.basics.transparent,
        },
        "&.Mui-selected": {
          background: colors.basics.transparent,
        },
        "&.Mui-focusVisible": {
          background: colors.basics.transparent,
        },
      }),
    },
  },
  MuiCheckbox: {
    styleOverrides: {
      root: ({ ownerState, theme }) => ({
        padding: 0,
        paddingRight: "24px",
        color: colors.grey[30],
        "&.Mui-checked": {
          color: colors.basics.primary,
        },
      }),
    },
  },
  MuiDialog: {
    styleOverrides: {
      paper: {
        backgroundColor: colors.basics.secondary,
        borderRadius: 0,
        borderWidth: 1,
        borderColor: colors.basics.primary,
        borderStyle: "solid",
        padding: "20px",
      },
    },
  },
  MuiRating: {
    styleOverrides: {
      root: ({ theme }) => ({
        "& .MuiRating-iconFilled": {
          color: colors.basics.black,
        },
        "& .MuiRating-iconHover": {
          color: colors.basics.black,
        },
      }),
    },
  },
  MuiTabs: {
    styleOverrides: {
      root: ({ theme }) => ({
        background: colors.basics.lightmain,
        height: "76px",
        alignItems: "flex-end",
        paddingLeft: "8px",
        paddingRight: "8px",
        "& #tabText": {
          color: colors.grey[10],
          height: "100%",
        },
        "& .Mui-selected": {
          backgroundColor: colors.basics.white,
          "& #tabText": {
            borderBottom: `5px solid ${colors.basics.primary}`,
          },
        },
        "& .MuiTabs-indicator": {
          display: "none",
        },
        "& .MuiButtonBase-root": {
          height: "68px",
          textTransform: "capitalize",
          paddingTop: "22px",
          paddingBottom: 0,
          paddingLeft: "39px",
          paddingRight: "39px",
          "&:hover": {
            backgroundColor: colors.basics.white,
            "& #tabText": {
              borderBottom: `5px solid ${colors.basics.primary}`,
              transition: "border .2s ease-in-out",
            },
          },
        },
      }),
    },
  },
};

let lightTheme = createTheme({
  components: componentOptions,
  typography: typographyOptions,
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 992,
      lg: 1024,
      xl: 1200,
      xxl: 1536,
    },
  },
  palette,
});

export { lightTheme };
