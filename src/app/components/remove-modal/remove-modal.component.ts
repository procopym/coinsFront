import {Component, OnInit, OnDestroy} from '@angular/core';
import {RxPubSub} from 'rx-pubsub';
import {ApiService} from '../../services/api.service';

interface Response {
  success: boolean;
  message?: string;
}

interface Transaction {
  user_id: number;
  transaction_id: number;
}

interface Category {
  user_id: number;
  category_id: number;
}

@Component({
  selector: 'app-remove-modal',
  templateUrl: './remove-modal.component.html',
  styleUrls: ['./remove-modal.component.css']
})

export class RemoveModalComponent implements OnInit, OnDestroy {
  show = false;
  subscriber: any;
  response: Response;
  data: Transaction;
  category: Category;
  id: number;

  constructor(private api: ApiService) {
  }

  ngOnInit() {
    this.initTransactionRemove();
    this.initCategoryRemove();
  }


  ngOnDestroy(): void {
    if (this.subscriber) {
      RxPubSub.unsubscribe(this.subscriber);
    }
  }

  close(): void {
    this.show = false;
    this.data = null;
    this.response = null;
    this.id = null;
  }

  removeTransaction() {
    this.api.removeTransaction(this.data).subscribe((response: { success: boolean, message: string }) => {
      if (response.success) {
        // this.messagesRemove = 'Record removed!';
        this.close();
        RxPubSub.publish('getTransactionList', {});
        RxPubSub.publish('getCountsList', {});
      } else {
        // this.messagesRemove = 'Removing fail!';
        RxPubSub.publish('getTransactionList', {});
        RxPubSub.publish('getCountsList', {});
      }
      this.close();
    });
  }

  removeCategory() {
    this.api.removeCategory(this.category).subscribe((response: { success: boolean, message: string }) => {
      if (response.success) {
        // this.messagesRemove = 'Record removed!';
        RxPubSub.publish('getTransactionList', {});
        RxPubSub.publish('getCountsList', {});
      } else {
        // this.messagesRemove = 'Removing fail!';
        RxPubSub.publish('getTransactionList', {});
        RxPubSub.publish('getCountsList', {});
      }
      this.close();
    });
  }

  onSubmit() {
    switch (this.id) {
      case 0:
        this.removeTransaction();
        break;
      case 1:
        this.removeCategory();
        break;
      default:
        this.close();
    }
  }

  private initTransactionRemove(): void {
    this.subscriber = RxPubSub.subscribe('showRemoveModal', ({show, data}) => {
      this.response = null;
      this.data = data;
      this.show = show;
      this.id = 0;
    });
  }

  private initCategoryRemove(): void {
    this.subscriber = RxPubSub.subscribe('showRemoveCategory', ({show, data}) => {
      this.response = null;
      this.category = data;
      this.show = show;
      this.id = 1;
    });
  }

}
