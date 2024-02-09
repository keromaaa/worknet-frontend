import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from '../logo/logo.component';

@Component({
  selector: 'app-form-layout',
  standalone: true,
  imports: [CommonModule, LogoComponent],
  templateUrl: './form-layout.component.html',
  styleUrl: './form-layout.component.css',
})
export class FormLayoutComponent {}
