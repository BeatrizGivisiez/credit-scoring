export type ContractsList = {
  id: number;
  name: string;
  nif: string;
  reestruturadoPorDificuldadesFinanceiras: boolean;
  reestruturadoSemDificuldadesFinanceiras: boolean;
  defaultTecnico: boolean;
  writeOff: boolean;
  chargeOff: boolean;
  quebraDeContrato: boolean;
  emNegociacao: boolean;
  reestruturado: boolean;
  pari: boolean;
  persi: boolean;
  per: boolean;
  tribunal: boolean;
};

export interface TableListContractsProps {
  contractsList: ContractsList[];
  pageSize?: number;
  onViewModal: (entity: ContractsList) => void;
  onEditModal: (entity: ContractsList) => void;
}
