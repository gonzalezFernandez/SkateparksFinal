import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './rutas/app-routing.module';
import { AppComponent } from './app.component';
import { SkateparksModule } from './skatepark/skateparks.module';
import { SkateparkService } from './skatepark/skateparks.service';
import { FooterModule } from './footer/footer.module';
import { HeaderModule } from './header/header.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './usuarios/auth.service';
import { RegionsModule } from './region/regions.module';
import { RegionService } from './region/regions.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SkateparksModule,
    RegionsModule,
    FooterModule,
    HeaderModule,
    UsuariosModule,
    HttpClientModule
  ],
  providers: [
    RegionService,
    SkateparkService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
