import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-counts-modal',
  templateUrl: './counts-modal.component.html',
  styleUrls: ['./counts-modal.component.css']
})
export class CountsModalComponent implements OnInit {
  show: boolean = true;

  constructor() { }

  ngOnInit() {
  }

  close() {
    this.show = false;
  }
}
