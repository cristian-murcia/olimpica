import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUsuario } from 'src/app/models/usuario/usuario.interface';
import { StorageService } from './storage.service';
@Injectable({
  providedIn: 'root'
})
export class LocalService {

  public tranfer = new BehaviorSubject({} as IUsuario);
  public usuario = this.tranfer.asObservable();

  constructor(private storageService: StorageService) { }

  // Set the json data to local
  setJsonValue(key: string, value: any) {
    this.storageService.secureStorage.setItem(key, value);
  }
  // Get the json value from local
  getJsonValue(key: string) {
    return this.storageService.secureStorage.getItem(key);
  }// Clear the local
  clearToken() {
    return this.storageService.secureStorage.clear();
  }

  public change() {
    let data = this.getJsonValue('user');

    this.tranfer.next(data || null);
  }
}
