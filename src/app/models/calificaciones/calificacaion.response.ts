import { IResponse } from "src/app/core/models/response.inrteface";
import { ICalificacion } from "./calificacion.interface";
import { ICalificacionUser } from "./user-calificacion";

export interface CalificacionResponse extends IResponse {
  calificacion: ICalificacion;
  calificaciones: ICalificacionUser[];
}
