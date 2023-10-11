import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICalificacion } from 'src/app/models/calificaciones/calificacion.interface';
import { IHotel } from 'src/app/models/hotel';
import { IImage } from 'src/app/models/image';
import { HotelesService } from 'src/app/services';

@Component({
  selector: 'app-view-hotel',
  templateUrl: './view-hotel.component.html',
  styleUrls: ['./view-hotel.component.css']
})
export class ViewHotelComponent implements OnInit {

  public hotel: IHotel;
  public imagenes: IImage[];
  public id_hotel: number = 0;
  public calificacion: ICalificacion[];
  public error: string = 'Ha ocurrido un error, recargar pagina';

  constructor(
    private _hotelesService: HotelesService,
    private _route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.getDetailHotel();
  }

  public getDetailHotel(): void {
    this._route.params.subscribe(params => {
      this.id_hotel = +params['id'];
      this._hotelesService.getHotelForId(this.id_hotel).subscribe(hot => {
        this.hotel = hot.hotels[0];
        this.imagenes = hot.hotels[0].Image;
      });
    });
  }
}
