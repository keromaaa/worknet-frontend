import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from '../logo/logo.component';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { NgClickOutsideDirective } from 'ng-click-outside2';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    LogoComponent,
    RouterLink,
    ToastrModule,
    NgClickOutsideDirective,
  ],
  providers: [AuthService],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  dropdownVisible: boolean = false;
  navbarVisible: boolean = true;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    public auth: AuthService
  ) {}

  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }

  handleClickOutside = () => {
    if (this.dropdownVisible) {
      this.dropdownVisible = !this.dropdownVisible;
    }
  };

  async logOut() {
    const response = await this.auth.logout();

    if (response === true) {
      localStorage.removeItem('Token');
      sessionStorage.removeItem('Token');
      this.router.navigateByUrl('login');
      this.toastr.success('You have logged out successfully.');
    }
  }

  clickedOutside(): void {
    this.dropdownVisible = false;
  }

  scrollingUp() {
    this.navbarVisible = false;
  }
}
