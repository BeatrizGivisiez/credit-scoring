"use client";

import dynamic from "next/dynamic";
import { Box } from "@mui/material";

// Importa `PowerBIEmbed` dinamicamente, sem SSR
const PowerBIEmbed = dynamic(() => import("powerbi-client-react").then((mod) => mod.PowerBIEmbed), {
  ssr: false
});

// Importa `models` dinamicamente, sem SSR
const loadModels = async () => {
  const mod = await import("powerbi-client");
  return mod.models;
};

export const PowerBI = async () => {
  const models = await loadModels();

  return (
    <Box>
      <PowerBIEmbed
        embedConfig={{
          type: "report",
          id: "a7ab29a3-02c7-4c45-81a8-e756e9897d79",
          embedUrl:
            "https://app.powerbi.com/reportEmbed?reportId=a7ab29a3-02c7-4c45-81a8-e756e9897d79&groupId=80341867-c2f8-41d8-8c92-ed42fd7dccc2",
          accessToken: "your-access-token-here",
          tokenType: models.TokenType.Aad, // Certifique-se de que isso funciona após o dynamic
          settings: {
            panes: {
              filters: {
                expanded: false,
                visible: true
              }
            }
          }
        }}
        eventHandlers={
          new Map([
            [
              "loaded",
              function () {
                console.log("Report loaded");
              }
            ],
            [
              "rendered",
              function () {
                console.log("Report rendered");
              }
            ],
            [
              "error",
              function (event) {
                if (event) {
                  console.log(event.detail);
                } else {
                  console.log("Event is undefined");
                }
              }
            ]
          ])
        }
        cssClassName={"Embed-container"}
        getEmbeddedComponent={(embeddedReport) => {
          window.report = embeddedReport;
        }}
      />
    </Box>
  );
};
