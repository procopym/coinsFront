import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../services/api.service';
import {RxPubSub} from 'rx-pubsub';

interface Transaction {
  r_transaction_id?: number;
  r_user_id?: number,
  r_category_id_from?: number;
  r_category_name_from?: string;
  r_category_id_to?: number;
  r_category_name_to?: string;
  r_amount?: number;
  r_transaction_date?: string;
}

interface Counts {
  r_category_id: number,
  r_user_id: number,
  r_category_name: string,
  r_amount: number,
  r_plan_amount: number,
  r_start_date: string,
  r_group_id: number
}

@Component({
  selector: 'app-requests-modal',
  templateUrl: './transaction-modal.component.html',
  styleUrls: ['./transaction-modal.component.css']
})
export class TransactionModalComponent implements OnInit, OnDestroy {
  subscriber: any;
  show = false;
  category_from: Counts[];
  category_to: Counts[];
  category: Counts[];
  selectedValueFrom: string;
  selectedValueTo: string;
  // tmp: Counts[];
  requestForm: FormGroup;
  // response: Transaction;
  // messageCounts: string;


  constructor(private fb: FormBuilder, private api: ApiService) {
  }

  ngOnInit() {
    // this.initSubscriber();
    // this.initCounts(8);
    // console.log(Date().valueOf());
    // this.amountInput = new FormControl("", Validators.min(0));
  }

  ngOnDestroy(): void {
    this.subscriber = null;
  }

  // get categoryFrom(){
  //   return this.requestForm.get('categoryFromControl')
  // }

  private createForm(categoryFrom):void{
    this.requestForm = this.fb.group({
    });
  }

  private initSubscriber(): void {
    this.subscriber = RxPubSub.subscribe('showTransactionModal', ({show, counts}) => {
      this.show = show;
      this.category = counts;
      this.getCountsFromList(this.category);
      this.createForm(this.category_from);
      // console.log(this.category_from);
    });
  }

  private getCountsFromList(counts: Counts[]): void {
    this.category_from = [];
    this.category_to = [];
    counts.forEach(el => {
      if (el.r_group_id != 2) {
        this.category_from.push(el);
      }
    });
  }

  close(): void {
    this.show = false;
    this.category = null;
    this.category_to = null;
    this.category_from = null;
    // this.selectedValueTo = null;
    // this.selectedValueFrom = null;
  }

  // getCategoryFrom(): Counts[] {
  //   let tmp: Counts[];
  //
  //   // console.log(this.category_from);
  //   if (this.category_from){
  //   this.category_from.forEach((el) => {
  //     if (el.r_group_id != 3) {
  //       tmp.push(el);
  //     }
  //   });
  //   }
  //
  //   // console.log(tmp);
  //   return tmp;
  // }

  // private initSubscriber(): void {
  //   this.subscriber = RxPubSub.subscribe('showTransactionModal', ({show, data}) => {
  //     // console.log('UUUUUU', data);
  //     this.response = null;
  //
  //     this.response = data;
  //     this.show = show;
  //   });
  // }

  // private initCounts(user_id: number): void {
  //   this.subscriber = RxPubSub.subscribe('getCountsList', () => {
  //     this.api.getUserCounts(user_id).subscribe((response: { success: boolean; data: Counts[], message: string }) => {
  //       if (response.success) {
  //         this.category_from = response.data;
  //         this.category_to = response.data;
  //         this.messageCounts = response.message;
  //       } else {
  //         this.category_from = response.data;
  //         this.category_to = response.data;
  //         this.messageCounts = response.message;
  //       }
  //     });
  //   });
  // }

  // private createForm({r_transaction_id, r_user_id, r_category_id_from, r_category_name_from, r_category_id_to, r_category_name_to, r_transaction_date, r_amount}: Transaction): void {
  //   this.requestForm = this.fb.group({
  //     category_from: [r_category_name_from ? r_category_name_from : ''],
  //     category_to: [r_category_name_to ? r_category_name_to : ''],
  //     transaction_date: [r_transaction_date ? r_transaction_date : this.date],
  //     amount: [r_amount ? r_amount : 0, [Validators.min(0)]]
  //     // reqno: [reqno ? reqno : ''],
  //     // user: [user ? user : '', [Validators.required, Validators.maxLength(20)]],
  //     // description: [description ? description : '', [Validators.required, Validators.maxLength(255)]],
  //   });
  // }

  updateCategoryTo(group_id: number) {
    this.category_to= [];
    this.selectedValueTo = null;
    if(group_id == 0){
      this.category.forEach(el=>{
          if(el.r_group_id == 1){
          this.category_to.push(el);
        }
      });
    }
    else{
      this.category.forEach(el=>{
        if(el.r_group_id != 0){
          this.category_to.push(el);
        }
      });
    }
  }
}
