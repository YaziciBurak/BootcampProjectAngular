import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component'; 
import { LoginComponent } from './features/components/login/login.component';
import { SharedModule } from 'primeng/api';
import { RegisterComponent } from './features/components/register/register.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NavbarComponent,RouterModule,LoginComponent,SharedModule,RegisterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'BootcampProject';
}
