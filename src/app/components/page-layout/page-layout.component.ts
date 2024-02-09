import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-page-layout',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './page-layout.component.html',
  styleUrl: './page-layout.component.css',
})
export class PageLayoutComponent {
  @Input() column: boolean = true;
  @Input() centered: boolean = true;
}
