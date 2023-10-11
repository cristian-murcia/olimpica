import { IRequest } from "src/app/core/models/request.interface";
import { IHotel } from "./hotel.interface";

export interface IGetAllHotel extends IRequest {
  hotel?: IHotel;
}
