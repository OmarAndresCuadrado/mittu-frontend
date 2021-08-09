import { Directive, Injectable } from '@angular/core';
import { NG_ASYNC_VALIDATORS, AsyncValidator } from '@angular/forms';
import { map } from 'rxjs/operators';
import { StudentService } from '../services/student.service';

@Directive({
  selector: '[usernameUnico]',
  providers: [{ provide: NG_ASYNC_VALIDATORS, useExisting: UsernameUniqueDirective, multi: true }]
})
export class UsernameUniqueDirective implements AsyncValidator {

  constructor(private studentService: StudentService) { }


  validate(control: import("@angular/forms").AbstractControl): Promise<import("@angular/forms").ValidationErrors> | import("rxjs").Observable<import("@angular/forms").ValidationErrors> {
    const username = control.value;
    return this.studentService.validateStudent(username).pipe(
      map((usernameArr) => {

        if (usernameArr.username == null) {
          return;
        }
        else if (usernameArr.username.indexOf(username) !== -1) {
          return { usernameUnico: true };
        }
      })
    );
  }



}

@Injectable({ providedIn: 'root' })
export class UsernameUnicoService implements AsyncValidator {
  constructor(private studentService: StudentService) { }

  validate(control: import("@angular/forms").AbstractControl): Promise<import("@angular/forms").ValidationErrors> | import("rxjs").Observable<import("@angular/forms").ValidationErrors> {
    const usernameUniqueDirective = new UsernameUniqueDirective(this.studentService);
    return usernameUniqueDirective.validate(control);
  }
}