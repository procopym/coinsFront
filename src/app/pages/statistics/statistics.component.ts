import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-requests',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  private actualTab: number = 1;

  constructor() {
  }

  ngOnInit() {

  }

  setActualTab(actualTab:number){
    this.actualTab = actualTab;
  }

  getActualTab(actualTab):boolean{
    return actualTab === this.actualTab;
  }
}
