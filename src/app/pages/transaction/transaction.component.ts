import { Component, OnInit } from '@angular/core';
import { TransactionService } from 'src/app/services/transaction.service';
import { Md5 } from 'ts-md5/dist/md5';
import { TemplateRef, ViewChild } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  public opciones: any[] = [];
  public responseFromTransfer: any;
  private apiKey = 'U5IXKhl1VI8AAuW8N6DJARK45T';
  public seconds: number;
  public minutes: number;
  public totalTime: any;
  public breakLopp: boolean;
  public counter: number;
  public counterTwo: number;
  public isTrue: boolean;
  public showPartOne: boolean;
  public showPartTwo: boolean;
  public showStartButton: boolean;
  public showStopButton: boolean;
  public studentMinutes: number;
  public responseOne: any;
  public responseTwo: any;
  public userEmail: any;
  public responseOneFromAmazon: any;
  public responseTwoFromAmazon: any;

  @ViewChild('editModal') editModal: TemplateRef<any>; // Note: TemplateRef

  constructor(
    private transactionService: TransactionService,
    private boostrapModalService: NgbModal
  ) { }


  ngOnInit(): void {
    let informationFromSession: any;
    informationFromSession = JSON.parse(sessionStorage.getItem('user'));
    this.userEmail = informationFromSession.username;

    this.transactionService.getAllPaymentsOptions().subscribe(resp => {
       this.opciones = resp;
    });

    
  }

  md5Encrypter(paramsToEncrypt) {
    let encriptionResult: any;
    let keyToEncript: any;
    keyToEncript = `${this.apiKey}~${paramsToEncrypt.merchantId}~${paramsToEncrypt.referenceCode}~${paramsToEncrypt.amount}~${paramsToEncrypt.currency}`;
    const md5 = new Md5();
    encriptionResult = md5.appendStr(keyToEncript).end()
    return encriptionResult;
  }

  referenceCodeMethod() {
    var min = 0;
    var max = 10000000;
    var random = Math.random() * (+max - +min) + +min;
    return random.toFixed().toString();
  }

  pay(optionSelected: any) {
    let signature: any;
    let referenceCode: any;
    referenceCode = this.referenceCodeMethod();
    var form = document.createElement("form");
    form.method = "POST";
    form.action = "https://checkout.payulatam.com/ppp-web-gateway-payu";
    var paramsToEncrypt = {
      'merchantId': 910311,
      'accountId': 917086,
      'description': optionSelected.name,
      'referenceCode': referenceCode,
      'amount': optionSelected.cost,
      'currency': 'COP'
    };
    signature = this.md5Encrypter(paramsToEncrypt);
    var params = {
      'ApiKey': this.apiKey,
      'merchantId': 910311,
      'accountId': 917086,
      'description': optionSelected.name,
      'referenceCode': referenceCode,
      'amount': optionSelected.cost,
      'tax': 0,
      'taxReturnBase': 0,
      'currency': 'COP',
      'signature': signature,
      'test': 0,
      'buyerEmail': this.userEmail,
      'responseUrl': 'http://localhost:4200/#/student-panel', //cuando funciona me retorna ha esta pagina y en url estan los parametros de confirmacion de la transaccion
      'confirmationUrl': 'http://localhost:4200/#/student-panel'
    };

    for (var i in params) {
      if (params.hasOwnProperty(i)) {
        var input = document.createElement('input');
        input.type = 'hidden';
        input.name = i;
        input.value = params[i];
        form.appendChild(input);
      }
    }

    document.body.appendChild(form);
    form.submit();
  }

  openModalTest() {
    let ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false
    };
    this.boostrapModalService.open(this.editModal, ngbModalOptions);
  }

}
