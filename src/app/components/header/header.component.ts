import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  showSubmenu:boolean = false;

  constructor() { }

  ngOnInit() {
  }

  toggleSubmenu(): void {
    this.showSubmenu = !this.showSubmenu;
  }

  hideSubmenu(): void{
    this.showSubmenu = false;
  }
}
