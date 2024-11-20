export interface UserDTO {
  id: number;
  username: string;
  email: string;
  password: string;
  status: boolean;
  perfilId: number;
}

export interface UserCreateDTO {
  id: number;
  username: string;
  email: string;
  password: string;
  status: boolean;
  perfilId: number;
}

export type Perfil = "Administrador" | "Gestor" | "Visualizador";

export const PerfilOptions: { value: number; label: Perfil }[] = [
  { value: 1, label: "Administrador" },
  { value: 2, label: "Gestor" },
  { value: 3, label: "Visualizador" }
];
