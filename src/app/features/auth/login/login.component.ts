import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
import { LoginRequest } from '../models/login-request-model';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private authService: AuthService,
    private cookieService: CookieService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$'),
        ],
      ],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      // Send details to database

      const loginRequestData: LoginRequest = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      };

      this.authService.Login(loginRequestData).subscribe({
        next: (response) => {
          
          // set auth cookie

          this.cookieService.set(
            'Authorization',
            `Bearer ${response.token}`,
            undefined,
            '/',
            undefined,
            true,
            'Strict'
          );

          // set user

            this.authService.setUser({
              email : response.email,
              role : response.role
            });



          // -- toastr

          this.toastr.success('', 'Login successful !', {
            timeOut: 3000,
          });
          //--------- Routing --------

         

          if(response.role === "Admin") {
            this.router.navigateByUrl('/admin');
          }else if(response.role === "Service Advisor"){
            this.router.navigateByUrl('/sa/vehicles');            
          }
          else{
            this.router.navigateByUrl('/'); 
          }

          
        },
        error: (err) => {
          this.toastr.error('', err.error.errors[''][0], {
            timeOut: 3000,
          });
        },
      });
    } else {
      // throw error through toastr

      this.toastr.error('', 'Invalid credentials', {
        timeOut: 3000,
      });

      
    }
  }

 
}
