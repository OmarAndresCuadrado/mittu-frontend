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

  constructor(
    private grupalCoursesService: GrupalCoursesService,
    private studentService: StudentService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private transferService: TransactionService,
    public authService: AuthService,
    private webSocketService: WebSocketService
  ) {
    this.showVar = false;
    this.grupalCourses = false;
    this.profiles = false;
    this.transactions = false;
  }

  ngOnInit(): void {

    this.userData = JSON.parse(sessionStorage.getItem('user'));
    this.usernameEmail = this.userData.username;


    this.activatedRoute.queryParams.subscribe(params => {
      console.log("params", params);
      console.log("RESPUESTA DE LA URL", params['lapResponseCode']);
      console.log("RESPUESTA DE LA URL", params['lapTransactionState']);
      console.log("RESPUESTA DE LA URL COSTO", params['TX_VALUE']);
      console.log("RESPUESTA DE LA URL ID TRANSFERENCIA", params['referenceCode']);
      this.responseOne = params['lapResponseCode'];
      this.responseTwo = params['lapTransactionState'];
      this.costOfTransaction = params['TX_VALUE'];
      this.transferId = params['referenceCode'];
    });

    this.idStudent = sessionStorage.getItem('studentId');
    this.getListOfTransactions();
    this.getAllgrupalCoursesFromStudent();
    this.getStudentInformation();
    this.profiles = true;
    this.getStudentTime();


    if (this.responseOne == 'APPROVED' && this.responseTwo == 'APPROVED') {
      this.transactionApproved();
    } else if (this.responseTwo == 'DECLINED') {
      this.transactionReject();
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }, 500);
  }

  getStudentInformation() {
    let idStudent = this.idStudent;
    this.studentService.getStudentsById(idStudent).subscribe((resp) => {
      this.studentObject = resp;
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

  showGrupalCourses() {
    this.profiles = false;
    this.transactions = false;
    this.grupalCourses = true;
  }

  showProfile() {
    this.transactions = false;
    this.grupalCourses = false;
    this.profiles = true;
    this.getStudentTime();
  }

  showTransactions() {
    this.grupalCourses = false;
    this.profiles = false;
    this.transactions = true;
  }

  getStudentTime() {
    this.studentService.getStudentTime(this.idStudent).subscribe((resp) => {
      console.log("tiempo del estudiante ", resp);
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
    }).then((result) => {
      if (result.isConfirmed) {
        // this.router.navigate(['/student-panel']);
      }
    });
  }

  getListOfTransactions() {
    this.transferService.getAllListOfTransfers(this.idStudent).subscribe((resp) => {
      this.dataSource = new MatTableDataSource(resp);
      console.log("lista de transacciones ", this.listOfTransactions);
    });
    console.log("DATA SOURCEEEE " , this.dataSource);
  }

  makeTransaction() {
    let objectOfTransaction: any = {
      "name": this.usernameEmail,
      "cost": this.costOfTransaction,
      "idStudent": this.idStudent,
      "transferCode": this.transferId
    }

    console.log("objeto que se enviaria para realizar la transaccion ", objectOfTransaction);
    this.transferService.makeTransaction(objectOfTransaction).subscribe(resp => {
      console.log("transferencia exitosa ");
    })
  }

  setMoneyTransaction() {
    console.log("estudiante ", this.studentObject);
    let bodyOfTransaction: any = {};
    let actualMoney: number = +this.studentObject.money;
    console.log("dinero actual del estudiante ", actualMoney);
    let transactionMoney: number = +this.costOfTransaction;
    console.log("dinero a sumer al saldo del estudiante ", transactionMoney);
    let newMoney: number = (actualMoney + transactionMoney);
    console.log("nuevo valor de dinero ", newMoney);
    bodyOfTransaction = {
      'money': newMoney,
      'studentId': this.idStudent
    }
    this.studentService.setMoney(bodyOfTransaction).subscribe((resp) => {
      console.log("opreacion exitosa ", resp);
    });
  }

  backToHome() {
    this.router.navigate(['/home-loged']);
  }

  closeSession() {
    this.webSocketService.desconnectFromSocket();
    this.authService.logout();
  }



}
