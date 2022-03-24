import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';
import { Region } from 'src/app/skatepark/region';
import { RegionService } from '../regions.service';

@Component({
  selector: 'app-form',
  templateUrl: './formR.component.html',
  styles: [
  ]
})
export class FormRComponent implements OnInit {

  titulo:string ="Regiones";

  region: Region = new Region();

  regiones!:Region[];

  constructor( private regionService:RegionService,
    private router:Router, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {

      this.regionService.getRegiones().subscribe(
        resp => this.regiones = resp
      );

      this.activatedRoute.paramMap.subscribe(
        params =>{
          let id = +params.get('id')!;
          if(id){
            this.regionService.getRegion(id).subscribe(
              (resp) => this.region = resp
            )
          }
        }
      );
  }

  compararRegion(o1:Region,o2:Region):boolean{
    if(o1 === undefined && o2 ===undefined){
      return true;
    }

    return o1 === null || o2===null ||
     o1===undefined ||
      o2===undefined ? false : o1.id===o2.id;

  }


  create():void{
    console.log("formulario enviado");
    console.log(this.region);
    this.regionService.create(this.region).subscribe(
      resp => {
        swal('Nuevo Region',`${this.region.nombre} creado con éxito`,'success');
        this.router.navigate(['/regions']);
      },
      err=>{
        console.log('Codigo de error backend',err.status);
      }
    );
  }

  update():void{
    console.log(this.region);
    this.regionService.update(this.region).subscribe(
      resp=>{
        this.router.navigate(['/regions']);
        swal('Region Actualizada',`${this.region.nombre}`,'success');
      },
      err=>{
        console.error('Codigo del error desde el backend'+err.status);
        console.error(err.error.errors)
      }
    );
  }

}
