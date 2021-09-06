import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalService } from 'src/app/services/modal.service';
import { StudentService } from 'src/app/services/student.service';
import { TransactionService } from 'src/app/services/transaction.service';
import Swal from 'sweetalert2';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-upload-banner-image',
  templateUrl: './upload-banner-image.component.html',
  styleUrls: ['./upload-banner-image.component.css']
})
export class UploadBannerImageComponent implements OnInit {

  @Input() bannerIdToHeredate: any;
  @Output() bannerEmmiterUpload = new EventEmitter<any>();
  public selectedPicture: File;
  public environment = environment;
  public endpoint_image_upload = environment.transfers.host_image;
  public imageNameFromService: any;
  public colorString: any;
  public imageForm: FormGroup;
  public imageUrlEditor = 'https://convert-my-image.com/ImageConverter';
  public colorUrlEditor = 'https://htmlcolorcodes.com/es/';

  constructor(
    public modalService: ModalService,
    private transactionService: TransactionService,
    private formBuilderBanner: FormBuilder,
  ) { }

  get color() {
    return this.imageForm.get('color');
  }

  closeModal() {
    this.modalService.closeModal();
  }

  ngOnInit(): void {
    this.imageForm = this.formBuilderBanner.group({
      color: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(255)]]
    });
  }

  choosePicture(event) {
    this.colorString = this.imageForm.value.color;
    this.selectedPicture = event.target.files[0];
    if (this.selectedPicture.type.indexOf('image') < 0) {
      Swal.fire('Error', 'El formato de la imagen no es valido', 'error');
      this.selectedPicture = null;
    }
    if (!this.selectedPicture) {
      Swal.fire('Error', 'Se debe seleccionar una imagen', 'error');
    } else {
      this.transactionService.uploadBannerPicture(this.selectedPicture, this.bannerIdToHeredate, this.colorString)
        .subscribe((resp => {
          // colocar spinner en lo que carga la imagen
          this.imageNameFromService = resp.urlBanner;
          Swal.fire('Subida exitosa', 'La imagen se ha cargado con exito', 'success');
        }))
    }
  }

  okk() {
    this.bannerEmmiterUpload.emit(true);
  }

  openImageEditor() {
    window.open(this.imageUrlEditor, "_blank");

  }

  openColorEditor() {
    window.open(this.colorUrlEditor, "_blank");
  }
}
