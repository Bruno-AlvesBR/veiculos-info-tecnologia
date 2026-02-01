import { Component, EventEmitter, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filters',
  imports: [MatIconModule, MatInputModule, MatFormFieldModule, FormsModule],
  templateUrl: './filters.html',
  styleUrl: './filters.scss',
})
export class Filters {
  searchTerm = '';

  @Output()
  searchChange = new EventEmitter<string>();

  onSearchChange() {
    this.searchChange.emit(this.searchTerm);
  }
}
