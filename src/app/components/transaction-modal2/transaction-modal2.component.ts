import {Component, OnInit} from '@angular/core';
import {RxPubSub} from "rx-pubsub";
import {Counts, Response} from "../../pages/home/home.component";
import {MatSelectChange} from "@angular/material/select";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../../services/api.service";

export interface Food {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-transaction-modal2',
  templateUrl: './transaction-modal2.component.html',
  styleUrls: ['./transaction-modal2.component.css']
})
export class TransactionModal2Component implements OnInit {
  show = false;
  subscriber: any;
  categories: Counts[] = [];
  category_from: Counts[] = [];
  category_to: Counts[] = [];
  request: FormGroup;
  maxDate = new Date();
  transactionId: number = null;

  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];

  constructor(private api: ApiService) {
  }

  ngOnInit() {
    this.initSubscriber();
  }

  close(): void {
    this.show = false;
    this.categories = [];
    this.category_from = [];
    this.category_to = [];
    this.transactionId = null;
  }

  get category_from_control() {
    return this.request.get('category_from');
  }

  get category_to_control() {
    return this.request.get('category_to');
  }

  get date_control() {
    return this.request.get('date');
  }

  get amount_control() {
    return this.request.get('amount');
  }

  private initSubscriber(): void {
    this.subscriber = RxPubSub.subscribe('showTransactionModal', ({show, counts, initTransaction}) => {
      this.show = show;
      this.categories = counts;
      this.setCategoryFrom();
      this.initForm(initTransaction);
      this.transactionId = initTransaction ? initTransaction.r_transaction_id : null;
    });
  }

  private setCategoryFrom(): void {
    this.category_from = this.categories.filter(item => item.r_group_id === 0 || item.r_group_id === 1)
  }

  private setCategoryTo(event: MatSelectChange): void {
    const {value: category_id} = event;
    const category = this.categories.find(item => item.r_category_id === category_id);
    this.category_to = this.categories.filter(item =>
      (category.r_group_id === 0 && item.r_group_id === 1) ||
      (category.r_group_id === 1 && (item.r_group_id === 1 || item.r_group_id === 2))
    );
  }

  private initForm(initTransaction?: Response): void {
    const category_from = initTransaction && initTransaction.r_category_id_from && this.categories.find(item => item.r_category_id === initTransaction.r_category_id_from) ? initTransaction.r_category_id_from : null;
    const category_to = initTransaction && initTransaction.r_category_id_to && this.categories.find(item => item.r_category_id === initTransaction.r_category_id_to) ? initTransaction.r_category_id_to : null;
    const date = initTransaction && initTransaction.r_transaction_date ? initTransaction.r_transaction_date : this.maxDate;
    const amount = initTransaction && initTransaction.r_amount ? initTransaction.r_amount : null;
    if (category_from) {
      this.setCategoryTo({value: initTransaction.r_category_id_from, source: null});
    }
    this.request = new FormGroup({
      category_from: new FormControl(category_from, [Validators.required]),
      category_to: new FormControl(category_to, [Validators.required]),
      date: new FormControl(date, [Validators.required]),
      amount: new FormControl(amount, [Validators.required, Validators.min(1)])
    });
  }


  onSubmit() {
    if (this.request.valid) {
      const date = new Date(this.request.value.date.toString());
      const dateFormatted = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}T${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}.${date.getMilliseconds()}Z`;
      // TODO: Call transaction api
      if (this.transactionId) {
        /*In case when transaction exists we should just update it*/
        // console.log({
        //   user_id: 8,
        //   category_from: this.request.value.category_from,
        //   category_to: this.request.value.category_to,
        //   transaction_date: dateFormatted,
        //   amount: this.request.value.amount,
        //   transaction_id: this.transactionId
        // });
        this.api.modifyTransaction({
          user_id: 8,
          category_id_from: this.request.value.category_from,
          category_id_to: this.request.value.category_to,
          transaction_date: dateFormatted,
          amount: this.request.value.amount,
          transaction_id: this.transactionId
        }).subscribe((response:{success:boolean, message:string})=>{
          if (response.success) {
            RxPubSub.publish('getTransactionList', {});
            RxPubSub.publish('getCountsList', {});
            this.close();
          } else {
          }
        });
      } else {
        /*In case when transaction not exists we should create it*/
        // console.log({
        //   user_id: 8,
        //   category_from: this.request.value.category_from,
        //   category_to: this.request.value.category_to,
        //   transaction_date: dateFormatted,
        //   amount: this.request.value.amount
        // });
        this.api.createTransaction({
          user_id: 8,
          category_id_from: this.request.value.category_from,
          category_id_to: this.request.value.category_to,
          transaction_date: dateFormatted,
          amount: this.request.value.amount
        }).subscribe((response:{success:boolean, message:string})=>{
          if (response.success) {
            RxPubSub.publish('getTransactionList', {});
            RxPubSub.publish('getCountsList', {});
            this.close();
          } else {
          }
        });
      }
      this.close();
    }
  }
}
