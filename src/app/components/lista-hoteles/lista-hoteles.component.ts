import { Component, OnInit } from '@angular/core';
import { Coderror } from 'src/app/core/enum/coderror';
import { IHotel } from 'src/app/models/hotel';
import { ApiService } from 'src/app/core/service/apiservice.service';
import { HotelesService } from '../../services/hoteles'

@Component({
  selector: 'app-lista-hoteles',
  templateUrl: './lista-hoteles.component.html',
  styleUrls: ['./lista-hoteles.component.css'],
  providers: [HotelesService, ApiService]
})
export class ListaHotelesComponent implements OnInit {

  public hoteles: IHotel[];
  public error: boolean = false;
  public filterStar: number = 5;

  constructor(
    private _hotelesService: HotelesService
  ) { }

  ngOnInit(): void {
    this.getHotels();
  }

  public async getHotels() {
    let result = await this._hotelesService.getAllHotels();

    if (result.code == Coderror.Exitoso) {
      this.hoteles = result.hotels;
    } else {
      this.error = true;
    }
  }

  public async getHotelsForStar(target: any) {
    this.filterStar = Number(target.value);
    let result = await this._hotelesService.getHotelForStart(this.filterStar);

    if (result.code == Coderror.Exitoso) {
      this.hoteles = result.hotels;
    } else {
      this.error = true;
    }
  }

  public async getHotelForPrecio(order: string) {
    let result = await this._hotelesService.getHotelForPrecio(order);

    if (result.code == Coderror.Exitoso) {
      this.hoteles = result.hotels;
    } else {
      this.error = true;
    }
  }


}
