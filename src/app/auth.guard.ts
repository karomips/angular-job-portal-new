import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router } from "@angular/router";

@Injectable({
  providedIn:'root'
})
export class AuthGuard implements CanActivate{

  constructor(private router:Router){}
  canActivate(route:ActivatedRouteSnapshot,state:any){
    let token = typeof window !== 'undefined' ? window.localStorage.getItem('token') : null;
    if(token){
      return true;
    }
    return false;
  }
}
