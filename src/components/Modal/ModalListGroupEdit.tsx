"use client";

import { useCallback, useEffect, useState } from "react";

import { EconomicGroupId } from "@/app/dto/EconomicGroupIdDto";
import { EconomicGroupRelationNewEntityDTO } from "@/app/dto/EconomicGroupRelationDto";
import { Button, ButtonIcon, Divider } from "@/components";
import {
  useCreateEconomicGroupRelation,
  useDisableEconomicGroup,
  useDisableEconomicGroupRelationId,
  useFetchEconomicGroupId
} from "@/hooks";
import PALETTE from "@/styles/_palette";
import { formatDate } from "@/utils/formatDate";
import { getTodayDate } from "@/utils/getTodayDate";
import {
  Alert,
  Box,
  CircularProgress,
  Dialog,
  DialogTitle,
  TablePagination,
  Typography
} from "@mui/material";
import { Check, MinusCircle, Plus, X } from "@phosphor-icons/react";

import { TableEconomicGroupModal } from "../Table/TableEconomicGroupModal/TableEconomicGroupModal";
import { ModalRelateEntityAdd } from "./ModalRelateEntityAdd";
import { ModalRelateEntityEdit } from "./ModalRelateEntityEdit";

import { modallistgroupedit__loading, modallistgroupedit__title } from "./styles";
import { ModalListGroupProps } from "./types";

