import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { Region } from '../skatepark/region';
import { AuthService } from '../usuarios/auth.service';
import { RegionService } from './regions.service';

@Component({
  selector: 'app-regions',
  templateUrl: './regions.component.html',
  styles: [
  ]
})
export class RegionsComponent implements OnInit {

  imageSrc!:string;
  regions!: Region[];



  constructor(private servicio: RegionService,public authService:AuthService) { }

  ngOnInit(): void {
    this.imageSrc = '/assets/images/RegionPlaceHolder.jpg';

    this.servicio.getRegions().subscribe(
       resp => this.regions = resp
    );
  }



 delete( region:Region):void{
   swal({
     title:'Está Seguro?',
     text: `Seguro que desea eliminar el region ${region.nombre} ?`,
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
       this.servicio.delete(region.id).subscribe(
         resp =>{
           this.regions = this.regions.filter(cli => cli !== region)
           swal('region eliminada', `Region ${region.nombre} eliminado con éxito`, 'success');
         }
       )
     }
   });
  }

}
