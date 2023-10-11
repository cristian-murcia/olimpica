import { IRequest } from "src/app/core/models/request.interface";

export interface CalificacionForIDRequest extends IRequest {
  id_hotel: number;
  id_user: number;
}
