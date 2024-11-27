export interface ModalContractProps {
  open: boolean;
  handleClose: () => void;
  contractData: {
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