export const ModalListGroupEdit = ({
  open,
  handleClose,
  groupName,
  parentClient,
  parentId,
  relations = [],
  id,
  nif,
  deletedAt = "",
  fetchEconomicGroup // Recebendo a função como prop para atualizar a lista
}: ModalListGroupProps) => {
  const { economicGroupId, fetchEconomicGroupId, loading } = useFetchEconomicGroupId();
  const { disableGroup } = useDisableEconomicGroup();
  const { createEconomicGroupRelation } = useCreateEconomicGroupRelation();

  const { disableRelationGroupId } = useDisableEconomicGroupRelationId();

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
  // const [loadingUpdates, setLoadingUpdates] = useState<boolean>(false);
  const [localRelations, setLocalRelations] = useState<EconomicGroupId[]>(economicGroupId);

  // Estado de loading para aguardar o POST ser refletido
  const [iconLoading, setIconLoading] = useState(false);

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

  // Função para desativar o grupo
  const handleIconClick = async () => {
    setIconLoading(true); // Inicia o estado de loading
    const date = getTodayDate(); // Usa a função getTodayDate() para obter a data atual no formato YYYY-MM-DD
    if (id) {
      try {
        await disableGroup(id.toString(), date); // Chama o hook para desativar o grupo com a data
        setIsGroupActive(false); // Marca o grupo como inativo
        setAlertMessage("O grupo foi desativado com sucesso.");
        setAlertSeverity("error");
        setAlertOpen(true); // Abre o alerta
        if (fetchEconomicGroup) {
          fetchEconomicGroup(); // Atualiza a lista de grupos
        }
      } catch (error) {
        // Caso haja um erro, lidar com ele aqui (opcional)
      } finally {
        setIconLoading(false); // Finaliza o estado de loading
      }
    }
  };

  // Sincroniza o estado isGroupActive com o valor do backend
  useEffect(() => {
    if (deletedAt == "" && !localChange) {
      // Se não houve mudança local, atualiza o estado com base no backend
      setIsGroupActive(deletedAt == "");
    }
  }, [deletedAt, localChange]);

  // Após a sincronização inicial, permite mudanças locais
  useEffect(() => {
    if (localChange) {
      setLocalChange(false); // Reseta o controle após a primeira sincronização
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGroupActive]);

  // Carrega dados ao abrir o modal
  useEffect(() => {
    if (id) fetchEconomicGroupId(id.toString());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // Atualiza `localRelations` quando `economicGroupId` muda
  useEffect(() => setLocalRelations(economicGroupId), [economicGroupId]);

  const handleAddGroup = async (data: {
    childId: number;
    parentId: number;
    characteristicRelation: number;
  }) => {
    const body: EconomicGroupRelationNewEntityDTO = {
      economicGroupId: id ?? 0, // Id do grupo econômico
      parentId: data.parentId, // Id da entidade mãe
      childId: data.childId, // ID da entidade filha
      economicGroupTypeId: data.characteristicRelation // Tipo de relação
    };
    try {
      await createEconomicGroupRelation(body);
      setAlertMessage("Relação criada com sucesso!");
      setAlertSeverity("success");
      setAlertOpen(true);
      fetchEconomicGroupId(id?.toString() ?? "");
      handleCloseRelateEntityAddModal();
    } catch (error) {
      console.error("Erro ao criar a relação:", error);
      setAlertMessage("Erro ao criar a relação. Tente novamente.");
      setAlertSeverity("error");
      setAlertOpen(true);
    }
  };

  const handleInactivateEntity = async (data: {
    economicGroupRelationshipId: number;
    deletedAt: string;
  }) => {
    try {
      await disableRelationGroupId(
        data.economicGroupRelationshipId.toString(),
        formatDate(data.deletedAt)
      );

      setAlertMessage("Relação desativada com sucesso!");
      setAlertSeverity("success");
      setAlertOpen(true);
      await fetchEconomicGroupId(id?.toString() ?? "");
      handleCloseRelateEntityEditModal();
    } catch (error) {
      console.error("Erro ao inativar a entidade:", error);
      setAlertMessage("Erro ao desativar relação. Tente novamente.");
      setAlertSeverity("error");
      setAlertOpen(true);
    }
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
        <Box sx={modallistgroupedit__title}>
          <Typography variant="h6" gutterBottom color={PALETTE.PRIMARY_MAIN}>
            Lista de Relações com o grupo econômico
          </Typography>
          <Box sx={modallistgroupedit__loading}>
            {!iconLoading && (
              <Box sx={{ display: "flex", alignItems: "center", mr: 3 }}>
                {isGroupActive && (
                  <ButtonIcon
                    placement="top-start"
                    title="Inativar Grupo"
                    icon={MinusCircle}
                    onClick={handleIconClick}
                  />
                )}
                <Typography variant="body2" style={{ color: isGroupActive ? "green" : "red" }}>
                  {isGroupActive ? "Grupo Ativo" : "Grupo Inativo"}
                </Typography>
              </Box>
            )}
            {iconLoading && <CircularProgress size={24} />} {/* Indicador de loading */}
            <Button iconEnd={Plus} label="Adicionar" onClick={handleOpenRelateEntityAddModal} />
          </Box>
        </Box>

        <TableEconomicGroupModal
          economicGroupId={localRelations}
          loading={loading}
          page={page}
          rowsPerPage={rowsPerPage}
          handleOpenRelateEntityEditModal={handleOpenRelateEntityEditModal}
        />

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={localRelations.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(event, newPage) => setPage(newPage)}
          onRowsPerPageChange={(event) => setRowsPerPage(parseInt(event.target.value, 10))}
        />
      </Box>

      {/* Modal de Editar Entidade */}
      {relateEntityEditOpen && selectedRelation && (
        <ModalRelateEntityEdit
          open={relateEntityEditOpen}
          handleClose={() => setRelateEntityEditOpen(false)}
          parentClient={selectedRelation.child.name}
          nif={selectedRelation.child.documentNumber}
          selectedRelation={selectedRelation}
          handleSubmit={handleInactivateEntity}
        />
      )}

      {/* Button que abre a modal para Adicionar nova Entidade */}
      {relateEntityAddOpen && (
        <ModalRelateEntityAdd
          open={relateEntityAddOpen}
          handleClose={() => setRelateEntityAddOpen(false)}
          handleSubmit={handleAddGroup}
          listEntities={[
            { label: `${parentClient} - ${nif}`, value: Number.parseInt(nif ?? "0") },
            ...localRelations.map((i) => ({
              label: `${i.child.name} - ${i.child.documentNumber}`,
              value: Number.parseInt(i.child.documentNumber)
            }))
          ]}
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
