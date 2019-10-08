import { Component, OnInit } from '@angular/core';
import {RxPubSub} from "rx-pubsub";
import {HomeComponent} from "../../pages/home/home.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  showSubmenu:boolean = false;
  home:HomeComponent;

  constructor() { }

  ngOnInit() {

  }

  toggleSubmenu(): void {
    this.showSubmenu = !this.showSubmenu;
  }

  showTransactionModal():void {
    RxPubSub.publish('showTransactionModalHome', {show: true});
  }

  hideSubmenu(): void{
    this.showSubmenu = false;
  }
}
