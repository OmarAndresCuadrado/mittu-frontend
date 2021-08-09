import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { passwordValidation } from '../../validations/password.directive';
import { UsernameUnicoService } from '../../validations/username-unique.directive';
import { TeacherService } from '../../services/teacher.service';



@Component({
  selector: 'app-register-teacher',
  templateUrl: './register-teacher.component.html',
  styleUrls: ['./register-teacher.component.css']
})
export class RegisterTeacherComponent implements OnInit {

  registerTeacherForm: FormGroup;
  public passwordEnable: boolean = false;
  public emailEnable: boolean = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private registerTeacherService: TeacherService,
    private usernameUnicoService: UsernameUnicoService
  ) { }

  get name() {
    return this.registerTeacherForm.get('name');
  }

  get lastName() {
    return this.registerTeacherForm.get('lastName');
  }

  get email() {
    return this.registerTeacherForm.get('email');
  }

  get emailVerification() {
    return this.registerTeacherForm.get('emailVerification');
  }

  get password() {
    return this.registerTeacherForm.get('password');
  }

  get passwordVerification() {
    return this.registerTeacherForm.get('passwordVerification');
  }

  get phone() {
    return this.registerTeacherForm.get('phone');
  }

  get TermsAndConditions() {
    return this.registerTeacherForm.get('TermsAndConditions');
  }



  ngOnInit(): void {
    this.registerTeacherForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(40)]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(40)]],
      email: ['', { validators: [Validators.required, Validators.minLength(12), Validators.maxLength(50), Validators.email], asyncValidators: [this.usernameUnicoService.validate.bind(this.usernameUnicoService)] }],
      emailVerification: ['', { validators: [Validators.required, Validators.minLength(12), Validators.maxLength(50), Validators.email] }],
      phone: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30), passwordValidation()]],
      passwordVerification: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30), passwordValidation()]],
      TermsAndConditions: ['', [Validators.required]]
    });
  }


  register() {
    if (!this.registerTeacherForm.valid) {
      alert('Alguna regla de validación no se está cumpliendo');
      return;
    }

    if (this.password != this.passwordVerification) {
    }

    let teacher: any;
    teacher = this.registerTeacherForm.value;
    let arrayCharacteristicas: any[] = Object.values(teacher);
    teacher.name = arrayCharacteristicas[0]

    Swal.fire({
      title: `Registro exitoso`,
      html: `Bienvenido ${teacher.name} ya puedes ingresar a la plataforma <br> <b>Nota<b> <br> <p style="color:green;">En breve recibiras tus datos de ingreso en el correo </p>`,
      icon: 'success',
      confirmButtonColor: '#5cb85c',
      confirmButtonText: 'Ir al ingreso',
    }).then((result) => {
      if (result.value) {
        this.router.navigate(['/login']);
      }
    })

    this.registerTeacherService.registerTeacher(teacher)
      .subscribe((resp) => {
      }, (err) => {
      })
  }

  verifyPassword(verifyPassword: any) {

    if (this.password.value != verifyPassword.value) {
      this.passwordEnable = false;
    }

    if (this.password.value == verifyPassword.value) {
      this.passwordEnable = true;
    }
    return;
  }

  verifyEmail(verifyEmail: any) {

    if (this.email.value != verifyEmail.value) {
      this.emailEnable = false;
    }

    if (this.email.value == verifyEmail.value) {
      this.emailEnable = true;
    }

    return;
  }

}
