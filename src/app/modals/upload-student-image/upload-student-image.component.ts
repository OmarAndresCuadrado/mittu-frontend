import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ModalService } from 'src/app/services/modal.service';
import { StudentService } from 'src/app/services/student.service';
import Swal from 'sweetalert2';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-upload-student-image',
  templateUrl: './upload-student-image.component.html',
  styleUrls: ['./upload-student-image.component.css']
})
export class UploadStudentImageComponent {

  @Input() studentIdToHeredate: any;
  @Output() studentEmmiterUpload = new EventEmitter<any>();
  public selectedPicture: File;
  public environment = environment;
  public endpoint_grupal_course_image = environment.student.host_image;
  public imageNameFromService: any;

  constructor(
    public modalService: ModalService,
    private studentService: StudentService
  ) { }

  closeModal() {
    this.modalService.closeModal();
  }

  choosePicture(event) {
    this.selectedPicture = event.target.files[0];
    if (this.selectedPicture.type.indexOf('image') < 0) {
      Swal.fire('Error', 'El formato de la imagen no es valido', 'error');
      this.selectedPicture = null;
    }
    if (!this.selectedPicture) {
      Swal.fire('Error', 'Se debe seleccionar una imagen', 'error');
    } else {
      this.studentService.uploadStudentPicture(this.selectedPicture, this.studentIdToHeredate)
      .subscribe((resp => {
        // colocar spinner en lo que carga la imagen
        this.imageNameFromService = resp.picture;
        Swal.fire('Subida exitosa', 'La imagen se ha cargado con exito', 'success');
      }))
    }
  }

  okk() {
    this.studentEmmiterUpload.emit(true);
  }

}
