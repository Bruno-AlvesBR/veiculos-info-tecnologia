import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-breadcrumb',
  imports: [],
  templateUrl: './breadcrumb.html',
  styleUrl: './breadcrumb.scss',
})
export class Breadcrumb {
  paths = [{ label: 'início', path: '/' }];

  constructor(private readonly router: Router) {}

  ngOnInit() {
    const filteredRoutes = this.router.config?.filter((route) => route.path && route.path !== '**');
    const mappedRoutes = filteredRoutes.map((route) => ({
      label: route.path ?? '',
      path: `/${route.path}`,
    }));

    this.paths = [...this.paths, ...mappedRoutes];
  }
}
