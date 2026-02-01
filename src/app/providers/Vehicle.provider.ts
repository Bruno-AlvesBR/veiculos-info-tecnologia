import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { VehicleEntity } from '../entities/vehicle.entity';
import { environment } from '../../environments/environment';
import { FilterVehicleDto } from '../dto/filter-vehicle.dto';
import { VehicleDto } from '../dto/vehicle.dto';
import { BaseAPI } from './baseAPI';

@Injectable({ providedIn: 'root' })
export class VehicleProvider extends BaseAPI {
  baseUrl = environment.API_BASE_URL;
  constructor(http: HttpClient) {
    super(http);
  }

  async create(data: VehicleEntity) {
    const response = await this.post(`${this.baseUrl}/vehicles`, {}, data);
    return response;
  }

  async getById(identifier: string): Promise<VehicleDto> {
    const response = await this.get<VehicleDto>(`${this.baseUrl}/vehicles/${identifier}`);
    return response;
  }

  async getAll(filter?: Partial<FilterVehicleDto>): Promise<Array<VehicleDto>> {
    const response = await this.get<Array<VehicleDto>>(`${this.baseUrl}/vehicles`, filter);
    return response;
  }

  async countAll(filter?: Partial<FilterVehicleDto>): Promise<number> {
    const response = await this.get<number>(`${this.baseUrl}/vehicles/count`, filter);
    return response;
  }
}
