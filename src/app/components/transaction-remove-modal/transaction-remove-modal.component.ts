import {Component, OnInit, OnDestroy} from '@angular/core';
import {RxPubSub} from 'rx-pubsub';
import {ApiService} from '../../services/api.service';

interface Response {
  success: boolean;
  message?: string;
}

interface Data {
  user_id: number;
  transaction_id: number;
}

@Component({
  selector: 'app-transaction-remove-modal',
  templateUrl: './transaction-remove-modal.component.html',
  styleUrls: ['./transaction-remove-modal.component.css']
})

export class TransactionRemoveModalComponent implements OnInit, OnDestroy {
  show = false;
  subscriber: any;
  response: Response;
  data: Data;

  constructor(private api: ApiService) {
  }

  ngOnInit() {
    this.initSubscriber();
  }

  ngOnDestroy(): void {
    if (this.subscriber) {
      RxPubSub.unsubscribe(this.subscriber);
    }
  }

  close(): void {
    this.show = false;
  }

  onSubmit() {
    this.api.removeTransaction(this.data).subscribe((response: { success: boolean, message: string }) => {
      if (response.success) {
        // this.messagesRemove = 'Record removed!';
        RxPubSub.publish('getTransactionList', {});
        RxPubSub.publish('getCountsList', {});
        this.show = false;
      } else {
        // this.messagesRemove = 'Removing fail!';
        RxPubSub.publish('getTransactionList', {});
        RxPubSub.publish('getCountsList', {});
      }
    });
    this.show = false;
  }

  private initSubscriber(): void {
    this.subscriber = RxPubSub.subscribe('showRemoveModal', ({show, data}) => {
      this.response = null;
      this.data = data;
      this.show = show;
    });
  }

}
