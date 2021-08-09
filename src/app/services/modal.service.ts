import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  modal: boolean;
  constructor() {
    this.modal = false;
   }

  openModal() {
    this.modal = true;
   }

  closeModal() { 
    this.modal = false;
  }
}
