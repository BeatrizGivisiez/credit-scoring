export interface ModalListUserProps {
  open: boolean;
  handleClose: () => void;
  id?: number;
  nome?: string;
  email?: string;
  password?: string;
  perfil?: string;
}
