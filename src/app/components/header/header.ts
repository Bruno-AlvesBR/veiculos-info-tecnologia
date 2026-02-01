import { Component, HostListener, signal } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

const MOBILE_BREAKPOINT = 768;

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrl: './header.scss',
  standalone: true,
  imports: [MatIconModule, NgTemplateOutlet],
})
export class Header {
  isMobile = signal(window.innerWidth < MOBILE_BREAKPOINT);
  menuOpen = false;
  logoChars = ['L', 'O', 'Q', 'U', 'E', 'I'];
  paths = [
    { path: '/#sobre', label: 'Sobre' },
    { path: '/veiculos', label: 'Listagem de veículos' },
  ];

  @HostListener('window:resize')
  onResize() {
    this.isMobile.set(window.innerWidth < MOBILE_BREAKPOINT);
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }
}
