import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class authGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.checkAuthentication();
  }

  async checkAuthentication(): Promise<boolean> {
    const isAuthenticate: boolean =
      await this.authService.isAuthenticatedUser();

    if (isAuthenticate) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
