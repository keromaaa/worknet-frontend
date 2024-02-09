import { CanActivateFn, Router } from '@angular/router';

export const authRedirectGuard: CanActivateFn = (route, state) => {

  const router = new Router()
  const token = localStorage.getItem('Token') ?? sessionStorage.getItem('Token')

  if (!!token){
    router.navigate(['landingPage'])
    return false
  }
  else return true;
};
