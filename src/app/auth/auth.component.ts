import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-auth',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent implements OnInit {
  loginForm: any;
  @Output() userName = new EventEmitter()
  returnRoute: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(5)]],
    })
  }
  loginUser() {
    console.log(this.loginForm.value);
    try {
      this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(data => {
        if (data) {
          this.returnRoute = this.route.snapshot.queryParams['returnUrl'] || '/'
          this.router.navigate([this.returnRoute])
          this.loginForm.reset()
        }
      });
    } catch (error) {
      console.log(error);
    }

  }
}
