import { Component, OnInit,OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subcripction : Subscription;

  constructor() {
    this.subcripction= this.regresaObservable()
      .subscribe(
        numero => console.log('sub', numero),
        error => console.error('Error en el obs', error),
        () => console.log('el observador termino'));
  }

  ngOnInit() {
  }
  ngOnDestroy(){
    console.log('la pagina se va a cerrar');
    this.subcripction.unsubscribe();
  }
  regresaObservable(): Observable<any> {
    return new Observable((observer: Subscriber<any>) => {
      let contador = 0;
      let intervalo = setInterval(() => {
        contador++;
        const SALIDA = {
          valor: contador
        };
        observer.next(SALIDA);
        //if (contador === 3) {
        //clearInterval(intervalo);
        //observer.complete();
        //}

        //if (contador === 2) {
        //clearInterval(intervalo);
        // observer.error('Error');
        // }
      }, 1000);
    }).pipe(
      map(resp => resp.valor),
      filter((valor, index) => {
        //console.log('filter', valor, index);
        if ((valor % 2) === 1) {
          //impar
          return true;
        } else {
          return false;
        }
      })
    );
  }
}
