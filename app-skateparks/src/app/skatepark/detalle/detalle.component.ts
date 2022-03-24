import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { Skatepark } from '../skatepark';
import { SkateparkService } from '../skateparks.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: [
  ]
})
export class DetalleComponent implements OnInit {

  skatepark!:Skatepark;
  fotoSeleccionada!:File;
  progreso!:number;
  imageSrc!:string;


  constructor( private skateparkService:SkateparkService,
     private activedRoute:ActivatedRoute) { }

  ngOnInit(): void {

    this.imageSrc = '/assets/images/SkatePlaceHolder.png';

    this.activedRoute.paramMap.subscribe(
      params => {
        let id:number = +params.get('id')!;

        if(id){
          this.skateparkService.getSkatepark(id)
          .subscribe( resp => this.skatepark = resp);
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
      this.skateparkService.subirImagen(this.fotoSeleccionada,this.skatepark.id)
      .subscribe(event =>{

        if(event.type === HttpEventType.UploadProgress){
          this.progreso = Math.round((event.loaded/event.total!)*100);
        }else if(event.type === HttpEventType.Response){
          let response:any = event.body;
          this.skatepark = response.skatepark as Skatepark;

          swal('La imagen se ha subido correctamente!',response.mensaje,'success');
        }

      });
    }
  }



}
