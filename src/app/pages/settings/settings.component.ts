import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {userId} from "../../config/config";

interface user {
  r_username: string;
  r_email: string;
  r_start_date: string;
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  userData: user;

  constructor(private api: ApiService) {
  }

  ngOnInit() {
    this.initSubscription();
  }

  public getDate(date) {
    let dateObj = new Date(date);
    return `${dateObj.getFullYear()}-${dateObj.getMonth() + 1}-${dateObj.getDate()}`;
  }

  private initSubscription() {
    this.api.getUserProfile(userId).subscribe((response: { success: boolean, data: user }) => {
      if(response.success){
        this.userData = response.data[0];
      }
    });
  }

}
