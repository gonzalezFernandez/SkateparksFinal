import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';
import { Skatepark } from '../skatepark';
import { SkateparkService } from '../skateparks.service';
import { Region } from '../region';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styles: [
  ]
})
export class FormComponent implements OnInit {

  titulo:string ="Nuevo Spot";

  skatepark: Skatepark = new Skatepark();

  regiones!:Region[];

  constructor( private skateparkService:SkateparkService,
    private router:Router, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {

      this.skateparkService.getRegiones().subscribe(
        resp => this.regiones = resp
      );

      this.activatedRoute.paramMap.subscribe(
        params =>{
          let id = +params.get('id')!;
          if(id){
            this.skateparkService.getSkatepark(id).subscribe(
              (resp) => this.skatepark = resp
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
    console.log(this.skatepark);
    this.skateparkService.create(this.skatepark).subscribe(
      resp => {
        swal('Nuevo Spot',`${this.skatepark.nombre} creado con éxito`,'success');
        this.router.navigate(['/skateparks']);
      },
      err=>{
        console.log('Codigo de error backend',err.status);
      }
    );
  }

  update():void{
    console.log(this.skatepark);
    this.skateparkService.update(this.skatepark).subscribe(
      resp=>{
        this.router.navigate(['/skateparks']);
        swal('Spot Actualizado',`${this.skatepark.nombre}`,'success');
      },
      err=>{
        console.error('Codigo del error desde el backend'+err.status);
        console.error(err.error.errors)
      }
    );
  }

}
