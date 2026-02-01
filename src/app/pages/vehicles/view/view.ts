import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CurrencyPipe } from '@angular/common';

import { Breadcrumb } from '../../../components/breadcrumb/breadcrumb';
import { VehicleProvider } from '../../../providers/Vehicle.provider';
import { VehicleDto } from '../../../dto/vehicle.dto';
import { ConfirmDialog } from '../../../components/confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    CurrencyPipe,
    RouterLink,
    Breadcrumb,
  ],
  templateUrl: './view.html',
  styleUrl: './view.scss',
})
export class View {
  vehicle: VehicleDto | null = null;
  loading = true;
  deleting = false;
  errorMessage: string | null = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private vehicleProvider: VehicleProvider,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
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

  openDeleteDialog(): void {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      width: '400px',
      data: {
        title: 'Excluir veículo',
        message: `Tem certeza que deseja excluir o veículo "${this.vehicle?.brand} ${this.vehicle?.name}"? Esta ação não pode ser desfeita.`,
        confirmText: 'Excluir',
        cancelText: 'Cancelar',
      },
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) this.deleteVehicle();
    });
  }

  async deleteVehicle(): Promise<void> {
    if (!this.vehicle) return;

    this.deleting = true;

    try {
      await this.vehicleProvider.deleteById(this.vehicle._id || this.vehicle.id);
      this.snackBar.open('Veículo excluído com sucesso!', 'Fechar', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
      });
      this.router.navigate(['/veiculos']);
    } catch (error) {
      this.errorMessage = 'Não foi possível excluir o veículo. Tente novamente.';
      this.deleting = false;
    }
  }
}
