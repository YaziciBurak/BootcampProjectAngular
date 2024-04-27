import { Component,Input,OnInit  } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from '../../../features/components/login/login.component';
import { RegisterComponent } from '../../../features/components/register/register.component';
import { BootcampListGroupComponent } from '../../../features/components/bootcamps/bootcamp-list-group/bootcamp-list-group.component';
import { CommonModule } from '@angular/common';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../../features/services/concretes/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule,HttpClientModule,LoginComponent,RegisterComponent,BootcampListGroupComponent,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  isLoggedIn!: boolean; 
  isAdmin!: boolean; 
  menuItems!:MenuItem[];
  userLogged!:boolean;
  constructor(private authService:AuthService,private router:Router){}

  ngOnInit(): void {
    this.getMenuItems();
    console.log(this.getUserName());
    console.log(this.getUserId())
    console.log(this.authService.getRoles())
  }

  logOut(){
    this.authService.logOut();
    this.router.navigate(['home-page'])
   }
   
   setUserLogged() :boolean{
    return this.userLogged=this.authService.loggedIn()
   }

   getUserName():string{
    return this.authService.getUserName();
   }

   getUserId():string{
    return this.authService.getCurrentUserId();
   }



   async getMenuItems(){
    const isUserLoggedIn = await this.authService.loggedIn();
    if(isUserLoggedIn){
      this.isLoggedIn = true;
    }
    else{
      this.isLoggedIn = false;
    }
    if(this.authService.isAdmin()){

        this.isAdmin = true;
    }
   }
   showSearchInput: boolean = false;

   toggleSearch() {
     this.showSearchInput = !this.showSearchInput;
     if (this.showSearchInput) {
       setTimeout(() => {
         const inputElement = document.getElementById('searchInput');
         if (inputElement) {
           inputElement.focus();
         }
       });
 }
   }
  }

