export interface UserDTO {
  id: number;
  name: string;
  email: string;
  password: string;
  status: boolean;
  perfil: Perfil;
}

export type Perfil = "Administrador" | "Gestor" | "Visualizador";

export const PerfilOptions: { value: number; label: Perfil }[] = [
  { value: 1, label: "Administrador" },
  { value: 2, label: "Gestor" },
  { value: 3, label: "Visualizador" }
];
