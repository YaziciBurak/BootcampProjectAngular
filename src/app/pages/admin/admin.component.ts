import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AdminsidebarPageComponent } from './pages/admin-sidebar-page/admin-sidebar-page.component';
import { AdminNavbarComponent } from './shared/components/admin-navbar/admin-navbar.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports:[RouterModule,RouterOutlet,AdminNavbarComponent,AdminsidebarPageComponent,HttpClientModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  isDropdownOpen: boolean = false;
  isQuizDropDownOpen: boolean = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
    if (this.isDropdownOpen) {
        this.isQuizDropDownOpen = false; 
    }
}
toggleQuizDropDown() {
  this.isQuizDropDownOpen = !this.isQuizDropDownOpen;
  if (this.isQuizDropDownOpen) {
      this.isDropdownOpen = false; 
  }
}
  
}
