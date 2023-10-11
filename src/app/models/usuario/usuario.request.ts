import { IRequest } from "src/app/core/models/request.interface";
import { IUsuario } from "./usuario.interface";

export interface UsuarioRequest extends IRequest {
  newUsuario: IUsuario
}
