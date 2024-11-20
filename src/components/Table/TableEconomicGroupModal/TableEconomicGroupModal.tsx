"use client";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";
import { ButtonIcon, Loading } from "@/components";
import { MinusCircle } from "@phosphor-icons/react";
import { table__status } from "./styles";

interface Relation {
  child: { name: string; documentNumber: string };
  economicGroupType: { name: string };
  created: string;
  deleted: string | null;
}

interface TableEconomicGroupModalProps {
  economicGroupId: Relation[];
  loading: boolean;
  page: number;
  rowsPerPage: number;
  handleOpenRelateEntityEditModal: (relation: any) => void;
}

export const TableEconomicGroupModal = ({
  economicGroupId,
  loading,
  page,
  rowsPerPage,
  handleOpenRelateEntityEditModal
}: TableEconomicGroupModalProps) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>NIF</TableCell>
            <TableCell>Característica Relação</TableCell>
            <TableCell>Entidade Associada</TableCell>
            <TableCell>Data Inicial</TableCell>
            <TableCell>Data Fim</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading && (
            <TableRow>
              <TableCell colSpan={6}>
                <Loading />
              </TableCell>
            </TableRow>
          )}

          {economicGroupId
            .sort((a: any, b: any) => {
              if (!a.deleted) return -1;
              if (!b.deleted) return 1;
              return 0;
            })
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((relation: any, index: any) => (
              <TableRow key={index}>
                <TableCell>{relation.child?.name}</TableCell>
                <TableCell>{relation.child?.documentNumber}</TableCell>
                <TableCell>{relation.economicGroupType.name}</TableCell>
                <TableCell>{relation.parent?.name}</TableCell>
                <TableCell>{relation.created}</TableCell>
                <TableCell>{relation.deleted}</TableCell>
                <TableCell>
                  <Box sx={table__status}>
                    <Typography
                      variant="body2"
                      style={{
                        color: relation.deleted ? "red" : "green"
                      }}
                    >
                      {relation.deleted ? "Inativo" : "Ativo"}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell sx={{ padding: 0 }}>
                  {!relation.deleted && (
                    <ButtonIcon
                      placement="top-start"
                      title="Inativar"
                      icon={MinusCircle}
                      onClick={() => handleOpenRelateEntityEditModal(relation)}
                    />
                  )}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
