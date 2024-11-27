export interface ModalEntityProps {
  open: boolean;
  handleClose: () => void;
  entityData: {
    id: string;
    nif: string;
    documentType: string;
    clientSegment: string;
    location: string;
    socialDebt: string;
    financialDifficulty: string;
    comments: string;
    lastUpdate: string;
  };
}
