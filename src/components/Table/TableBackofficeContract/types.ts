type BackofficeContract = {
  id: number;
  name: string;
  createdAt?: string;
  deletedAt?: string | null;
  status?: boolean | string;
  inativar?: boolean | string;
};

export interface TableBackofficeContractProps {
  backofficeContract: BackofficeContract[];
  pageSize?: number;
  onInactivate: (id: number) => void;
}
