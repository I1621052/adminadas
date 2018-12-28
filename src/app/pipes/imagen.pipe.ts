import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuario'): any {
    let url = URL_SERVICIOS + '/img';
    if (!img){
      return url + '/usuarios/xyz'
    }

    if( img.indexOf('https')>=0){
      return img;
    }

    if(tipo = 'usuario'){
       url += '/usuarios/' + img;
    }else{
      console.log('tipo de imagen no exite, usuario');
      url +='/usuarios/xyz';
    }
    return url;
  }

}
