export interface TabItemProps {
  label: string;
  value: number;
  iconStart?: React.ElementType;
  content: React.ReactNode;
}

export interface TabsProps {
  tabs: TabItemProps[];
}
