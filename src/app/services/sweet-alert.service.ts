import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import Sw, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SweetAlertService {

  constructor() { }


  simpleAlert(title: any, body: any, iconType: string, confirmButton: string, cancelButton: string) {
    Sw.fire({
      'title': `${title}`,
      'text': `${body}`,
      'icon': `${iconType}` as SweetAlertIcon,
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonText: `${confirmButton}`,
      cancelButtonText: `${cancelButton}`,
      confirmButtonColor: '#10d10d',
      cancelButtonColor: '#e3a807',
    });
  }


  simpleAlertWithObjects(title: any, body: any, iconType: string, confirmButton: string, cancelButton: string, objectOne?: any, objectTwo?: any) {
    Sw.fire({
      'title': `${title}`,
      'text': `${body} ${objectTwo.name + ' ' + objectTwo.lastName}`,
      'icon': `${iconType}` as SweetAlertIcon,
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonText: `${confirmButton}`,
      cancelButtonText: `${cancelButton}`,
      confirmButtonColor: '#10d10d',
      cancelButtonColor: '#e3a807',
    }).then((result) => {
      if (result.isConfirmed) {
        
      }
    });
  }
}
