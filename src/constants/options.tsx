import { TABLE_GROUPS } from "@/app/_mocks/datatableeg";

export const options = TABLE_GROUPS.map((group) => ({
  value: `${group.parentClient} - ${group.nif}`,
  label: `${group.parentClient} - ${group.nif}`
}));
