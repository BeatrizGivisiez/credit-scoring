//src/dto/EntityDTO
export interface EntityDTO {
  status: boolean;
  created: string; // Pode ser Date
  updated: string; // Pode ser Date
  deleted: string | null; // Pode ser null para representar entidades ativas
  entityId: number;
  name: string;
  documentNumber: string;
  documentId: string;
  morada: string;
  localidade: string;
}
