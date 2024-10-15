export interface RadioOption {
  id: number; // O id que foi reportado como ausente
  label: string;
  value: string;
}

export interface InputRadioProps {
  title: string; // O título da seção do grupo de rádios
  options: RadioOption[]; // A lista de opções que o componente vai renderizar
  selectedValue: string | number; // O valor atualmente selecionado, pode ser string ou número
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void; // Callback disparado quando o valor mudar
}
