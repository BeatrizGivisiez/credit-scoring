"use client";

import {
  Alert,
  Box,
  Dialog,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from "@mui/material";
import { Check, Pencil, Plus, X } from "@phosphor-icons/react";
import { useCallback, useState } from "react";

import { ModalRelateEntityAdd } from "./ModalRelateEntityAdd";
import { ModalRelateEntityEdit } from "./ModalRelateEntityEdit";
import { ModalListGroupProps, RelationData } from "./types";

import { Button, ButtonIcon, Divider } from "@/components";
import PALETTE from "@/styles/_palette";
export const ModalListGroupEdit = ({
  open,
  handleClose,
  groupName,
  parentClient,
  relations = []
}: ModalListGroupProps) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [relateEntityAddOpen, setRelateEntityAddOpen] = useState(false);
  const [relateEntityEditOpen, setRelateEntityEditOpen] = useState(false);
  const [selectedRelation, setSelectedRelation] = useState<RelationData | null>(null); // Armazena a relação selecionada
  const [isGroupActive, setIsGroupActive] = useState(true);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState<"success" | "error">("success");

  // Função para mudar a página da tabela
  const handleChangePage = useCallback((event: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  // Função para alterar o número de linhas por página
  const handleChangeRowsPerPage = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }, []);

  // Função para abrir o modal de adição
  const handleOpenRelateEntityAddModal = () => {
    setRelateEntityAddOpen(true);
  };
  const handleCloseRelateEntityAddModal = () => {
    setRelateEntityAddOpen(false);
  };

  // Função para abrir o modal de edição com a relação selecionada
  const handleOpenRelateEntityEditModal = (relation: RelationData) => {
    setSelectedRelation(relation); // Armazena a relação selecionada
    setRelateEntityEditOpen(true);
  };

  // Função para fechar o modal de edição
  const handleCloseRelateEntityEditModal = () => {
    setRelateEntityEditOpen(false);
    setSelectedRelation(null); // Limpa a relação selecionada
  };

  // Função para alterar o estado do grupo e exibir a mensagem de alerta
  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isActive = event.target.checked;
    setIsGroupActive(isActive);
    setAlertMessage(
      isActive ? "O grupo foi ativado com sucesso." : "O grupo foi desativado com sucesso."
    );
    setAlertSeverity(isActive ? "success" : "error");
    setAlertOpen(true); // Abre o alerta
  };

  return (
    <Dialog onClose={handleClose} open={open} maxWidth="md" fullWidth>
      <DialogTitle>
        <Typography variant="h6" color={PALETTE.PRIMARY_MAIN}>
          Editar - {groupName}
        </Typography>
        <ButtonIcon
          placement="top-start"
          title="Fechar"
          icon={X}
          onClick={handleClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
          weight="regular"
        />
      </DialogTitle>

      <Divider />

      <Box sx={{ margin: 5 }}>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3
          }}
        >
          <Typography variant="h6" gutterBottom color={PALETTE.PRIMARY_MAIN}>
            Lista de Relações com o grupo econômico
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              alignItems: "center"
            }}
          >
            <FormGroup>
              <FormControlLabel
                label={isGroupActive ? "Grupo Ativo" : "Grupo Inativo"}
                control={<Switch checked={isGroupActive} onChange={handleSwitchChange} />}
              />
            </FormGroup>
            <Button iconEnd={Plus} label="Adicionar" onClick={handleOpenRelateEntityAddModal} />
          </Box>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ padding: "10px 0px", fontSize: "16px" }}>Nome</TableCell>
                <TableCell sx={{ padding: "10px 0px", fontSize: "16px" }}>NIF</TableCell>
                <TableCell sx={{ padding: "10px 0px", fontSize: "16px" }}>
                  Característica Relação
                </TableCell>
                <TableCell sx={{ padding: "10px 0px", fontSize: "16px" }}>Data Inicial</TableCell>
                <TableCell sx={{ padding: "10px 0px", fontSize: "16px" }}>Data Fim</TableCell>
                <TableCell sx={{ padding: "10px 0px", fontSize: "16px" }}>Status</TableCell>
                <TableCell
                  sx={{
                    padding: "10px 0px",
                    fontSize: "16px",
                    width: "100%",
                    display: "flex",
                    alignContent: "center",
                    justifyContent: "center"
                  }}
                >
                  Ações
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {relations
                .sort((a, b) => {
                  if (!a.deletedAt) return -1; // Move `a` para cima
                  if (!b.deletedAt) return 1; // Move `b` para cima
                  return 0;
                })
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((relation, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ padding: "0px", fontSize: "14px" }}>
                      {relation.entityName}
                    </TableCell>
                    <TableCell sx={{ padding: "0px", fontSize: "14px" }}>{relation.nif}</TableCell>
                    <TableCell sx={{ padding: "0px", fontSize: "14px" }}>
                      {relation.relation}
                    </TableCell>
                    <TableCell sx={{ padding: "0px", fontSize: "14px" }}>
                      {relation.createdAt}
                    </TableCell>
                    <TableCell sx={{ padding: "0px", fontSize: "14px" }}>
                      {relation.deletedAt}
                    </TableCell>
                    <TableCell sx={{ padding: "0px", fontSize: "14px" }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-start",
                          width: "100%",
                          height: "100%"
                        }}
                      >
                        <Typography
                          variant="body2"
                          style={{
                            color: relation.deletedAt ? "red" : "green"
                          }}
                        >
                          {relation.deletedAt ? "Inativo" : "Ativo"}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell
                      sx={{
                        padding: "2px",
                        width: "100%",
                        display: "flex",
                        alignContent: "center",
                        justifyContent: "center"
                      }}
                    >
                      <Box display="flex">
                        <ButtonIcon
                          placement="top-start"
                          title="Editar"
                          icon={Pencil}
                          onClick={() => handleOpenRelateEntityEditModal(relation)}
                        />
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={relations.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>

      {/* Modal de Editar Endidade */}
      {relateEntityEditOpen && selectedRelation && (
        <ModalRelateEntityEdit
          open={relateEntityEditOpen}
          handleClose={handleCloseRelateEntityEditModal}
          parentClient={selectedRelation.entityName}
          nif={selectedRelation.nif}
          selectedRelation={selectedRelation}
        />
      )}

      {/* Modal de Adicionar Endidade */}
      {relateEntityAddOpen && (
        <ModalRelateEntityAdd
          open={relateEntityAddOpen}
          handleClose={handleCloseRelateEntityAddModal}
          parentClient={parentClient}
        />
      )}

      {/* Alerta de estado do grupo */}
      <Dialog open={alertOpen} onClose={() => setAlertOpen(false)}>
        <Alert
          icon={<Check />}
          severity={alertSeverity}
          onClose={() => setAlertOpen(false)}
          sx={{ padding: 2 }}
        >
          {alertMessage}
        </Alert>
      </Dialog>
    </Dialog>
  );
};
