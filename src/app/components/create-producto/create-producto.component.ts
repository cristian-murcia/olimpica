import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { Coderror } from 'src/app/core/enum/coderror';
import { HotelesService } from 'src/app/services';
import { Md5 } from 'ts-md5';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-producto',
  templateUrl: './create-producto.component.html',
  styleUrls: ['./create-producto.component.css']
})
export class CreateProductoComponent implements OnInit {

  public formProducto: FormGroup;
  public errorCreate: boolean;
  hotel_hotelID: number;
  public selectedImages: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private readonly _productService: HotelesService
  ) { }

  ngOnInit(): void {
    this.productoForm();
  }

  public async createProducto(): Promise<void> {
    const request = {
      hotelName: this.formProducto.controls.hotelName.value,
      precio: this.formProducto.controls.precio.value,
      categoria: this.formProducto.controls.categoria.value
    };
    let result = await this._productService.createProducto(request);
    this.hotel_hotelID = result.body.hotelID;

    if (result.code == Coderror.Exitoso) {
      this.sendImageToServer();

      Swal.fire('Satisfactorio', 'Producto creado con éxito', 'success');
    } else {
      Swal.fire('Ha ocurrido un problema', result.body, 'error');
    }

    this.errorCreate = false;
    this.formProducto.reset();
    return;
  }

  base64ToMd5(base64Data: string) {
    const md5Value = Md5.hashStr(base64Data);
    return md5Value;
  }

  onFileSelected(event: any, index: number) {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.selectedImages[index] = e.target.result;
        this.formProducto.controls['img' + index].setValue(this.selectedImages[index]);
      };

      reader.readAsDataURL(file);
    }

  }

  async sendImageToServer(): Promise<any> {
    this.selectedImages.forEach(async item => {
      const md5Value = this.base64ToMd5(item);
      await this._productService.createImg({
        hotel_hotelID: this.hotel_hotelID,
        urlData: item
      });
    });

  }

  public productoForm(): void {
    this.formProducto = this.formBuilder.group({
      hotelName: ['',
        [
          Validators.required,
          Validators.maxLength(255),
          Validators.pattern('^([a-zA-Z0-9._-]+ ?[a-zA-Z0-9._-]+?)+$')
        ]
      ],
      precio: [
        '',
        [
          Validators.required,
          Validators.maxLength(20)
        ]
      ],
      categoria: [
        '',
        [
          Validators.required,
          Validators.maxLength(20)
        ]
      ],
      img1: [
        '',
        [
          Validators.required,
          Validators.maxLength(8000)
        ]
      ],
      img2: [
        '',
        [
          Validators.required,
          Validators.maxLength(8000)
        ]
      ],
      img3: [
        '',
        [
          Validators.required,
          Validators.maxLength(8000)
        ]
      ]
    });
  }


}
