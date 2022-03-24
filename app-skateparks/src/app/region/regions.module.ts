import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegionsComponent } from './regions.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from '../rutas/app-routing.module';

import { FormRComponent } from './form/formR.component';
import { DetalleRComponent } from './detalle/detalleR.component';
import { AuthService } from '../usuarios/auth.service';



@NgModule({
  declarations: [
    RegionsComponent,
    FormRComponent,
    DetalleRComponent
  ],
  providers:[
    AuthService
  ],
  imports: [
    CommonModule,
    FormsModule,
    AppRoutingModule,

  ],
  exports:[
    RegionsComponent,
    FormRComponent,
    DetalleRComponent
  ]
})
export class RegionsModule { }
