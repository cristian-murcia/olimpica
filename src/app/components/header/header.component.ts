import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Coderror } from 'src/app/core/enum/coderror';
import { LocalService } from 'src/app/core/service/local.service';
import { IUsuario } from 'src/app/models/usuario/usuario.interface';
import { UsuarioService } from 'src/app/services';
import Swal from 'sweetalert2';
import { ViewCalificacionComponent } from '../view-calificacion';
import { Router } from '@angular/router';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public filterStar: number = 5;
  public errorCreate: boolean;
  public errorLogin: boolean;
  public usuario: IUsuario;

  public formCreateUser: FormGroup;
  public formLogin: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private _usuarioService: UsuarioService,
    private _storage: LocalService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this._storage.usuario.subscribe(result => this.usuario = result);
    this.createForm();
    this.loginForm();
    this._storage.change();
  }

  public async createUser(): Promise<void> {

    if (this.formCreateUser.invalid) {
      this.errorCreate = true;
      return;
    }

    let newUsuario = this.formCreateUser.value;
    let result = await this._usuarioService.createuser(newUsuario);

    if (result.code == Coderror.Exitoso) {
      Swal.fire('Satisfactorio', result.mensaje, 'success');
    } else {
      Swal.fire('Ha ocurrido un problema', result.body, 'error');
    }

    this.errorCreate = false;
    this.formCreateUser.reset();
    return;
  }

  public async login(): Promise<void> {
    if (this.formLogin.invalid) {
      this.errorLogin = true;
      return;
    }

    let result = await this._usuarioService.loginuser(
      this.formLogin.controls.userMail.value,
      this.formLogin.controls.userPassword.value
    );

    if (result.code == Coderror.Exitoso) {
      Swal.fire('Satisfactorio', result.mensaje, 'success');
      this.usuario = result.usuario;
      this._storage.setJsonValue('user', this.usuario);
      this._storage.change();

      if(this.formLogin.controls.userMail.value === 'admin@admin.com'){
        this._router.navigate(['/admin'])
      } else {
        this._router.navigate(['/inicio'])
      }

    } else {
      Swal.fire('Ha ocurrido un problema', result.mensaje, 'error');
    }

    this.errorLogin = false;
    this.formLogin.reset();
    return;
  }

  public cerrarSesion() {
    this._storage.clearToken();
    this._storage.change();
  }

  public createForm(): void {
    this.formCreateUser = this.formBuilder.group({
      userName: ['',
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern('^([a-zA-Z._-]+ ?[a-zA-z._-]+?)+$')
        ]
      ],
      userSurname: ['',
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern('^([a-zA-Z._-]+ ?[a-zA-z._-]+?)+$')
        ]
      ],
      userPassword: ['',
        [
          Validators.required,
          Validators.maxLength(255),
          Validators.pattern('^([a-zA-Z0-9._-]+ ?[a-zA-Z0-9._-]+?)+$')
        ]
      ],
      userMail: [
        '',
        [
          Validators.required,
          Validators.maxLength(255),
          Validators.email,
          Validators.pattern(`^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$`),
        ]
      ]
    });
  }

  public loginForm(): void {
    this.formLogin = this.formBuilder.group({
      userPassword: ['',
        [
          Validators.required,
          Validators.maxLength(255),
          Validators.pattern('^([a-zA-Z0-9._-]+ ?[a-zA-Z0-9._-]+?)+$')
        ]
      ],
      userMail: [
        '',
        [
          Validators.required,
          Validators.maxLength(255),
          Validators.email,
          Validators.pattern(`^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$`),
        ]
      ]
    });
  }

}
