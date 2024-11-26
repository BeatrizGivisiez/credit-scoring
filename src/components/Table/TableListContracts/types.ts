export type ContractsList = {
  id: number;
  name: string;
  nif: string;
  email: string;
  phone: string;
  address: string;
};

export interface TableListContractsProps {
  contractsList: ContractsList[];
  pageSize?: number;
}
