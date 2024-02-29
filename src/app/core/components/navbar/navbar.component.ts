import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../features/auth/services/auth.service';
import { User } from '../../../features/auth/models/user.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{

  user?:User;

  constructor(private authService  : AuthService,private router:Router){ }

  ngOnInit(): void {
    this.authService.user().subscribe({
      next : (response)=>{
         // set response to the user variable

         this.user = response;
      } 
    });
    this.user = this.authService.getUser();
  }


  // ----------- Log Out -----

  onLogout():void{
    this.authService.logout();
    this.router.navigateByUrl('/');
  }

}
