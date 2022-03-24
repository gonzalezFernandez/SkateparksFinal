import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { AuthService } from '../auth.service';
import { Usuario } from '../usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent implements OnInit {
  titulo: string = 'Nuevo Usuario';

  usuario: Usuario = new Usuario();

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  login(): void {
    console.log(this.usuario);

    if (this.usuario.username == null || this.usuario.password == null) {
      swal('Error Login', 'Username o password vacias!', 'error');
      return;
    }

    this.authService.login(this.usuario).subscribe(
      (resp) => {
        console.log(resp);
        this.authService.guardarUsuario(resp.access_token);
        this.authService.guardarToken(resp.access_token);
        let usuario = this.authService.usuario;

        swal(
          'Login',
          `Hola ${usuario.username}, ha iniciado con éxito`,
          'success'
        );
      },
      (err) => {
        if (err.status == 400) {
          swal('Error login', 'Usuario o contraseña incorrectos!', 'error');
        }
      }
    );
  }
}
