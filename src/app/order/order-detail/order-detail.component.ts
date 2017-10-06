import { Component, OnInit, Input } from '@angular/core';
import { Order } from '../order';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  @Input() order: Order;
  constructor(private orderService: OrderService) { }

  ngOnInit() {
  }

  removeOrder() {
    this.orderService.removeOrder(this.order.$key);
  }

}
