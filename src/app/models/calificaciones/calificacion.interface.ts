import { UserCalificacion } from "./user-calificacion";

export interface ICalificacion {
  idcalificacion?: number;
  usuario_userID: number;
  hotel_hotelID: number;
  estrellas: number;
  comentario: string;
  createdAt?: Date;
  updatedAt?: Date;


  /*Usuario.userName: string;
Usuario.userSurname: string;*/
}
