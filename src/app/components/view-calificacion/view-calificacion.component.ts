import { Component, Input, OnInit, DoCheck } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Coderror } from 'src/app/core/enum/coderror';
import { LocalService } from 'src/app/core/service/local.service';
import { ICalificacion } from 'src/app/models/calificaciones';
import { ICalificacionUser } from 'src/app/models/calificaciones/user-calificacion';
import { IUsuario } from 'src/app/models/usuario/usuario.interface';
import { CalificacionService, HotelesService, UsuarioService } from 'src/app/services';
import Swal from 'sweetalert2';

@Component({
  selector: 'view-calificacion',
  templateUrl: './view-calificacion.component.html',
  styleUrls: ['./view-calificacion.component.css']
})
export class ViewCalificacionComponent implements OnInit {
  @Input() public id_hotel: any;

  public error = '';
  public calificaciones: ICalificacionUser[];
  public calificacion: ICalificacion;
  public usuario: IUsuario;
  public formCalificacion: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private _calificacionService: CalificacionService,
    private _storage: LocalService
  ) {
  }

  ngOnInit(): void {
    this.createFormCalificacion();

    this._storage.usuario.subscribe((result) => {
      this.usuario = result;

      if (result && result.userID) {
        this.formCalificacion.controls.usuario_userID.setValue(this.usuario.userID);
        this.calificationMe();
        this.getCalifications(this.id_hotel, result.userID);
      }
      this.getCalifications(this.id_hotel);
    })
  }

  /**
   *
   * @param id_hotel
   */
  public async getCalifications(id_hotel: number, filter?: number): Promise<void> {

    let result = await this._calificacionService.getCalificationes(id_hotel);
    if (result.code != Coderror.Exitoso) {
      this.error = result.mensaje;
    } else {
      this.calificaciones = result.calificaciones;
    }
  }

  /**
   *
   * @param target
   */
  public changeStar(target: any) {
    this.formCalificacion.controls.estrellas.setValue(Number(target.value));
  }

  /**
   *
   */
  public async calificationMe(): Promise<void> {
    let result = await this._calificacionService.getMeCalification(this.id_hotel, this.usuario.userID);

    if (result.code == Coderror.Exitoso) {
      this.calificacion = result.calificacion;
      this.formCalificacion.patchValue({ ...result.calificacion });
    }
  }

  /**
   *
   * @returns
   */
  public async createAndUpdate(): Promise<void> {

    if (this.formCalificacion.invalid) {
      return;
    }

    let result = await this._calificacionService.createAndUpdateCalification(this.formCalificacion.value);
    if (result.code == Coderror.Exitoso) {
      Swal.fire('Satisfactorio', result.mensaje, 'success');
      if (result.calificacion) {
        this.calificacion = result.calificacion;
        this.formCalificacion.controls.idcalificacion.setValue(this.calificacion.idcalificacion);
      }

    } else {
      Swal.fire('Ha ocurrido un problema', result.mensaje, 'error');
    }
  }

  /**
   *
   * @param id_calificacion
   */
  public async removeCalificacion(id_calificacion: number): Promise<void> {
    let result = await this._calificacionService.removeCalificacion(id_calificacion);

    if (result.code == Coderror.Exitoso) {
      Swal.fire('Satisfactorio', result.mensaje, 'success');
      this.calificacion = result.calificacion;
      this.formCalificacion.reset();

    } else {
      Swal.fire('Ha ocurrido un problema', result.mensaje, 'error');
    }
  }

  /**
   *
   */
  private createFormCalificacion(): void {
    this.formCalificacion = this.formBuilder.group({
      idcalificacion: [''],
      comentario: [
        '', [
          Validators.required,
          Validators.pattern('^([a-zA-Z0-9._-]+ ?[a-zA-Z0-9._-]+?)+$')
        ]
      ],
      estrellas: ['', Validators.required],
      hotel_hotelID: [this.id_hotel, Validators.required],
      usuario_userID: ['', Validators.required],
    })
  }
}
