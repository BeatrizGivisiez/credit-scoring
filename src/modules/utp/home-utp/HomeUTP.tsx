"use client";

import { Box, Card } from "@mui/material";
import { homeutp__box, homeutp__card } from "./styles";

import { PowerBIEmbed } from "powerbi-client-react";
import { models } from "powerbi-client";

export const HomeUTP = () => {
  return (
    <Box sx={homeutp__box}>
      <Card sx={homeutp__card}>
        <PowerBIEmbed
          embedConfig={{
            type: "report", // Tipo do conteúdo embutido
            id: "b2e49b01-2356-4456-bfb9-3f4c2bc4ddbd", // ID do relatório
            embedUrl:
              "https://app.powerbi.com/reportEmbed?reportId=b2e49b01-2356-4456-bfb9-3f4c2bc4ddbd&groupId=<groupId>", // URL de embed
            accessToken:
              "eyJrIjoiNzFkNDE1MzEtZjlkZS00NjdhLTgxNzktMjg3NzZjOWQwM2E0IiwidCI6ImUyY2RjZjQ2LWFiMzItNDdhZS1iZTc0LTNlMjFhZjNhNzU2YSJ9", // Token de acesso
            tokenType: models.TokenType.Embed, // Tipo de token
            settings: {
              panes: {
                filters: {
                  expanded: false,
                  visible: false
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
                    console.log("An unknown error occurred.");
                  }
                }
              ],
              ["visualClicked", () => console.log("visual clicked")],
              [
                "pageChanged",
                function (event) {
                  if (event) {
                    console.log(event); // Garante que o evento existe
                  } else {
                    console.log("No event data provided.");
                  }
                }
              ]
            ])
          }
          // cssClassName={"w-full h-full rounded-lg shadow-lg bg-white dark:bg-gray-800 p-4"}
          cssClassName={
            "w-full h-[600px] md:w-3/4 lg:w-1/2 rounded-lg shadow-lg bg-white dark:bg-gray-800 p-4"
          }
          getEmbeddedComponent={(embeddedReport) => {
            window.report = embeddedReport;
          }}
        />
      </Card>
    </Box>
  );
};
