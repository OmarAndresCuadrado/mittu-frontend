import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {

  constructor(
    private boostrapModalService: NgbModal
  ) { }


  @ViewChild('spinnerModal') spinnerModal: TemplateRef<any>;

  ngOnInit(): void {
    setTimeout(() => {
      this.openSpinnerModal();
    }, 1000);
    setTimeout(() => {
      this.boostrapModalService.dismissAll();
    }, 15000);
  }

  openSpinnerModal() {
    let ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false,
      size: 'sm',
      centered: true
    };
    this.boostrapModalService.open(this.spinnerModal, ngbModalOptions);
  }

}
