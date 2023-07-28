import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { alerts } from 'src/app/helpers/alerts';
import { functions } from 'src/app/helpers/functions';
import { Ilogin } from 'src/app/interface/login';
import { LoginService } from 'src/app/service/login.service';
import { Router } from '@angular/router';
import { Usuarios} from '../../interface/usuarios'
import { AuthService } from 'src/app/service/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public f = this.form.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  })

  formSubmitted = false;
  errorForm = "";
  usuarios: Usuarios[] = [];
  rol = [''];

  constructor(private form: FormBuilder, private loginService: LoginService, private router: Router,
    private authService: AuthService){}


  login(){

    this.formSubmitted = true;
    
    if(this.f.invalid){
      return;
    }

    const data: Ilogin = {
      email: this.f.controls.email.value as string,
      password: this.f.controls.password.value as string,
      returnSecureToken: true
    }

    const usuario: Usuarios = {
      id: '',
      email: this.f.controls.email.value as string,
      rol: []
    };

    this.authService.token(data).subscribe(
      (resp: any) => console.log(resp)
    )

    this.authService.loginEmailUser(data.email, data.password).then(
      (res)=>{

        this.router.navigateByUrl("docentes")
        // this.router.navigate(['admin/list-books']);
        console.log("este resp", res)
      },
      (err)=>{
        

        if(err.error.error.message == "EMAIL_NOT_FOUND"){
          alerts.basicAlert("Error", "Invalid email", "error");
        }else if(err.error.error.message == "INVALID_PASSWORD"){
          alerts.basicAlert("Error", "Invalid password", "error");
        }else{
          // alerts.basicAlert("Error", "An error ocurred", "error");
          this.router.navigateByUrl("/")

        }

        
      }
    );

  }

  creaUsuario(usuario: Usuarios){



  }

  usuarioDatabase(usuario: Usuarios): any{
    
    
    this.authService.getData().subscribe(
      (resp: any) => {
        this.usuarios = Object.keys(resp).map(a => ({
          email: resp[a].email,
          rol: resp[a].rol
        }) as Usuarios).filter(user => user.email == usuario.email);
        console.log(usuario.email);
        if (this.usuarios.length > 0) {
          usuario.rol = this.usuarios[0].rol;
          
        }
      },
      (error: any) => {
        // Manejar el error de la solicitud de datos si es necesario.
        console.error('Error al obtener los datos de usuarios.', error);
      });
      return true
  }

  getRol(){
    return this.rol;
  }

  invalidField(field:string){

    return functions.invalidField(field, this.f,  this.formSubmitted)
  }

}