import { Injectable } from '@angular/core';
import { Process } from 'src/app/core/enum/proceso.enum';
import { ApiService } from 'src/app/core/service/apiservice.service';
import { IUsuario } from 'src/app/models/usuario/usuario.interface';
import { UsuarioRequest } from 'src/app/models/usuario/usuario.request';
import { UsuarioResponse } from 'src/app/models/usuario/usuario.response';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private _apiService: ApiService
  ) { }

  public async createuser(newUsuario: IUsuario): Promise<UsuarioResponse> {

    let request: UsuarioRequest = {
      proceso: Process.createUsuario,
      newUsuario
    };

    let result = await this._apiService.getApiResponse<UsuarioRequest, UsuarioResponse>(request);
    return result;
  }

  public async loginuser(email: string, clave: string): Promise<UsuarioResponse> {

    let request: any = {
      proceso: Process.login,
      email,
      clave
    };

    let result = await this._apiService.getApiResponse<any, UsuarioResponse>(request);
    return result;
  }

}
