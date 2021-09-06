import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FeedBackService } from 'src/app/services/feed-back.service';
import { TransactionService } from '../../../services/transaction.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalService } from 'src/app/services/modal.service';


@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  displayedColumns: string[] = ['Nombre del estudiante', 'Nombre del profesor', 'Calificación', 'Comentario', 'fechaDeCreacion'];
  dataSource: MatTableDataSource<any>;
  documentForm: FormGroup;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public onStudents: boolean;
  public onTeachers: boolean;
  public onCourses: boolean;
  public onGrupalCourses: boolean;
  public onMetrics: boolean;
  public plaformValue: any;
  public showTableFeedback: boolean;
  public bannerImage: any;
  public bannerObject: any;

  constructor(
    private transactionService: TransactionService,
    private feedBackService: FeedBackService,
    private formBuilder: FormBuilder,
    private modalService: ModalService
  ) {
    this.onStudents = false;
    this.onTeachers = false;
    this.onCourses = false;
    this.onGrupalCourses = false;
    this.onMetrics = true;
    this.showTableFeedback = false;



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

  getFeedBacks() {
    this.feedBackService.getAllFeedBacks().subscribe(resp => {
      this.dataSource = new MatTableDataSource(resp);
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
      console.log("valor " + resp);
      this.plaformValue = resp;
    });
  }


  showPersonalCourses() {
    this.onStudents = false;
    this.onTeachers = false;
    this.onCourses = true;
    this.onGrupalCourses = false;
    this.onMetrics = false
  }


  showGrupalCourses() {
    this.onStudents = false;
    this.onTeachers = false;
    this.onCourses = false;
    this.onGrupalCourses = true;
    this.onMetrics = false
  }


  showTeachers() {
    this.onStudents = false;
    this.onTeachers = true;
    this.onCourses = false;
    this.onGrupalCourses = false;
    this.onMetrics = false
  }


  showStudents() {
    this.onStudents = true;
    this.onTeachers = false;
    this.onCourses = false;
    this.onGrupalCourses = false;
    this.onMetrics = false
  }


  showMetrics() {
    this.onStudents = false;
    this.onTeachers = false;
    this.onCourses = false;
    this.onGrupalCourses = false;
    this.onMetrics = true
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
    console.log("BODYYY", bodyToSend);


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

}
