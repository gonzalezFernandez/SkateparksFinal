import {
  HttpClient,
  HttpEvent,
  HttpHeaders,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { AuthService } from '../usuarios/auth.service';
import { Skatepark } from './skatepark';
import { Region } from './region';

@Injectable({
  providedIn: 'root',
})
export class SkateparkService {
  urlEndPoint: string = 'http://localhost:8087/api/skateparks';

  urlEndPointPost: string = 'http://localhost:8087/api/skatepark';

  constructor(private http: HttpClient, private authService: AuthService) {}

  httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  agregarAuthorizationHeader(): any {
    let token = this.authService.token;
    if (token != null) {
      return this.httpHeaders.append('Authorization', 'Bearer ' + token);
    }

    return this.httpHeaders;
  }

  /*getSkateparks():Observable<Skatepark[]>{
    return of(CLIENTES);
  }*/
  getSkateparks(): Observable<Skatepark[]> {
    return this.http
      .get(this.urlEndPoint)
      .pipe(map((response) => response as Skatepark[]));
  }

  //metodo de post para insertar skateparks
  create(skatepark: Skatepark): Observable<Skatepark> {
    return this.http.post<Skatepark>(this.urlEndPointPost, skatepark, {
      headers: this.agregarAuthorizationHeader(),
    });
  }

  //buscar skatepark por id
  getSkatepark(id: number): Observable<Skatepark> {
    return this.http.get<Skatepark>(`${this.urlEndPoint}/${id}`, {
      headers: this.agregarAuthorizationHeader(),
    });
  }

  //actualizar skatepark
  update(skatepark: Skatepark): Observable<Skatepark> {
    return this.http.put<Skatepark>(
      `${this.urlEndPointPost}/${skatepark.id}`,
      skatepark,
      { headers: this.agregarAuthorizationHeader() }
    );
  }

  //eliminar skatepark
  delete(id: number): Observable<Skatepark> {
    return this.http.delete<Skatepark>(`${this.urlEndPointPost}/${id}`, {
      headers: this.agregarAuthorizationHeader(),
    });
  }

  // mostrar regiones
  getRegiones(): Observable<Region[]> {
    return this.http.get<Region[]>(`${this.urlEndPoint}/regiones`, {
      headers: this.agregarAuthorizationHeader(),
    });
  }

   //subir imagen
   subirImagen(archivo: File, id:any):Observable<HttpEvent<any>>{
    let formData = new FormData();

    formData.append("archivo",archivo);
    formData.append("id",id);

    let httpHeaders = new HttpHeaders();

    let token= this.authService.token;

    if(token != null){
      httpHeaders = httpHeaders.append('Authorization','Bearer '+token);
    }

    const req = new HttpRequest('POST',`${this.urlEndPointPost}/upload`,formData,{headers:httpHeaders});

    return this.http.request(req).pipe(
      resp =>resp
    );
  }

}
