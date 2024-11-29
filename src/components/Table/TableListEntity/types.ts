export type EntitytList = {
  id: number;
  name: string;
  nif: string;
  email: string;
  phone: string;
  address: string;
};

export interface TableListEntityProps {
  entityList: EntitytList[];
  pageSize?: number;
  openModal: () => void;
}
