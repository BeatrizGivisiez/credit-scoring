export interface EntityDTO {
  status: boolean;
  created: string;
  updated: string;
  deleted: string | null;
  entityId: number;
  name: string;
  documentNumber: string;
  documentId: string;
  morada: string;
  localidade: string;
  id: number;
}
