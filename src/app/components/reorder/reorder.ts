import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-reorder',
  imports: [MatButtonModule, MatMenuModule, MatIconModule],
  templateUrl: './reorder.html',
  styleUrl: './reorder.scss',
})
export class Reorder {
  @Input()
  total: number = 0;

  @Input()
  count: number = 0;

  @Output()
  orderCallback = new EventEmitter<string>();

  handleClickItem(orderType: string) {
    this.orderCallback.emit(orderType);
  }
}
