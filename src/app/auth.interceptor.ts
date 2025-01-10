import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req:HttpRequest<any>, next) => {
  let token = 'test'
  if(typeof window !== 'undefined' && window.localStorage){
    token = window.localStorage.getItem('token') || ''
  }
  const request = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  })
  return next(request)
};
