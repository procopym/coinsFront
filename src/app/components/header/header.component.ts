import {Component, OnDestroy, OnInit} from '@angular/core';
import {RxPubSub} from "rx-pubsub";
import {Counts} from "../../pages/home/home.component";
import {ApiService} from "../../services/api.service";
import {userID} from "../../config/config";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  showSubmenu: boolean = false;
  counts: Counts[] = [];
  subscriber: any;

  constructor(private api: ApiService) {
  }

  ngOnInit() {
  }


  ngOnDestroy(): void {
    if (this.subscriber) {
      RxPubSub.unsubscribe(this.subscriber);
    }
  }


  toggleSubmenu(): void {
    this.showSubmenu = !this.showSubmenu;
  }

  showTransactionModal(): void {
    this.api.getUserCounts(userID).subscribe((response: { success: boolean, data: Counts[], message: string }) => {
      if (response.success) {
        this.counts = response.data;
        RxPubSub.publish('showTransactionModal', {show: true, counts: this.counts})
        this.hideSubmenu();
      } else {
        this.counts = [];
        RxPubSub.publish('showTransactionModal', {show: true, counts: this.counts})
        this.hideSubmenu();
      }
    });
  }

  hideSubmenu(): void {
    this.showSubmenu = false;
  }
}
