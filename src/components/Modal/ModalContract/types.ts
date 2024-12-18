export interface ModalContractEditProps {
  open: boolean;
  handleClose: () => void;
  handleSubmit: () => void;
  contractData: {
    id: string;
    courtSuspensionDate: string; // Data de suspensão pelo tribunal, da contagem do prazo
    courtAppealSuspensionDate: string; // Data da suspensão do recurso de tribunal
    restructuringDate: string; // Data de reestruturação
    lastUpdate: string; // Última atualização
  };
}

export interface ModalContractViewProps {
  open: boolean;
  handleClose: () => void;
  contractData: {
    id: string;
    courtSuspensionDate: string; // Data de suspensão pelo tribunal, da contagem do prazo
    courtAppealSuspensionDate: string; // Data da suspensão do recurso de tribunal
    restructuringDate: string; // Data de reestruturação
    lastUpdate: string; // Última atualização
  };
}
