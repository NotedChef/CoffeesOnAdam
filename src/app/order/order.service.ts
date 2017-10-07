import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import { Order } from './order';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/take';

@Injectable()
export class OrderService {
  subject$ = new BehaviorSubject<string>(undefined);
  userOrders$: FirebaseListObservable<any[]>;
  orders$: FirebaseListObservable<Order[]> = null;
  order$: FirebaseObjectObservable<Order> = null;
  private basePath = '/Orders';

  constructor(private db: AngularFireDatabase, private authService: AuthService) {
  }

  // Create a brand new order
  createOrder(order: Order): void {
    this.orders$.push(order)
      .catch(error => this.handleError(error));
  }

  // Return an observable list with optional query
  // You will usually call this from OnInit in a component
  getOrdersList(query = {}): FirebaseListObservable<Order[]> {
    this.orders$ = this.db.list('/Orders', {
      query: query
    });
    return this.orders$;
  }

  getOrdersByUserId(): FirebaseListObservable<Order[]> {
    this.orders$ = this.db.list('/Orders',
      {
        query: {
          orderByChild: 'uid',
          equalTo: this.subject$
        }
      }
    );
    // this.orders$.subscribe(order => console.log(order));

    return this.orders$;
  }

  getUserOrdersList(query = {}): FirebaseListObservable<any[]> {
    this.userOrders$ = this.db.list('/userOrders/' + this.authService.currentUserId, {
      query: query
    });
    return this.userOrders$;
  }

  // Return a single observable item
  getOrder(key: string): FirebaseObjectObservable<Order> {
    const orderPath = `${this.basePath}/${key}`;
    this.order$ = this.db.object(orderPath);
    return this.order$;
  }

  updateOrder(key: string, value: any): void {
    this.orders$.update(key, value)
      .catch(error => this.handleError(error));
  }

  removeOrder(key: string): void {
    this.orders$.remove(key)
      .catch(error => this.handleError(error));
  }

  removeAll(): void {
    this.order$.remove()
      .catch(error => this.handleError(error));
  }

  private handleError(error) {
    console.log(error);
    return Observable.throw(error);
  }




}
