import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterModule, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component'; 
import { LoginComponent } from './features/components/login/login.component';
import { SharedModule } from 'primeng/api';
import { RegisterComponent } from './features/components/register/register.component';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { initFlowbite } from 'flowbite';
import { FooterComponent } from './shared/components/footer/footer.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NavbarComponent,CommonModule,RouterModule,LoginComponent,SharedModule,RegisterComponent,HomepageComponent,FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'BootcampProject'; 
  shouldShowNavbar: boolean = true;
  constructor(private router:Router) {} 

  ngOnInit(): void {
    initFlowbite();
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Eğer admin paneline gidiyorsak navbar'ı gizle
        if (event.url.includes('/admin')) {
          this.shouldShowNavbar = false;
        } else {
          this.shouldShowNavbar = true;
        }
      }
    });
  }
}
