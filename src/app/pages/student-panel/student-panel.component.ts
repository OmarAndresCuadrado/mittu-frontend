import { Component, OnInit, ViewChild } from '@angular/core';
import { GrupalCoursesService } from '../../services/grupal-courses.service';
import { grupalCourseEntity } from '../../interfaces/grupalCourseEntity';
import { studentEntity } from '../../interfaces/studentEntity';
import { StudentService } from '../../services/student.service';
import { environment } from '../../../environments/environment.prod';
import Sw from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { TransactionService } from '../../services/transaction.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AuthService } from 'src/app/services/auth.service';
import { WebSocketService } from 'src/app/services/web-socket.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-student-panel',
  templateUrl: './student-panel.component.html',
  styleUrls: ['./student-panel.component.scss']
})
export class StudentPanelComponent implements OnInit {
  displayedColumns: string[] = ['Fecha', 'CantidadRecargada'];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumnsTwo: string[] = ['FechaDeLaTutoria', 'DuracionDeLaTutoria', 'NombreDelEstudiante', 'PagoRealizadoPorLaTutoria'];
  dataSourceTwo: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginatorTwo: MatPaginator;
  @ViewChild(MatSort) sortTwo: MatSort;

  public idStudent: any;
  public grupalCoursesFound: grupalCourseEntity[] = [];
  public showVar: boolean;
  public grupalCourses: boolean;
  public profiles: boolean;
  public transactions: boolean;
  public studentObject = new studentEntity();
  public endpoint_grupal_course_image = environment.grupalCourse.host_image;
  public studentTime: any;
  public openTransactions: any;
  public responseOne: any;
  public responseTwo: any;
  public listOfTransactions: any[];
  public usernameEmail: any;
  public userData: any;
  public costOfTransaction: any;
  public transferId: any;
  public transferIdFromDB: any;
  public idStudentImageToUpload: any;
  public studentImage: any;
  public endpoint_student_image = environment.student.host_image;
  public onTutoriasDetails;

  constructor(
    private grupalCoursesService: GrupalCoursesService,
    private studentService: StudentService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private transferService: TransactionService,
    public authService: AuthService,
    private webSocketService: WebSocketService,
    private modalService: ModalService
  ) {
    this.showVar = false;
    this.grupalCourses = false;
    this.profiles = false;
    this.transactions = false;
    this.onTutoriasDetails = true;
  }

