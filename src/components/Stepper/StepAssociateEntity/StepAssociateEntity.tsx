"use client";

import { Card, InputSelect, InputText, TableAssociateEntity } from "@/components";
import PALETTE from "@/styles/_palette";
import { Box, FormControl, Grid, Typography } from "@mui/material";

import { stepper__1step } from "../styles";

interface StepAssociateEntityProps {
  groupName: string;
  parentGroup: number | undefined;
  entitySelect: any[];
  associatedEntities: any[];
  selectedEntityRelation: number | undefined;
  listAvailableEntities: any[];
  loading: boolean;
  handleGroupNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeEntity: (id: number) => void;
  handleDeleteChild: (childId: string) => void;
  setParentGroup: (value: number) => void;
}

export const StepAssociateEntity = ({
  groupName,
  parentGroup,
  entitySelect,
  associatedEntities,
  selectedEntityRelation,
  listAvailableEntities,
  loading,
  handleGroupNameChange,
  handleChangeEntity,
  handleDeleteChild,
  setParentGroup
}: StepAssociateEntityProps) => (
  <>
    <Box sx={stepper__1step}>
      <InputText
        id="nome-grupo"
        label="Nome do Grupo"
        value={groupName}
        onChange={handleGroupNameChange}
        disabled
      />
      <InputSelect
        options={entitySelect}
        value={parentGroup}
        onChange={(e) => setParentGroup(Number(e))}
        label="Entidade-Mãe"
        fullWidth
        disabled
      />
    </Box>

    <Grid container sx={{ mb: 3 }}>
      <FormControl fullWidth>
        <InputSelect
          options={listAvailableEntities}
          loading={loading}
          value={selectedEntityRelation}
          onChange={(e) => handleChangeEntity(Number(e))}
          label="Entidade"
        />
      </FormControl>
    </Grid>

    <Card>
      <Typography variant="h6" marginBottom={2} color={PALETTE.PRIMARY_MAIN}>
        Entidades Associadas
      </Typography>
      <TableAssociateEntity
        pageSize={5}
        createGroups={associatedEntities}
        handleDeleteRow={handleDeleteChild}
      />
    </Card>
  </>
);
