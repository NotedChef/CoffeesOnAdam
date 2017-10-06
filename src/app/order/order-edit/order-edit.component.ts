import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import { OrderService } from '../order.service';
import { Order } from '../order';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.css']
})
export class OrderEditComponent implements OnInit {
  @ViewChild('orderForm')
  orderForm: NgForm;

  photoUrl: string;
  order: Order = new Order();

  styles = [{value: 'Flat White'}, {value: 'Latte'}, {value: 'Cappuccino'}, {value: 'Long Black'}];
  sizes = [{value: 'Small'}, {value: 'Regular'}, {value: 'Large'}];
  milks = [{value: 'Full'}, {value: 'Skinny'}, {value: 'Soy'}, {value: 'Almond'}];

  constructor(private orderService: OrderService, private authService: AuthService) {
    this.photoUrl = this.authService.currentUserImageUrl;
  }

  ngOnInit() {}

  createOrder() {
    if (!this.authService.authenticated) {
      this.authService.googleLogin();
    }
    console.log('CreateOrder userid: ', this.authService.currentUserId);
    this.order.summary = this.generateSummary(this.order);
    this.order.milk = this.order.style === 'Long Black' ? '' : this.order.milk;
    this.order.name = this.authService.currentUserDisplayName;
    this.order.uid = this.authService.currentUserId;
    this.order.imageUrl = this.authService.currentUserImageUrl;
    this.orderService.createOrder(this.order);

    // clear out order
    this.order = new Order();
    this.orderForm.form.markAsPristine();
    this.orderForm.form.markAsUntouched();
    this.orderForm.form.updateValueAndValidity();
  }

  generateSummary(order): string  {
    let summary = order.size;
    if (order.style !== 'Long Black' && order.milk !== 'Full') {
      summary += ' ' + order.milk;
    }
    summary += ' ' + order.style;
    return summary;
  }



}
