import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { FirebaseListObservable } from 'angularfire2/database';
import { Order } from '../order';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  orders$: FirebaseListObservable<Order[]>;

  constructor(private orderService: OrderService, private authService: AuthService) {
    this.orderService.subject$.next(this.authService.currentUserId);
    this.orders$ = this.orderService.getOrdersByUserId();
  }

  ngOnInit() {

  }

}
