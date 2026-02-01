import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CurrencyPipe } from '@angular/common';

import { VehicleDto } from '../../dto/vehicle.dto';

@Component({
  selector: 'app-card',
  imports: [MatIconModule, CurrencyPipe],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class Card {
  @Input()
  vehicle: VehicleDto;

  constructor(public router: Router) {}
}
