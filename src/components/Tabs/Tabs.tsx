"use client";

import "./styles.css";

import { Tab, TabPanel, Tabs as MuiTabs, TabsList } from "@mui/base";
import { useState } from "react";

import { TabItemProps } from "./types";

import PALETTE from "@/styles/_palette";

export const Tabs = ({ tabs }: { tabs: TabItemProps[] }) => {
  const [activeTab, setActiveTab] = useState(tabs[0]?.value || 0);

  const handleChange = (event: any, newValue: any) => {
    setActiveTab(newValue);
  };

  return (
    <MuiTabs value={activeTab} onChange={handleChange}>
      <TabsList className="tabsListStyles">
        {tabs.map((tab) => (
          <Tab
            key={tab.value}
            value={tab.value}
            className={`tabStyles ${activeTab === tab.value ? "activeTab" : ""}`}
          >
            {tab.iconStart && <tab.iconStart weight="regular" size={24} color={PALETTE.WHITE} />}
            {tab.label}
          </Tab>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabPanel key={tab.value} value={tab.value} className="tabPanelStyles">
          {tab.content}
        </TabPanel>
      ))}
    </MuiTabs>
  );
};
