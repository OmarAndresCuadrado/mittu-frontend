import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalService } from '../../services/modal.service';
import Swal from 'sweetalert2';
import { courseEntity } from '../../interfaces/coursesEntity';
import { CourseService } from '../../services/course.service';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-upload-course-image',
  templateUrl: './upload-course-image.component.html',
  styleUrls: ['./upload-course-image.component.css']
})
export class UploadCourseImageComponent {

  @Input() courseId: any;
  @Output() tutoriaCourseEmmiter = new EventEmitter<any>();
  public selectedPicture: File;
  public environment = environment;
  public endpoint_course_image = environment.course.host_image;
  public imageNameFromService: any;

  constructor(
    public modalService: ModalService,
    private formBuilder: FormBuilder,
    private tutoriaCourseService: CourseService
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
      this.tutoriaCourseService.uploadCoursePicture(this.selectedPicture, this.courseId)
      .subscribe((resp => {
        // colocar spinner en lo que carga la imagen
        this.imageNameFromService = resp.picture;
        Swal.fire('Subida exitosa', 'La imagen se ha cargado con exito', 'success');
      }))
    }
  }


  okk() {
    this.tutoriaCourseEmmiter.emit(true);
  }
}