  ngOnInit(): void {

    this.userData = JSON.parse(sessionStorage.getItem('user'));
    this.usernameEmail = this.userData.username;


    this.activatedRoute.queryParams.subscribe(params => {
      this.responseOne = params['lapResponseCode'];
      this.responseTwo = params['lapTransactionState'];
      this.costOfTransaction = params['TX_VALUE'];
      this.transferId = params['referenceCode'];
    });

    this.idStudent = sessionStorage.getItem('studentId');
    this.getListOfTransactions();
    this.getAllgrupalCoursesFromStudent();
    this.getStudentInformation();
    this.getStudentTime();


    if (this.responseOne == 'APPROVED' && this.responseTwo == 'APPROVED') {
      this.transactionApproved();
    } else if (this.responseTwo == 'DECLINED') {
      this.transactionReject();
    }


    setTimeout(() => {
      this.studentImage = this.studentObject.picture;
      this.getStudentImage();
    }, 1000)

    this.getStudentDetailTutorias();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, 500);
  }

  applyFilterTwo(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceTwo.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceTwo.paginator) {
      this.dataSourceTwo.paginator.firstPage();
    }
  }

  getStudentInformation() {
    let idStudent = this.idStudent;
    this.studentService.getStudentsById(idStudent).subscribe((resp) => {
      this.studentObject = resp;
      if (this.studentObject.picture === null || this.studentObject.picture === "null" || this.studentObject.picture === "") {
        this.studentObject.picture = "default.png";
      }
    });
  }

  getAllgrupalCoursesFromStudent() {
    this.grupalCoursesService.getAllgrupalCoursesFromStudent(this.idStudent).subscribe((grupalCourses) => {
      this.grupalCoursesFound = grupalCourses;
    });
  }

  goToMeet(meetUrl: any) {
    window.open(meetUrl, '_blank');
  }

  showNavbar() {
    this.showVar = true;
  }

  hideNavbar() {
    this.showVar = false;
  }

  showTutoriaDetails() {
    this.profiles = false;
    this.transactions = false;
    this.grupalCourses = false;
    this.onTutoriasDetails = true;
    this.getStudentDetailTutorias();
  }

  showGrupalCourses() {
    this.profiles = false;
    this.transactions = false;
    this.grupalCourses = true;
    this.onTutoriasDetails = false;
  }

  showProfile() {
    this.transactions = false;
    this.grupalCourses = false;
    this.profiles = true;
    this.onTutoriasDetails = false;
    this.getStudentTime();
  }

  showTransactions() {
    this.grupalCourses = false;
    this.profiles = false;
    this.transactions = true;
    this.onTutoriasDetails = false;
  }

  getStudentTime() {
    this.studentService.getStudentTime(this.idStudent).subscribe((resp) => {
      this.studentTime = resp;
    });
  }

  openTransaccionts() {
    this.openTransactions = true;
  }

  closeTransactions() {
    this.openTransactions = false;
  }

  transactionApproved() {
    this.makeTransaction();
    setTimeout(() => {
      this.setMoneyTransaction();
    }, 1000);
    Sw.fire({
      'title': `Transacción exitosa!`,
      'text': `tu saldo ha sido recargado con exito, podras ver tu nuevo saldo disponible en tu panel`,
      'icon': `success`,
      showCloseButton: false,
      showCancelButton: false,
      confirmButtonText: `Ir a mi panel`,
      confirmButtonColor: '#10d10d',
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href.split("?")[0];
        this.router.navigate(['/student-panel']);
        setTimeout(() => {
          location.reload();
        }, 500);
      } else if (result.isDismissed) {
        window.location.href.split("?")[0];
        this.router.navigate(['/student-panel']);
        setTimeout(() => {
          location.reload();
        }, 500);
      }
    });
  }

  transactionReject() {
    Sw.fire({
      'title': `A ocurrido un error durante la transacción!`,
      'text': `No se ha realizado ningun pago, podras consultar tu saldo actual en tu panel`,
      'icon': `error`,
      showCloseButton: false,
      showCancelButton: false,
      confirmButtonText: `Ir a mi panel`,
      confirmButtonColor: '#10d10d',
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        // this.router.navigate(['/student-panel']);
      }
    });
  }

  getListOfTransactions() {
    this.transferService.getAllListOfTransfers(this.idStudent).subscribe((resp) => {
      this.dataSource = new MatTableDataSource(resp);
    });
  }

  makeTransaction() {
    let objectOfTransaction: any = {
      "name": this.usernameEmail,
      "cost": this.costOfTransaction,
      "idStudent": this.idStudent,
      "transferCode": this.transferId
    };
    this.transferService.makeTransaction(objectOfTransaction).subscribe(resp => {
      resp
    })
  }

  setMoneyTransaction() {
    let bodyOfTransaction: any = {};
    let actualMoney: number = +this.studentObject.money;
    let transactionMoney: number = +this.costOfTransaction;
    let newMoney: number = (actualMoney + transactionMoney);
    bodyOfTransaction = {
      'money': newMoney,
      'studentId': this.idStudent
    }
    this.studentService.setMoney(bodyOfTransaction).subscribe((resp) => {
      resp;
    });
  }

  backToHome() {
    this.router.navigate(['/home-loged']);
  }

  closeSession() {
    this.webSocketService.desconnectFromSocket();
    this.authService.logout();
  }

  idStudentToUploadImage() {
    this.idStudentImageToUpload = this.studentObject.id;
    this.modalService.openModal();
  }

  refreshPicture() {
    this.studentImage = '';
    this.studentService.getStudentsById(this.idStudent).subscribe((resp) => {
      this.studentObject = resp;
    });

    setTimeout(() => {
      this.studentImage = this.studentObject.picture;
    }, 2000)
  }

  getStudentImage() {
    if ((this.studentObject.picture != null || this.studentObject.picture.length >= 0) && this.studentImage != "default.png") {
      this.studentImage = this.studentObject.picture;
    }
  }

  getStudentDetailTutorias() {
    this.studentService.getTutoriasDetailsForStudent(this.idStudent).subscribe(resp => {
      this.dataSourceTwo = new MatTableDataSource(resp);
      if (this.dataSourceTwo.data.length > 0) {
        setTimeout(() => {
          this.dataSourceTwo.paginator = this.paginatorTwo;
          this.dataSourceTwo.sort = this.sortTwo;
        }, 1000);
      }
    });
  }
}
