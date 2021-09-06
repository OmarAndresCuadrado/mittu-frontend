import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  public environment = environment;
  public endpoint_transaction = environment.transaction.host;
  public endpoint_transaction_insert = environment.transfers.host;
  public endpoint_transfers = environment.transfers.host;
  public endpoint_retirements = environment.retirements.host;
  public endpoint_image_upload = environment.transfers.host_image;
  public onChatToHeredate: any;
  public idStudent: any;

  constructor(private http: HttpClient) { }

  getBannerInformation(id: number): Observable<any> {
    return this.http.get(`${this.endpoint_transfers}/banner/${id}`);
  }

  getAllPaymentsOptions(): Observable<any[]> {
    return this.http.get<any[]>(this.endpoint_transaction);
  }

  getAllListOfTransfers(idStudent): Observable<any[]> {
    return this.http.get<any[]>(`${this.endpoint_transfers}/list/${idStudent}`);
  }

  makeTransaction(object: any): Observable<any> {
    return this.http.post<any>(`${this.endpoint_transaction_insert}/create`, object);
  }


  getPlataformValues(): Observable<any> {
    let internalUrl = `${this.endpoint_transfers}/admin`;
    console.log("URL " + internalUrl);
    return this.http.get<any[]>(internalUrl);
  }

  createExcel(objectToSend: any): Observable<Blob> {
    let internalUrl = `${this.endpoint_retirements}/excel`;
    return this.http.post(internalUrl, objectToSend, { responseType: 'blob' });

  }

  uploadBannerPicture(picture: File, id: any, color: any): Observable<any> {
    let formData = new FormData();
    let internalEnpoint = `${this.endpoint_image_upload}`;
    formData.append("bannerImage", picture);
    formData.append("id", id);
    formData.append("color", color);
    return this.http.post<any>(internalEnpoint, formData).pipe
      (
        map((response: any) => response as any)
      );
  }
}
