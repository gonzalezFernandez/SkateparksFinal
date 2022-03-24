import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Region } from 'src/app/skatepark/region';
import swal from 'sweetalert2';
import { RegionService } from '../regions.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalleR.component.html',
  styles: [
  ]
})
export class DetalleRComponent implements OnInit {

  region!:Region;
  fotoSeleccionada!:File;
  progreso!:number;
  imageSrc!:string;


  constructor( private regionService:RegionService,
     private activedRoute:ActivatedRoute) { }

  ngOnInit(): void {

    this.imageSrc = '/assets/images/RegionPlaceHolder.jpg';

    this.activedRoute.paramMap.subscribe(
      params => {
        let id:number = +params.get('id')!;

        if(id){
          this.regionService.getRegion(id)
          .subscribe( resp => this.region = resp);
        }


      }
    );

  }

  seleccionarImagen(event:any){
    this.fotoSeleccionada = event.target.files[0];
    console.log(this.fotoSeleccionada);
  }

  subirImagen():void{
    if(!this.fotoSeleccionada){
      swal('Error','Debe selecionar una imagen','error');

    }else{
      this.regionService.subirImagen(this.fotoSeleccionada,this.region.id)
      .subscribe(event =>{

        if(event.type === HttpEventType.UploadProgress){
          this.progreso = Math.round((event.loaded/event.total!)*100);
        }else if(event.type === HttpEventType.Response){
          let response:any = event.body;
          this.region = response.region as Region;

          swal('La imagen se ha subido correctamente!',response.mensaje,'success');
        }

      });
    }
  }



}
