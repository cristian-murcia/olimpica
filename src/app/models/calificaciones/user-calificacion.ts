import { ICalificacion } from "./calificacion.interface";

export interface UserCalificacion {
  apellido: string;
  nombre: string;
}

export interface ICalificacionUser extends ICalificacion {
  Usuario: UserCalificacion;
}
