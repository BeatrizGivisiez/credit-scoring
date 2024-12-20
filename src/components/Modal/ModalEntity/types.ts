export interface ModalEntityViewProps {
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

export interface ModalEntityEditProps {
  open: boolean;
  handleClose: () => void;
  handleSubmit: () => void;
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

export interface ModalManagerEntityProps {
  open: boolean;
  handleClose: () => void;
  onSave: any;
  relationEntity: any;
}
