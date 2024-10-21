"use client";

import {
  Box,
  CircularProgress,
  Dialog,
  DialogTitle,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from "@mui/material";
import { BezierCurve, X } from "@phosphor-icons/react";
import { useCallback, useState, useEffect } from "react";

import { ModalListGroupProps } from "./types";

import { ButtonIcon, Divider } from "@/components";
import PALETTE from "@/styles/_palette";
import { IMAGE_DIAGRAMA } from "@/constants/images";
// import { useRouter } from "next/navigation";
import { useFetchEconomicGroupId } from "@/hooks";

export const ModalListGroupView = ({
  open,
  handleClose,
  id,
  groupName,
  user,
  version,
  lastUpdate,
  relations = []
}: ModalListGroupProps) => {
  // const router = useRouter();

  // const handleNavigation = (path: string) => {
  //   router.push(path); // Navega para a rota desejada
  // };
  const { economicGroupId, fetchEconomicGroupId, loading } = useFetchEconomicGroupId();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = useCallback((event: unknown, newPage: number) => setPage(newPage), []);
  const handleChangeRowsPerPage = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }, []);

  // Ordena as relações, colocando Ativos (sem deletedAt) primeiro
  const sortedRelations = [...economicGroupId].sort((a, b) => {
    if (a.deleted && !b.deleted) return 1; // "Inativo" vem depois
    if (!a.deleted && b.deleted) return -1; // "Ativo" vem antes
    return 0; // Mantém a ordem original se ambos forem Ativos ou Inativos
  });

  // Reutilizar um componente para os itens do grid
  const GridItem = ({ label, value }: { label: string; value: string }) => (
    <Grid item xs={6}>
      <Typography variant="body1">
        <strong>{label}</strong>: {value}
      </Typography>
    </Grid>
  );

  useEffect(() => {
    if (id) {
      fetchEconomicGroupId(id?.toString());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <Dialog onClose={handleClose} open={open} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 2
          }}
        >
          <Typography variant="h6" color={PALETTE.PRIMARY_MAIN}>
            Visualizar - {groupName}
          </Typography>
          <ButtonIcon
            placement="right-start"
            title="Grupo Económico"
            icon={BezierCurve}
            onClick={() => window.open(IMAGE_DIAGRAMA, "_blank")}
            // onClick={() => handleNavigation("/utp")}
          />
        </Box>

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
        <Grid container spacing={2}>
          <GridItem label="ID Entidade" value={id ? String(id) : "-"} />
          <GridItem label="Nome do Utilizador Criador" value={user || "-"} />
          <GridItem label="Versão" value={version ? String(version) : "-"} />
          <GridItem label="Última Atualização Grupo" value={lastUpdate || "-"} />
        </Grid>
      </Box>

      <Divider />

      <Box sx={{ margin: 5 }}>
        <Typography variant="h6" gutterBottom color={PALETTE.PRIMARY_MAIN} mb={2}>
          Lista de Relações com o grupo econômico
        </Typography>
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

              {!loading &&
                sortedRelations
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((relation, index) => (
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
                              color: relation.deleted ? "red" : "green" // Cor verde ou vermelha
                            }}
                          >
                            {relation.deleted ? "Inativo" : "Ativo"}
                          </Typography>
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
          count={economicGroupId.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </Dialog>
  );
};
