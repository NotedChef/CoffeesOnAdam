import { FirebaseListObservable } from 'angularfire2/database';
import { OrderService } from './../order.service';
import { Component, OnInit } from '@angular/core';
import { Order } from '../order';

@Component({
  selector: 'app-all-orders-list',
  templateUrl: './all-orders-list.component.html',
  styleUrls: ['./all-orders-list.component.css']
})
export class AllOrdersListComponent implements OnInit {
  orders$: FirebaseListObservable<Order[]>;

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.orders$ = this.orderService.getOrdersList();
  }

}
