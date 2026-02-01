import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CurrencyPipe } from '@angular/common';

import { Breadcrumb } from '../../../components/breadcrumb/breadcrumb';
import { VehicleProvider } from '../../../providers/Vehicle.provider';
import { VehicleDto } from '../../../dto/vehicle.dto';

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [MatIconModule, CurrencyPipe, RouterLink, Breadcrumb],
  templateUrl: './view.html',
  styleUrl: './view.scss',
})
export class View {
  vehicle: VehicleDto | null = null;
  loading = true;
  errorMessage: string | null = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private vehicleProvider: VehicleProvider,
    private router: Router
  ) {}

  async ngOnInit() {
    const identifier = this.activatedRoute.snapshot.paramMap.get('id');

    if (!identifier) {
      this.router.navigate(['/veiculos']);
      return;
    }

    try {
      this.vehicle = await this.vehicleProvider.getById(identifier);
    } catch (error) {
      this.errorMessage = 'Não foi possível carregar os dados do veículo. Tente novamente.';
    } finally {
      this.loading = false;
    }
  }
}
