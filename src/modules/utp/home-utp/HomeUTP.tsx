"use client";

import { Box, Card } from "@mui/material";
import { homeutp__box, homeutp__card } from "./styles";

export const HomeUTP = () => {
  return (
    <Box sx={homeutp__box}>
      <Card sx={homeutp__card}>
        <iframe
          title="Power BI Report"
          width="1080"
          height="730"
          src="https://app.powerbi.com/view?r=eyJrIjoiNzFkNDE1MzEtZjlkZS00NjdhLTgxNzktMjg3NzZjOWQwM2E0IiwidCI6ImUyY2RjZjQ2LWFiMzItNDdhZS1iZTc0LTNlMjFhZjNhNzU2YSJ9"
          frameBorder="0"
          allowFullScreen={true}
        ></iframe>
      </Card>
    </Box>
  );
};
