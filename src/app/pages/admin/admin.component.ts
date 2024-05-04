import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AdminHomePageComponent } from './pages/admin-home-page/admin-home-page.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterOutlet,HttpClientModule,RouterModule,CommonModule,AdminHomePageComponent],
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
