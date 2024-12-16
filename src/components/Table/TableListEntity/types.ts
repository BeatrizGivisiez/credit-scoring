export type EntityList = {
  id: number;
  name: string;
  nif: string;
  documentType: string; // Type of document
  clientSegment: string; // Segment of the client
  location: string; // Location
  comments: string; // Comments
  lastUpdate: string; // Last update date
};

export interface TableListEntityProps {
  entityList: EntityList[];
  pageSize?: number;
  onViewModal: (entity: EntityList) => void;
  onEditModal: (entity: EntityList) => void;
}
