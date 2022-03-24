import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { AuthService } from '../usuarios/auth.service';
import { Skatepark } from './skatepark';
import { SkateparkService } from './skateparks.service';

@Component({
  selector: 'app-skateparks',
  templateUrl: './skateparks.component.html',
  styles: [
  ]
})
export class SkateparksComponent implements OnInit {

  imageSrc!:string;
  skateparks!: Skatepark[];

  

  constructor(private servicio: SkateparkService,public authService:AuthService) { }

  ngOnInit(): void {
    this.imageSrc = '/assets/images/SkatePlaceHolder.png';

    this.servicio.getSkateparks().subscribe(
       resp => this.skateparks = resp
    );
  }



 delete( skatepark:Skatepark):void{
   swal({
     title:'Está Seguro?',
     text: `Seguro que desea eliminar el skatepark ${skatepark.nombre} de ${skatepark.region.nombre}`,
     type: 'warning',
     showCancelButton: true,
     cancelButtonColor: '#3085d6',
     confirmButtonColor: '#d33',
     confirmButtonText: 'Si, Eliminar!',
     cancelButtonText: 'No, Cancelar',
     confirmButtonClass: 'btn btn-success',
     cancelButtonClass: 'btn btn-danger',
     buttonsStyling: false,
     reverseButtons: true
   }).then((result)=>{
     if(result.value){
       this.servicio.delete(skatepark.id).subscribe(
         resp =>{
           this.skateparks = this.skateparks.filter(cli => cli !== skatepark)
           swal('skatepark eliminado', `Skatepark ${skatepark.nombre} eliminado con éxito`, 'success');
         }
       )
     }
   });
  }

}
