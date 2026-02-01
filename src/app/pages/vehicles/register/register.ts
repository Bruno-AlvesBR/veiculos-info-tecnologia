import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { Breadcrumb } from '../../../components/breadcrumb/breadcrumb';
import { VehicleProvider } from '../../../providers/Vehicle.provider';
import { VehicleEntity } from '../../../entities/vehicle.entity';
import { PriceMaskDirective } from '../../../directives/price-mask.directive';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    Breadcrumb,
    PriceMaskDirective,
  ],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  submitted = false;
  loading = false;
  errorMessage: string | null = null;

  form = this.formBuilder.nonNullable.group({
    brand: ['', [Validators.required, Validators.minLength(2)]],
    name: ['', [Validators.required, Validators.minLength(2)]],
    yearFabrication: [
      new Date().getFullYear(),
      [Validators.required, Validators.min(1900), Validators.max(2100)],
    ],
    yearLaunch: [
      new Date().getFullYear(),
      [Validators.required, Validators.min(1900), Validators.max(2100)],
    ],
    price: ['', [Validators.required]],
    imageUrl: ['', [Validators.required, Validators.pattern(/^https?:\/\/.+/)]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private vehicleProvider: VehicleProvider,
    private router: Router
  ) {}

  get formControls() {
    return this.form.controls;
  }

  async onSubmit() {
    this.submitted = true;
    this.errorMessage = null;

    if (this.form.invalid) return;

    this.loading = true;
    const value = this.form.getRawValue();

    const entity: VehicleEntity = {
      brand: value.brand,
      name: value.name,
      yearFabrication: value.yearFabrication,
      yearLaunch: value.yearLaunch,
      price: value.price,
      imageUrl: value.imageUrl,
    };

    try {
      await this.vehicleProvider.create(entity);
      this.router.navigate(['/veiculos']);
    } catch (error) {
      this.errorMessage = 'Não foi possível cadastrar o veículo. Tente novamente.';
    } finally {
      this.loading = false;
    }
  }
}
