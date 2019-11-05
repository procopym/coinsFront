import {Component, OnDestroy, OnInit} from '@angular/core';
import {RxPubSub} from "rx-pubsub";
import {Counts} from "../../pages/home/home.component";
import {ApiService} from "../../services/api.service";
import {userId} from "../../config/config";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  showSubmenu: boolean = false;
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
    this.api.getUserCounts(userId).subscribe((response: { success: boolean, data: Counts[], message: string }) => {
      if (response.success) {
        RxPubSub.publish('showTransactionModal', {show: true, counts: response.data})
        this.hideSubmenu();
      } else {
        RxPubSub.publish('showTransactionModal', {show: true, counts: []})
        this.hideSubmenu();
      }
    });
  }

  hideSubmenu(): void {
    this.showSubmenu = false;
  }
}
