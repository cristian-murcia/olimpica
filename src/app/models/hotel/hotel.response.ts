import { IResponse } from "src/app/core/models/response.inrteface";
import { IHotel } from "./hotel.interface";

export interface IHotelResponse extends IResponse {
  hotel?: IHotel;
  hotels: IHotel[];
}
