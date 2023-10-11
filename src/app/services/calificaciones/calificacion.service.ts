import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../core/service/apiservice.service';
import { ICalificacion } from 'src/app/models/calificaciones/calificacion.interface';
import { Process } from 'src/app/core/enum/proceso.enum';
import { CalificacionResponse } from 'src/app/models/calificaciones/calificacaion.response';
import { Observable } from 'rxjs';
import { CalificacionForIDRequest } from 'src/app/models/calificaciones/calificationForID.request';

@Injectable({
  providedIn: 'root'
})
export class CalificacionService {

  constructor(
    private _apiService: ApiService
  ) { }

  public async getCalificationes(id_hotel: number): Promise<CalificacionResponse> {
    let request: any = {
      proceso: Process.getCalificacionForHotel,
      id_hotel
    }

    let result = await this._apiService.getApiResponse<any, CalificacionResponse>(request);
    return result;
  }

  public async getMeCalification(id_hotel: number, id_user: number): Promise<CalificacionResponse> {
    let request: CalificacionForIDRequest = {
      proceso: Process.getCalificacionForId,
      id_hotel,
      id_user
    }

    let result = await this._apiService.getApiResponse<CalificacionForIDRequest, CalificacionResponse>(request);
    return result;
  }

  public async createAndUpdateCalification(data: ICalificacion): Promise<CalificacionResponse> {
    let request: any = {
      proceso: Process.updatedcalificacion
    };

    if (!data.idcalificacion) {
      delete data.idcalificacion;

      request['proceso'] = Process.createCalificacion;
      request['newCalificacion'] = data;
    } else {
      request['updateCalificacion'] = data;
    }

    let result = await this._apiService.getApiResponse<any, CalificacionResponse>(request);
    return result;
  }

  public async removeCalificacion(id_calificacion: number): Promise<CalificacionResponse> {
    let request: any = {
      proceso: Process.removeCalificacion,
      id_calificacion
    }

    let result = await this._apiService.getApiResponse<any, CalificacionResponse>(request);
    return result;
  }

}
