import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { FeedBackService } from 'src/app/services/feed-back.service';
import { TransactionService } from '../../../services/transaction.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalService } from 'src/app/services/modal.service';
import { RetirementsService } from 'src/app/services/retirements.service';
import Swal from 'sweetalert2';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  @ViewChild('transactionSupportModal') transactionSupportModal: TemplateRef<any>;

  displayedColumns: string[] = ['Nombre del estudiante', 'Nombre del profesor', 'Calificación', 'Comentario', 'fechaDeCreacion'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumnsTwo: string[] = ['FechaDeRetiro', 'NombreDelDocente', 'CantidadDelRetiro', 'IdDeReferencia', 'Estado', 'CambiarEstado'];
  dataSourceTwo: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginatorTWo: MatPaginator;
  @ViewChild(MatSort) sortTwo: MatSort;


  documentForm: FormGroup;

  public onStudents: boolean;
  public onTeachers: boolean;
  public onCourses: boolean;
  public onGrupalCourses: boolean;
  public onMetrics: boolean;
  public plaformValue: any;
  public showTableFeedback: boolean;
  public bannerImage: any;
  public bannerObject: any;
  public onRetirements: boolean;
  public showSpinner: boolean;
  public selectedSupportInformation: File;
  public rowSelected: any;

  constructor(
    private transactionService: TransactionService,
    private feedBackService: FeedBackService,
    private formBuilder: FormBuilder,
    private modalService: ModalService,
    private retirementService: RetirementsService,
    private boostrapModalService: NgbModal
  ) {
    this.onStudents = false;
    this.onTeachers = false;
    this.onCourses = false;
    this.onGrupalCourses = false;
    this.onMetrics = true;
    this.showTableFeedback = false;
    this.showSpinner = false;
  }

  get documentName() {
    return this.documentForm.get('documentName');
  }

  get initialDate() {
    return this.documentForm.get('initialDate');
  }

  get endDate() {
    return this.documentForm.get('endDate');
  }

  ngOnInit(): void {
    this.documentForm = this.formBuilder.group({
      initialDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      documentName: ['', [Validators.required]]
    });
    this.getPlataformValue();
    this.getFeedBacks();
    this.getAllRetirements();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, 500);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  applyFilterTwo(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceTwo.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceTwo.paginator) {
      this.dataSourceTwo.paginator.firstPage();
    }
  }

  getFeedBacks() {
    this.feedBackService.getAllFeedBacks().subscribe(resp => {
      this.dataSource = new MatTableDataSource(resp);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, 1000);
    });
  }

  showFeedback() {
    this.showTableFeedback = true;
    this.getFeedBacks();
  }

  closeFeedBack() {
    this.showTableFeedback = false;
  }

  getPlataformValue() {
    this.transactionService.getPlataformValues().subscribe(resp => {
      this.plaformValue = resp;
    });
  }


  showPersonalCourses() {
    this.onStudents = false;
    this.onTeachers = false;
    this.onCourses = true;
    this.onGrupalCourses = false;
    this.onMetrics = false
    this.onRetirements = false;
  }


  showGrupalCourses() {
    this.onStudents = false;
    this.onTeachers = false;
    this.onCourses = false;
    this.onGrupalCourses = true;
    this.onMetrics = false
    this.onRetirements = false;
  }


  showTeachers() {
    this.onStudents = false;
    this.onTeachers = true;
    this.onCourses = false;
    this.onGrupalCourses = false;
    this.onMetrics = false
    this.onRetirements = false;
  }


  showStudents() {
    this.onStudents = true;
    this.onTeachers = false;
    this.onCourses = false;
    this.onGrupalCourses = false;
    this.onMetrics = false
    this.onRetirements = false;
  }


  showMetrics() {
    this.onStudents = false;
    this.onTeachers = false;
    this.onCourses = false;
    this.onGrupalCourses = false;
    this.onMetrics = true
    this.onRetirements = false;
  }

  showRetirements() {
    this.onStudents = false;
    this.onTeachers = false;
    this.onCourses = false;
    this.onGrupalCourses = false;
    this.onMetrics = false
    this.onRetirements = true;
    this.getAllRetirements();
  }

  generateStudy() {
    let initalDateToFormate = this.documentForm.value.initialDate;
    let endDateToFormate = this.documentForm.value.endDate;
    let documentName = this.documentForm.value.documentName;

    var d = new Date(initalDateToFormate),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    var e = new Date(endDateToFormate),
      monthe = '' + (e.getMonth() + 1),
      daye = '' + e.getDate(),
      yeare = e.getFullYear();

    if (monthe.length < 2)
      monthe = '0' + monthe;
    if (daye.length < 2)
      daye = '0' + daye;

    let initialDateToSend = [year, month, day].join('-');
    let endDateToSend = [yeare, monthe, daye].join('-');


    let bodyToSend = {
      'initialDate': initialDateToSend,
      'finalDate': endDateToSend,
      'documentName': documentName
    }

    this.transactionService.createExcel(bodyToSend)
      .subscribe(resp => {
        const blob = new Blob([resp], { type: 'application/xlsx' });

        const data = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = data;
        link.download = `${documentName}.xlsx`;
        link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

      });
  }

  idBannerToUploadImage() {
    this.modalService.openModal();
  }

  refreshPicture() {
    this.bannerImage = '';
    this.transactionService.getBannerInformation(1).subscribe((resp) => {
      this.bannerObject = resp;
    });

    setTimeout(() => {
      this.bannerImage = this.bannerObject.urlBanner;
    }, 2000)
  }

  getAllRetirements() {
    this.retirementService.getAllRetirments().subscribe(async resp => {
      await this.showTableOfRetirements(resp);
    });
  }

  showTableOfRetirements(resp: any) {
    this.dataSourceTwo = new MatTableDataSource(resp);
    this.dataSourceTwo.paginator = this.paginatorTWo;
    this.dataSourceTwo.sort = this.sortTwo;
  }

  addSupportTransaction(retirementIdValue: any) {
    this.selectedSupportInformation = null;
    let ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false,
      centered: true
    };
    this.boostrapModalService.open(this.transactionSupportModal, ngbModalOptions);
    this.rowSelected = retirementIdValue;
  }

  retirementDone() {
    this.retirementService.updateRetirementState( this.rowSelected.retirementId).subscribe(async resp => {
      this.showSpinner = true;
      await this.sendEmailNotification( this.rowSelected);
    });

  }

  sendEmailNotification(retirementObject: any) {
    let bodyToSendEmail: any = {
      'idReference': retirementObject.retirementId,
      'idTeacher': retirementObject.teacherIdentifier
    }
    this.retirementService.sentEmailForSupportTransaction(bodyToSendEmail).subscribe(async resp => {
      await this.getAllRetirements();
      await this.showNotification();
    });
  }

  showNotification() {
    Swal.fire({
      'title': `Cambiado de estado realizado con exito!`,
      'text': `Se ha enviado un correo al docente notificando que el pago se ha realizado.`,
      'icon': `success`,
      showCloseButton: true,
      showCancelButton: false,
      confirmButtonText: `Continuar`,
      confirmButtonColor: '#17a2b8',
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        this.showSpinner = false;
      }
    });
  }

  addTransactionSupport(event) {
    this.selectedSupportInformation = event.target.files[0];

    if ((this.selectedSupportInformation.type.indexOf('image') < 0 && this.selectedSupportInformation.type.indexOf('application/pdf') == -1)
      || (this.selectedSupportInformation.type.indexOf('image') == -1 && this.selectedSupportInformation.type.indexOf('application/pdf') < 0)
    ) {
      Swal.fire('Error', 'El formato del archivo no corresponde a una imagen o pdf', 'error');
      this.selectedSupportInformation = null;
    }

    if (!this.selectedSupportInformation) {
      Swal.fire('Error', 'Se debe seleccionar un archivo pdf o imagen.', 'error');
    } else {
     this.retirementService.setSupportInformationMethod(this.selectedSupportInformation);
     Swal.fire('Subida exitosa', 'La Informacion se ha cargado con exito', 'success');
    }

  }

  closeModal() {
    this.modalService.closeModal();
  }
}
