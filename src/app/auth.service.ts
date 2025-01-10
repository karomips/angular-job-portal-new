import { Injectable } from '@angular/core';
import { delay, Observable, of ,throwError} from 'rxjs';


const usersList = ['admin@yopmail.com', 'admin@example.com']

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor() { }

  login(username: string, password: string){
    // Simulate authentication logic
    if (usersList.includes(username) && password.length >= 5) {
      localStorage.setItem('token','sampleToken')
      return of({
        message: 'Login successful'
      }).pipe(delay(1000))
    } else {
      throw new Error(JSON.stringify({message:"Incorrect username or password"}))
    }
  }
}
