"use client";

import { Box, Typography } from "@mui/material";

export const HomePage = () => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start"
      }}
    >
      <Typography variant="h5" mb={3}>
        Hi, Welcome back 👋
      </Typography>
    </Box>
  );
};
