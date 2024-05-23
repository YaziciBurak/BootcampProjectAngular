import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-admin-home-page',
  standalone: true,
  imports: [CommonModule,RouterModule,HttpClientModule],
  templateUrl: './admin-home-page.component.html',
  styleUrl: './admin-home-page.component.css'
})
export class AdminHomePageComponent {
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
