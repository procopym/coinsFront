import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {RxPubSub} from 'rx-pubsub';

export interface Response {
  r_transaction_id: number;
  r_user_id: number,
  r_category_id_from: number;
  r_category_name_from: string;
  r_category_id_to: number;
  r_category_name_to: string;
  r_amount: number;
  r_transaction_date: string;
  r_type_transaction: number;
}

export interface Counts {
  r_category_id: number,
  r_user_id: number,
  r_category_name: string,
  r_amount: number,
  r_plan_amount: number,
  r_start_date: string,
  r_group_id: number
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  //Transactions variables
  transactions: Response[];
  transactionsByDate: {};
  resultTransactions: string[];
  messageTransactions: string;

  //Counts variables
  counts: Counts[];
  countsByGroup: {};
  keyCounts: string[];
  messageCounts: string;

  //blur content when modal is shown
  blurContent: boolean = false;

  //Delete varianles
  messagesRemove: string;

  subscriber: any;

  ngOnDestroy(): void {
    if (this.subscriber) {
      RxPubSub.unsubscribe(this.subscriber);
    }
  }

  constructor(private api: ApiService) {
  }

  ngOnInit() {
    this.initTransactions(8);
    this.initCounts(8);
    this.initTransactionModal();
    RxPubSub.publish('getTransactionList', {});
    RxPubSub.publish('getCountsList', {});
    this.keyCounts = [];
  }

  //Styling
  public getColorForTransaction(id: number): any {
    switch (id) {
      case 0:
        return 'green';
      case 1:
        return 'red';
      case 2:
        return 'gray';
      default:
        return 'gray';
    }
  }

  public getColorForMainCells(id: number): any {
    switch (id) {
      case 0:
        return 'cyan';
      case 1:
        return 'orange';
      case 2:
        return 'green';
      default:
        return 'gray';
    }
  }

  public getTransactionType(id: number, amount: any): string {
    switch (id) {
      case 0:
        return '+' + amount;
      case 1:
        return '-' + amount;
      case 2:
        return amount;
      default:
        return amount;
    }
  }

  public getCountsGroupName(id: string): string {
    switch (id) {
      case "0":
        return 'Money Sources';
      case "1":
        return 'Wallets';
      case "2":
        return 'Costs';
      default:
        return 'Others';
    }
  }

  public getCountsMainCellColor(id: string): string {
    switch (id) {
      case "0":
        return 'deepskyblue';
      case "1":
        return 'orange';
      case "2":
        return 'green';
      default:
        return 'gray';
    }
  }

  checkIfExists(id: number) {
    if (this.keyCounts.indexOf(id.toString()) < 0) {
      return true;
    }
    return false;
  }

  public getDate(date) {
    let dateObj = new Date(date);
    return `${dateObj.getFullYear()}-${dateObj.getMonth() + 1}-${dateObj.getDate()}`;
  }

  public transactionFormatter(transactions_list: Response[]): {} {
    let transactionsByDate = {};
    for (let item of transactions_list) {
      let date = this.getDate(item.r_transaction_date);
      this.templateFormatter(transactionsByDate, date, item);
    }
    return transactionsByDate;
  }

  private templateFormatter(template: {}, key: any, item: any): void {
    if (!template[key]) {
      template[key] = {key: key, group: []};
    }
    template[key].group.push(item);
  }

  public countsFormatter(counts_list: Counts[]): {} {
    let countsByGroup = {};
    for (let item of counts_list) {
      this.templateFormatter(countsByGroup, item.r_group_id, item);
    }
    return countsByGroup;
  }

  public getObjKeys(object): string[] {
    return Object.keys(object);
  }

  showTransactionModal(transaction: Response): void {
    // console.log("Hello", transaction);

    RxPubSub.publish('showTransactionModal', {show: true, counts: this.counts, initTransaction: transaction});
  }

  removeTransaction(user_id: number, transaction_id: number) {
    const request = {user_id, transaction_id};
    RxPubSub.publish('showRemoveModal', {show: true, data: request});

    // //TODO: call api to remove transaction
    // this.api.removeTransaction({
    //   user_id,
    //   transaction_id
    // }).subscribe((response: { success: boolean, message: string }) => {
    //   if (response.success) {
    //     this.messagesRemove = 'Record removed!';
    //     RxPubSub.publish('getTransactionList', {});
    //     RxPubSub.publish('getCountsList', {});
    //   } else {
    //     this.messagesRemove = 'Removing fail!';
    //     RxPubSub.publish('getTransactionList', {});
    //     RxPubSub.publish('getCountsList', {});
    //   }
    // });
  }

  removeCategory(user_id: number, category_id: number) {
    const request = {user_id, category_id};
    RxPubSub.publish('showRemoveCategory', {show: true, data: request});
  }

  private initTransactions(user_id: number): void {
    this.subscriber = RxPubSub.subscribe('getTransactionList', () => {
      this.api.getTransactionData(user_id).subscribe((response: { success: boolean; data: Response[], message: string }) => {
        if (response.success) {
          this.transactions = response.data;
          //TODO: result json grouping by date
          this.transactionsByDate = this.transactionFormatter(this.transactions);
          this.resultTransactions = this.getObjKeys(this.transactionsByDate);
          this.messageTransactions = response.message;
        } else {
          this.transactions = [];
          this.transactionsByDate = {};
          this.resultTransactions = [];
          this.messageTransactions = response.message;
        }
      });
    });
  }

  private initTransactionModal(): void {
    this.subscriber = RxPubSub.subscribe('showTransactionModalHome', ({show}) => {
      RxPubSub.publish('showTransactionModal', {show: show, counts: this.counts});
    });
  }

  private initCounts(user_id: number): void {
    this.subscriber = RxPubSub.subscribe('getCountsList', () => {
      this.api.getUserCounts(user_id).subscribe((response: { success: boolean; data: Counts[], message: string }) => {
        if (response.success) {
          this.counts = response.data;
          this.countsByGroup = this.countsFormatter(this.counts);
          this.keyCounts = this.getObjKeys(this.countsByGroup);
          this.messageCounts = response.message;
        } else {
          this.counts = [];
          this.countsByGroup = {};
          this.keyCounts = [];
          this.messageCounts = response.message;
        }
      });
    });
  }
}
