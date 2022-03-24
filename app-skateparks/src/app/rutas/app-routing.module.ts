import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SkateparksComponent } from '../skatepark/skateparks.component';
import { DetalleComponent } from '../skatepark/detalle/detalle.component';
import { FormComponent } from '../skatepark/form/form.component';
import { LoginComponent } from '../usuarios/login/login.component';
import { RegionsComponent } from '../region/regions.component';
import { FormRComponent } from '../region/form/formR.component';
import { DetalleRComponent } from '../region/detalle/detalleR.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/skateparks',
    pathMatch: 'full',
  },
  {
    path: 'skateparks',
    component: SkateparksComponent,
  },
  {
    path: 'skateparks/crear',
    component: FormComponent,
  },
  {
    path: 'skateparks/editar/:id',
    component: FormComponent,
  },
  {
    path: 'skateparks/ver/:id',
    component: DetalleComponent,
  },

  {
    path: 'regions',
    component: RegionsComponent,
  },
  {
    path: 'region/crear',
    component: FormRComponent,
  },
  {
    path: 'regions/editar/:id',
    component: FormRComponent,
  },
  {
    path: 'regions/ver/:id',
    component: DetalleRComponent,
  },


  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '**',
    redirectTo: '',
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
