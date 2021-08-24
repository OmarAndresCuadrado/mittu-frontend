import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentService } from '../../services/student.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { passwordValidation } from '../../validations/password.directive';
import { UsernameUnicoService } from '../../validations/username-unique.directive';

@Component({
  selector: 'app-register-student',
  templateUrl: './register-student.component.html',
  styleUrls: ['./register-student.component.css']
})
export class RegisterStudentComponent implements OnInit {

  registerStudentForm: FormGroup;
  public passwordEnable: boolean = false;
  public emailEnable: boolean = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private registerStudentService: StudentService,
    private usernameUnicoService:UsernameUnicoService
  ) { }

  get name() {
    return this.registerStudentForm.get('name');
  }

  get lastName() {
    return this.registerStudentForm.get('lastName');
  }

  get email() {
    return this.registerStudentForm.get('email');
  }

  get emailVerification() {
    return this.registerStudentForm.get('emailVerification');
  }

  get password() {
    return this.registerStudentForm.get('password');
  }

  get passwordVerification() {
    return this.registerStudentForm.get('passwordVerification');
  }

  get phone() {
    return this.registerStudentForm.get('phone');
  }

  get TermsAndConditions() {
    return this.registerStudentForm.get('TermsAndConditions');
  }

  get city() {
    return this.registerStudentForm.get('city');
  }

  ngOnInit(): void {
    this.registerStudentForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(40)]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(40)]],
      email: ['', { validators:[Validators.required, Validators.minLength(12), Validators.maxLength(50), Validators.email], asyncValidators: [this.usernameUnicoService.validate.bind(this.usernameUnicoService)]}],
      emailVerification: ['', { validators:[Validators.required, Validators.minLength(12), Validators.maxLength(50), Validators.email]}],
      phone: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]],
      city: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(40)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30), passwordValidation()]],
      passwordVerification: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30), passwordValidation()]],
      TermsAndConditions: ['', [Validators.required]]
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  register() {
    if (!this.registerStudentForm.valid) {
      alert('Alguna regla de validación no se está cumpliendo');
      return;
    }

    if (this.password != this.passwordVerification) {
    }

    let student: any;
    student = this.registerStudentForm.value;
    let arrayCharacteristicas: any[] = Object.values(student);
    student.name = arrayCharacteristicas[0]

    Swal.fire({
      title: `Registro exitoso`,
      html: `Bienvenido ${student.name} ya puedes ingresar a mittu e inscribirte a nuestros cursos y tutorías <br> <b>Nota<b> <br> <p style="color:green;">En breve recibirás una copia a tu correo electrónico con tus datos de ingreso </p>`,
      icon: 'success',
      confirmButtonColor: '#5cb85c',
      confirmButtonText: 'Ir al ingreso',
    }).then((result) => {
      if (result.value) {
        this.router.navigate(['/login']);
      }
    })

    this.registerStudentService.registerStudent(student)
      .subscribe((resp) => {
      }, (err) => {
      })
  }


  verifyPassword(verifyPassword: any) {

    if(this.password.value != verifyPassword.value ) {
      this.passwordEnable = false;
    }

    if(this.password.value == verifyPassword.value ) {
      this.passwordEnable = true;
    }

    return;
  }

  verifyEmail(verifyEmail: any) {

    if(this.email.value != verifyEmail.value ) {
      this.emailEnable = false;
    }

    if(this.email.value == verifyEmail.value ) {
      this.emailEnable = true;
    }

    return;
  }
}
