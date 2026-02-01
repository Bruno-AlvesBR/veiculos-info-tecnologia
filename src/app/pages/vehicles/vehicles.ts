import { Component, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

import { Breadcrumb } from '../../components/breadcrumb/breadcrumb';
import { Filters } from '../../components/filters/filters';
import { Reorder } from '../../components/reorder/reorder';
import { VehicleProvider } from '../../providers/Vehicle.provider';
import { VehicleDto } from '../../dto/vehicle.dto';
import { Card } from '../../components/card/card';
import { FilterVehicleDto } from '../../dto/filter-vehicle.dto';

@Component({
  selector: 'app-vehicles',
  imports: [Breadcrumb, Filters, Reorder, Card, MatIconModule, MatPaginatorModule, RouterLink],
  templateUrl: './vehicles.html',
  styleUrl: './vehicles.scss',
  standalone: true,
})
export class Vehicles {
  showScrollTop = false;

  vehicles: Array<VehicleDto> = [];
  countAllResults = 0;
  currentSearch = '';
  currentOrder = '';
  currentPageIndex = 0;
  currentPageSize = 12;

  constructor(private vehicleProvider: VehicleProvider) {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollTop =
      window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    this.showScrollTop = scrollTop > 700;
  }

  async ngOnInit() {
    await this.loadData();
  }

  buildFilters(extra?: Partial<FilterVehicleDto>): Partial<FilterVehicleDto> {
    const filters: Partial<FilterVehicleDto> = {
      limit: this.currentPageSize,
      offset: this.currentPageIndex === 0 ? 0 : this.currentPageSize * this.currentPageIndex,
    };

    if (this.currentSearch.trim()) {
      filters.name = this.currentSearch.trim();
      filters.brand = this.currentSearch.trim();
    }

    if (this.currentOrder) {
      filters.order = this.currentOrder;
    }

    return { ...filters, ...extra };
  }

  async loadData(extraFilters?: Partial<FilterVehicleDto>) {
    const filters = this.buildFilters(extraFilters);
    const [vehicles, count] = await Promise.all([
      this.vehicleProvider.getAll(filters),
      this.vehicleProvider.countAll(filters),
    ]);

    this.vehicles = vehicles;
    this.countAllResults = count;
  }

  handleScrollTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async handleSearch(searchTerm: string) {
    this.currentSearch = searchTerm;
    this.currentPageIndex = 0;
    await this.loadData();
  }

  async handleOrder(orderType: string) {
    this.currentOrder = orderType;
    this.currentPageIndex = 0;
    await this.loadData();
  }

  async handlePagination(pagination: PageEvent) {
    this.currentPageIndex = pagination.pageIndex;
    this.currentPageSize = pagination.pageSize;
    await this.loadData();
  }
}
