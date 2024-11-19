export const OPTION_TYPES = [
  { value: "1", label: "Administrador" },
  { value: "2", label: "Gestor" },
  { value: "3", label: "Visualizador" }
];

export const optionperfil = OPTION_TYPES.map((item) => ({
  label: item.label,
  value: item.value
}));
