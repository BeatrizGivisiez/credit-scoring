interface RadioOption {
  id: number | string; // Pode ser número ou string
  label: string; // O texto que será exibido ao lado do radio
}

export interface InputRadioProps {
  title: string; // O título da seção do grupo de rádios
  options: RadioOption[]; // A lista de opções que o componente vai renderizar
  selectedValue: string | number; // O valor atualmente selecionado, pode ser string ou número
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void; // Callback disparado quando o valor mudar
}
