import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RetirementsService {

  public endpoint_retirements = environment.retirements.host;
  public setAcountInformation: File;
  public setSupportInformation: File;

  constructor(private http: HttpClient) { }


  saveRetirement(objectToSend: any): Observable<any> {
    let endpoint_transaction = `${this.endpoint_retirements}`;
    return this.http.post(endpoint_transaction, objectToSend);
  }

  getAllRetirments(): Observable<any> {
    let endpoint_transaction = `${this.endpoint_retirements}`;
    return this.http.get<any[]>(endpoint_transaction);
  }

  updateRetirementState(retirementId: string): Observable<any> {
    let endpoint_transaction = `${this.endpoint_retirements}/update/state/${retirementId}`;
    return this.http.get(endpoint_transaction);
  }

  sentEmailForNewRetirement(bodyOfRetirementEmail: any) {
    let formData = new FormData();
    formData.append("accountInformation", this.setAcountInformation);
    formData.append("idReference",bodyOfRetirementEmail.idReference);
    formData.append("idTeacher",bodyOfRetirementEmail.idTeacher);
    let endpoint_transaction = `${this.endpoint_retirements}/new/send/email`;
    return this.http.post(endpoint_transaction, formData );
  }

  sentEmailForSupportTransaction(bodyOfRetirementEmail: any) {
    let formData = new FormData();
    formData.append("paymentSupport", this.setSupportInformation);
    formData.append("idReference",bodyOfRetirementEmail.idReference);
    formData.append("idTeacher",bodyOfRetirementEmail.idTeacher);
    let endpoint_transaction = `${this.endpoint_retirements}/state/send/email`;
    return this.http.post(endpoint_transaction, formData );
  }
  

  setInformation(accountInformationInput: File) {
    this.setAcountInformation = accountInformationInput;
  }

  setSupportInformationMethod(supportInformationInput: File) {
    this.setSupportInformation = supportInformationInput;
  }

}
