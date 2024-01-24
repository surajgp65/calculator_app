import { Component, OnInit } from '@angular/core';
import { HttpRequestService } from '../common-services/http-request.service';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss'],
})
export class CalculatorComponent implements OnInit {
  public result: string = '';
  allCalculation: any[] = [];

  constructor(private http: HttpRequestService) {}

  ngOnInit() {
    this.getCalculation();
  }

  public buttons = [
    { value: '7', display: '7', class: 'btn-outline-info' },
    { value: '8', display: '8', class: 'btn-outline-info' },
    { value: '9', display: '9', class: 'btn-outline-info' },
    { value: '/', display: '/', class: 'btn-outline-info' },
    { value: '4', display: '4', class: 'btn-outline-info' },
    { value: '5', display: '5', class: 'btn-outline-info' },
    { value: '6', display: '6', class: 'btn-outline-info' },
    { value: '*', display: '*', class: 'btn-outline-info' },
    { value: '1', display: '1', class: 'btn-outline-info' },
    { value: '2', display: '2', class: 'btn-outline-info' },
    { value: '3', display: '3', class: 'btn-outline-info' },
    { value: '-', display: '-', class: 'btn-outline-info' },
    { value: '0', display: '0', class: 'btn-outline-info' },
    { value: '.', display: '.', class: 'btn-outline-info' },
    { value: '=', display: '=', class: 'btn-outline-info' },
    { value: '+', display: '+', class: 'btn-outline-info' },
    { value: '', display: '', class: 'invisible' },
    { value: 'AC', display: 'AC', class: 'btn-outline-danger' },
    { value: 'C', display: 'C', class: 'btn-outline-danger' },
    { value: 'back', display: '←', class: 'btn-outline-warning' },
  ];

  onButtonClick(value: string) {
    if (value === '=') {
      if (this.result) this.calculateResult();
    } else if (value === 'C') {
      this.clearResult();
    } else if (value === 'back') {
      this.removeLastCharacter();
    } else if (value === 'AC') {
      this.deleteAllList();
    } else {
      this.result += value;
    }
  }
  calculateResult() {
    try {
      this.createCalculation(this.result);
      this.result = eval(this.result).toString();
    } catch (error) {
      this.result = 'Error';
    }
  }

  clearResult() {
    this.result = '';
  }

  removeLastCharacter() {
    this.result = this.result.slice(0, -1);
  }

  createCalculation(data: any) {
    try {
      let rqdata = {
        query: data,
      };
      this.http
        .request('post', '/calculate/create', rqdata)
        .subscribe((response: any) => {
          console.log(response);
          this.allCalculation.push(response.calculation);
        });
    } catch (error) {}
  }

  getCalculation() {
    try {
      this.http
        .request('get', '/calculate', null)
        .subscribe((response: any) => {
          this.allCalculation = response.calculation;
        });
    } catch (error) {}
  }
  pushRes(data: any) {
    this.result = data;
  }

  deleteAllList() {
    try {
      this.http
        .request('delete', '/calculate/deleteAll', null)
        .subscribe((response: any) => {
          this.clearResult();
          this.getCalculation();
        });
    } catch (error) {}
  }
}
