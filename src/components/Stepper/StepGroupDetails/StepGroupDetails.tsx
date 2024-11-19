//src/components/Stepper/StepGroupDetais/StepGroupDetails.tsx
"use client";

import { FormControl, Grid } from "@mui/material";
import { InputText, InputSelect } from "@/components";
import { Dispatch, SetStateAction } from "react";
import { EntitySelectOption } from "@/hooks/entity/useEntitySelect";

interface StepGroupDetailsProps {
  groupName: string;
  parentGroup: string | undefined;
  setParentGroup: Dispatch<SetStateAction<string>>;
  entitySelect: EntitySelectOption[];
  loading: boolean;
  handleGroupNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export const StepGroupDetails = ({
  groupName,
  parentGroup,
  setParentGroup,
  entitySelect,
  loading,
  handleGroupNameChange
}: StepGroupDetailsProps) => (
  <Grid container>
    <FormControl fullWidth sx={{ mt: 5 }}>
      <InputText
        id="nome-grupo"
        label="Nome do Grupo"
        value={groupName}
        onChange={handleGroupNameChange}
      />
    </FormControl>
    <FormControl fullWidth sx={{ mt: 3 }}>
      <InputSelect
        loading={loading}
        options={entitySelect}
        value={parentGroup}
        onChange={(e) => setParentGroup(e)}
        label="Indique a Entidade-Mãe do Grupo"
      />
    </FormControl>
  </Grid>
);
