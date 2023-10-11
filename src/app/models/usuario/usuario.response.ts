import { IResponse } from "src/app/core/models/response.inrteface";
import { IUsuario } from "./usuario.interface";

export interface UsuarioResponse extends IResponse {
  usuario: IUsuario
}
