import { NgForm, FormControl } from '@angular/forms';
import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import { OrderService } from '../order.service';
import { Order } from '../order';
import { AuthService } from '../../auth/auth.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.css']
})
export class OrderEditComponent implements OnInit, AfterViewInit {
  snackBar: MatSnackBar;
  firstName: string;
  @ViewChild('coffeeStyle', {read: ElementRef}) coffeeStyle: ElementRef;
  @ViewChild('orderForm') orderForm: NgForm;

  photoUrl: string;
  order: Order = new Order();

  styles = [{value: 'Flat White'}, {value: 'Latte'}, {value: 'Cappuccino'}, {value: 'Long Black'}];
  sizes = [{value: 'Small'}, {value: 'Regular'}, {value: 'Large'} ];
  milks = [{value: 'Full'}, {value: 'Skinny'}, {value: 'Soy'}, {value: 'Almond'}];

  constructor(
    private orderService: OrderService,
    private authService: AuthService,
    private snackbar: MatSnackBar) {
    this.photoUrl = this.authService.currentUserImageUrl;
    this.firstName = this.authService.currentUserDisplayName.split(' ', 1)[0];
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    console.log(this.coffeeStyle.nativeElement);
    this.coffeeStyle.nativeElement.focus();
}

  createOrder() {
    if (!this.authService.authenticated) {
      this.authService.googleLogin();
    }
    // console.log('CreateOrder userid: ', this.authService.currentUserId);
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

    this.alert('Your order has been placed and will be delivered shortly.');

  }

  generateSummary(order): string  {
    let summary = order.size;
    if (order.style !== 'Long Black' && order.milk !== 'Full') {
      summary += ' ' + order.milk;
    }
    summary += ' ' + order.style;
    return summary;
  }

  private alert(message: string) {
    this.snackbar.open(message, 'GOT IT!', { duration: 5000, verticalPosition: 'top', politeness: 'polite' });
  }



}
