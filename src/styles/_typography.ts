import { Theme } from "@mui/material/styles";

const Typography = (theme: Theme) => {
  return {
    h1: {
      fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
      fontWeight: 500,
      letterSpacing: "-1.5px",
      color: theme.palette.text.primary,
      fontSize: 40
    },
    h2: {
      fontWeight: 500,
      letterSpacing: "-0.5px",
      color: theme.palette.text.primary,
      fontSize: 32
    },
    h3: {
      fontWeight: 500,
      letterSpacing: 0,
      color: theme.palette.text.primary,
      fontSize: 24
    },
    h4: {
      fontWeight: 500,
      letterSpacing: "0.25px",
      color: theme.palette.text.primary,
      fontSize: 20
    },
    h5: {
      fontWeight: 500,
      letterSpacing: 0,
      color: theme.palette.text.primary,
      fontSize: 16
    },
    h6: {
      fontWeight: 600,
      letterSpacing: "0.15px",
      color: theme.palette.text.primary,
      fontSize: 14
    },
    subtitle1: {
      letterSpacing: "0.15px",
      color: theme.palette.text.primary
    },
    subtitle2: {
      letterSpacing: "0.1px",
      color: theme.palette.text.secondary
    },
    body1: {
      letterSpacing: "0.15px",
      color: theme.palette.text.primary
    },
    body2: {
      lineHeight: 1.5,
      letterSpacing: "0.15px",
      color: theme.palette.text.secondary
    },
    button: {
      letterSpacing: "0.3px",
      color: theme.palette.text.primary
    },
    caption: {
      letterSpacing: "0.4px",
      color: theme.palette.text.secondary
    },
    overline: {
      letterSpacing: "1px",
      color: theme.palette.text.secondary
    }
  };
};

export default Typography;
