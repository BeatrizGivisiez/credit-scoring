"use client";

import { useCallback, useEffect, useState } from "react";

import { EconomicGroupId } from "@/app/dto/EconomicGroupIdDto";
import { Button, ButtonIcon, Divider } from "@/components";
import { useDisableEconomicGroup, useFetchEconomicGroupId } from "@/hooks";
import PALETTE from "@/styles/_palette";
import { getTodayDate } from "@/utils/getTodayDate";
import {
  Alert,
  Box,
  CircularProgress,
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

import { ModalRelateEntityAdd } from "./ModalRelateEntityAdd";
import { ModalRelateEntityEdit } from "./ModalRelateEntityEdit";
import { ModalListGroupProps } from "./types";

export const ModalListGroupEdit = ({
  open,
  handleClose,
  groupName,
  parentClient,
  relations = [],
  id
}: ModalListGroupProps) => {
  const { economicGroupId, fetchEconomicGroupId, loading } = useFetchEconomicGroupId();
  const { disableGroup, loading: disableLoading } = useDisableEconomicGroup();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [relateEntityAddOpen, setRelateEntityAddOpen] = useState(false);
  const [relateEntityEditOpen, setRelateEntityEditOpen] = useState(false);
  const [selectedRelation, setSelectedRelation] = useState<EconomicGroupId | null>(null);
  const [isGroupActive, setIsGroupActive] = useState(true); // Estado inicial, atualizado via backend
  const [localChange, setLocalChange] = useState(false); // Controla se a mudança foi local
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState<"success" | "error">("success");

  // Estado de loading para aguardar o POST ser refletido
  const [switchLoading, setSwitchLoading] = useState(false);

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
  const handleOpenRelateEntityEditModal = (relation: EconomicGroupId) => {
    setSelectedRelation(relation);
    setRelateEntityEditOpen(true);
  };

  // Função para fechar o modal de edição
  const handleCloseRelateEntityEditModal = () => {
    setRelateEntityEditOpen(false);
    setSelectedRelation(null); // Limpa a relação selecionada
  };

  // Função para alterar o estado do grupo, atualizar o backend e exibir alerta
  const handleSwitchChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const isActive = event.target.checked;
    setIsGroupActive(isActive); // Atualiza visualmente no estado local
    setLocalChange(true); // Marca que a mudança foi local para evitar que o backend sobreponha imediatamente
    setSwitchLoading(true); // Inicia o estado de loading do switch

    const date = getTodayDate(); // Usa a função getTodayDate() para obter a data atual no formato YYYY-MM-DD

    if (id) {
      await disableGroup(id.toString(), date); // Chama o hook para desativar/ativar o grupo com a data
      setAlertMessage(
        isActive ? "O grupo foi ativado com sucesso." : "O grupo foi desativado com sucesso."
      );
      setAlertSeverity(isActive ? "success" : "error");
      setAlertOpen(true); // Abre o alerta
      setSwitchLoading(false); // Finaliza o estado de loading do switch
    }
  };

  // Atualiza o estado do grupo com base nos dados do backend, mas respeita mudanças locais
  useEffect(() => {
    if (id) {
      fetchEconomicGroupId(id.toString());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // Sincroniza o estado isGroupActive com o valor do backend
  useEffect(() => {
    if (economicGroupId.length > 0 && !localChange) {
      // Se não houve mudança local, atualiza o estado com base no backend
      const groupStatus = !economicGroupId[0].deleted;
      setIsGroupActive(groupStatus);
    }
  }, [economicGroupId, localChange]);

  // Após a sincronização inicial, permite mudanças locais
  useEffect(() => {
    if (localChange) {
      setLocalChange(false); // Reseta o controle após a primeira sincronização
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGroupActive]);

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
                control={
                  <Switch
                    checked={isGroupActive}
                    onChange={handleSwitchChange}
                    disabled={disableLoading || switchLoading} // Desabilita o switch enquanto está carregando
                  />
                }
              />
              {switchLoading && <CircularProgress size={24} />} {/* Indicador de loading */}
            </FormGroup>
            <Button iconEnd={Plus} label="Adicionar" onClick={handleOpenRelateEntityAddModal} />
          </Box>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell>NIF</TableCell>
                <TableCell>Característica Relação</TableCell>
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
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100px",
                        width: "100%"
                      }}
                    >
                      <CircularProgress />
                    </Box>
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
                    <TableCell>{relation.child.name}</TableCell>
                    <TableCell>{relation.child.documentNumber}</TableCell>
                    <TableCell>{relation.economicGroupType.name}</TableCell>
                    <TableCell>{relation.created}</TableCell>
                    <TableCell>{relation.deleted}</TableCell>
                    <TableCell>
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
                          title="Editar"
                          icon={Pencil}
                          onClick={() => handleOpenRelateEntityEditModal(relation)}
                        />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={economicGroupId.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>

      {/* Modal de Editar Entidade */}
      {relateEntityEditOpen && selectedRelation && (
        <ModalRelateEntityEdit
          open={relateEntityEditOpen}
          handleClose={handleCloseRelateEntityEditModal}
          parentClient={selectedRelation.child.name}
          nif={selectedRelation.child.documentNumber}
          selectedRelation={selectedRelation}
        />
      )}

      {/* Modal de Adicionar Entidade */}
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
