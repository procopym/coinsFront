import {Component, OnInit} from '@angular/core';
import {RxPubSub} from "rx-pubsub";
import {Counts} from "../../pages/home/home.component";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../../services/api.service";
import {userId} from "../../config/config";

@Component({
  selector: 'app-counts-modal',
  templateUrl: './counts-modal.component.html',
  styleUrls: ['./counts-modal.component.css']
})
export class CountsModalComponent implements OnInit {
  subscriber: any;
  show: boolean = false;
  groupId: number = null;
  category: Counts;
  request: FormGroup;

  constructor(private api: ApiService) {
  }

  ngOnInit() {
    this.initSubscriber();
  }

  private initSubscriber(): void {
    this.subscriber = RxPubSub.subscribe('addUserCategory', ({show, group, category}) => {
      this.show = show;
      this.groupId = category ? category.r_group_id : group;
      this.category = category;
      this.initForm(this.category);
    });
  }

  get categoryNameControl() {
    return this.request.get('categoryName');
  }

  private initForm(category?: Counts): void {
    const categoryName = category ? category.r_category_name : null;
    this.request = new FormGroup({
      categoryName: new FormControl(categoryName, [Validators.required, Validators.minLength(1)])
    });
  }


  close() {
    this.show = false;
    this.groupId = null;
    this.category = null;
  }

  onSubmit() {
    // console.log({
    //   user_id: userId, category_name: this.request.value.categoryName, type: this.groupId
    // });
    if (this.request.valid) {
      if(!this.category){
        this.api.createCategory({
          user_id: userId, category_name: this.request.value.categoryName, type: this.groupId
        }).subscribe((response:{success: boolean})=>{
          if (response.success) {
            RxPubSub.publish('getCountsList', {});
            this.close();
          } else {
          }
        });
      }else{
        if(this.category.r_category_name !== this.request.value.categoryName){
        this.api.createCategory({
          user_id: userId, category_name: this.request.value.categoryName, type: this.groupId, category_id: this.category.r_category_id
        }).subscribe((response:{success: boolean})=>{
          if (response.success) {
            RxPubSub.publish('getCountsList', {});
            RxPubSub.publish('getTransactionList', {});
            this.close();
          } else {
          }
        });
        }
        this.close();
      }
    }
  }
}
