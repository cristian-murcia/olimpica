import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Componentes
import {
    HeaderComponent,
    ListaHotelesComponent,
    ViewCalificacionComponent,
    ViewHotelComponent,
    AdminComponent,
    CreateCategoriaComponent,
    CreateProductoComponent,
} from './components';

const appRoutes: Routes = [
    { path: '', component: ListaHotelesComponent },
    { path: 'inicio', component: ListaHotelesComponent },
    { path: 'hotel/:id', component: ViewHotelComponent },
    { path: 'admin', component: AdminComponent },
    { path: 'create-categoria', component: CreateCategoriaComponent },
    { path: 'create-producto', component: CreateProductoComponent },
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);
