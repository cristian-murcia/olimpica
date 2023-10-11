import { Injectable } from '@angular/core';
import { IRequest } from 'src/app/core/models/request.interface';
import { ApiService } from 'src/app/core/service/apiservice.service';
import { Process } from 'src/app/core/enum/proceso.enum';
import { IHotel, IHotelResponse, Producto } from '../../models/hotel';
import { Observable } from 'rxjs';

import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class HotelesService {

  constructor(
    private _apiService: ApiService
  ) { }

  /**
   * @returns
   */
  public async getAllHotels(): Promise<IHotelResponse> {
    let request: IRequest = {
      proceso: Process.getHotels
    }
    let result = await this._apiService.getApiResponse<IRequest, IHotelResponse>(request);
    
    return result;
  }

  /**
   * @param id_hotel
   * @returns
   */
  public getHotelForId(id_hotel: number): Observable<IHotelResponse> {
    let request = {
      proceso: Process.getHotelForId,
      id_hotel
    };

    return this._apiService.getData<any, IHotelResponse>(request);
  }

  /**
   * @param id_hotel
   * @returns
   */
  public async getHotelForStart(start: number): Promise<IHotelResponse> {
    let request: any = {
      proceso: Process.getHotelsForStart,
      estrellas: start
    };

    let result = await this._apiService.getApiResponse<any, IHotelResponse>(request);
    return result;
  }

  public async getHotelForPrecio(order: string): Promise<IHotelResponse> {
    let request: any = {
      proceso: Process.getHotelsFilter,
      formaOrder: order,
      campo: 'precio'
    }

    let result = await this._apiService.getApiResponse<any, IHotelResponse>(request);
    return result;

  }

  public async createProducto(data: any): Promise<IHotelResponse> {
    let request: any = {
      proceso: Process.createHotel,
      newHotel: data
    }
    return await this._apiService.getApiResponse<any, any>(request);
  }

  public async createImg(data: any): Promise<any> {
    let request: any = {
      proceso: Process.createImageForID,
      newImage: data
    }
    return await this._apiService.getApiResponse<any, any>(request);
  }


}
