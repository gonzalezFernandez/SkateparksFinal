import {
  HttpClient,
  HttpEvent,
  HttpHeaders,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Region } from '../skatepark/region';
import { AuthService } from '../usuarios/auth.service';

@Injectable({
  providedIn: 'root',
})
export class RegionService {
  urlEndPoint: string = 'http://localhost:8087/api/regions';

  urlEndPointPost: string = 'http://localhost:8087/api/region';

  constructor(private http: HttpClient, private authService: AuthService) {}

  httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  agregarAuthorizationHeader(): any {
    let token = this.authService.token;
    if (token != null) {
      return this.httpHeaders.append('Authorization', 'Bearer ' + token);
    }

    return this.httpHeaders;
  }

  /*getRegions():Observable<Region[]>{
    return of(CLIENTES);
  }*/
  getRegions(): Observable<Region[]> {
    return this.http
      .get(this.urlEndPoint)
      .pipe(map((response) => response as Region[]));
  }

  //metodo de post para insertar regions
  create(region: Region): Observable<Region> {
    return this.http.post<Region>(this.urlEndPointPost, region, {
      headers: this.agregarAuthorizationHeader(),
    });
  }

  //buscar region por id
  getRegion(id: number): Observable<Region> {
    return this.http.get<Region>(`${this.urlEndPoint}/${id}`, {
      headers: this.agregarAuthorizationHeader(),
    });
  }

  //actualizar region
  update(region: Region): Observable<Region> {
    return this.http.put<Region>(
      `${this.urlEndPoint}/${region.id}`,
      region,
      { headers: this.agregarAuthorizationHeader() }
    );
  }

  //eliminar region
  delete(id: number): Observable<Region> {
    return this.http.delete<Region>(`${this.urlEndPointPost}/${id}`, {
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
