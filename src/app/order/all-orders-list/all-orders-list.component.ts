import { Observable } from 'rxjs/Observable';
import { FirebaseListObservable } from 'angularfire2/database';
import { OrderService } from './../order.service';
import { Component, OnInit } from '@angular/core';
import { Order } from '../order';
import 'rxjs/add/operator/groupBy';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Component({
  selector: 'app-all-orders-list',
  templateUrl: './all-orders-list.component.html',
  styleUrls: ['./all-orders-list.component.css']
})
export class AllOrdersListComponent implements OnInit {
  numOrders: number;
  // orderListSummary$: any;
  orders$: FirebaseListObservable<Order[]>;


  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.orders$ = this.orderService.getOrdersList({
      orderByChild: 'name'
    });
    this.orders$.subscribe(
      order => this.numOrders = order.length
    );

    // this.orders$.forEach(order => console.log(order));
    // this.orderListSummary$ = this.orders$ as Observable<any[]>;
    // this.orderListSummary$
    //   .map(order => order[0].summary);
      // .groupBy(order => order.summary)
      // .mergeMap(group => group.reduce((acc, curr) =>
      //     [...acc, ...curr], []
      // ));
    //   .map(val => val.length + ' X ' + val[0].summary);
    // this.orderListSummary$.forEach(item => console.log(item));
  }

}
