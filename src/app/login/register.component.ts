import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import swal from 'sweetalert';
import { switchAll } from 'rxjs/operators';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';
declare function init_plugings();
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {
  forma: FormGroup;

  constructor(
    public _usuarioService: UsuarioService,
    public router:Router
  ) { }

  sonIguales(campo1: String, campo2: String) {
    return (group: FormGroup) => {
      let pass1 = group.controls[campo1.toString()].value;
      let pass2 = group.controls[campo2.toString()].value;
      if (pass1 === pass2) {
        return null;
      }
      return {
        sonIguales: true
      }
    }
  }

  ngOnInit() {
    init_plugings();
    this.forma = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      correo: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      password2: new FormControl(null, Validators.required),
      condiciones: new FormControl(false),
    }, { validators: this.sonIguales('password', 'password2') });

    this.forma.setValue({
      nombre: 'test',
      correo: 'test@gmail.com',
      password: '123456',
      password2: '123456',
      condiciones: true
    });
  }
  registrarUsuario() {
    if( this.forma.invalid){
      return;
    }
    if(!this.forma.value.condiciones){
      swal('Importante','Debe de aceptar las condiciones','warning');
      return;
    }
    let usuario = new Usuario(
      this.forma.value.nombre,
      this.forma.value.correo,
      this.forma.value.password
    );
    this._usuarioService.crearUsuario(usuario)
    .subscribe( resp => this.router.navigate(['/login']));
  }
}
