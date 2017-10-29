import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderService } from '../order.service';
import { FirebaseListObservable } from 'angularfire2/database';
import { Order } from '../order';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit, OnDestroy {
  //orders$: FirebaseListObservable<Order[]>
  orders: Array<Order> = null;
  ordersSubscription: Subscription;

  constructor(private orderService: OrderService, private authService: AuthService) {
    this.orderService.subject$.next(this.authService.currentUserId);
    
  }

  ngOnInit() {
    this.ordersSubscription = this.orderService.getOrdersByUserId()
      .subscribe(o => {
          console.log(o);
          this.orders = o;
      });
  }

  ngOnDestroy() {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.ordersSubscription.unsubscribe();
  }

}
