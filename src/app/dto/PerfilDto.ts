export interface PerfilDTO {
  id?: number;
  status?: boolean;
  nome: string;
  email: string;
  password: string;
  perfilId: number;
}

export interface UserCreateDTO {
  nome: string;
  email: string;
  password: string;
  perfilId: number;
}

export type Perfil = "Administrador" | "Gestor" | "Visualizador";

export const PerfilOptions: { value: string; label: Perfil }[] = [
  { value: "1", label: "Administrador" },
  { value: "2", label: "Gestor" },
  { value: "3", label: "Visualizador" }
];

export const optionperfil = PerfilOptions.map((item) => ({
  label: item.label,
  value: item.value
}));
