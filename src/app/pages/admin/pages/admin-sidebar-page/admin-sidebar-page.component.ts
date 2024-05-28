import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar-page',
  standalone: true,
  imports: [CommonModule,RouterModule,HttpClientModule],
  templateUrl: './admin-sidebar-page.component.html',
  styleUrl: './admin-sidebar-page.component.css'
})
export class AdminsidebarPageComponent {
  isDropdownOpen: boolean = false;
  isQuizDropDownOpen: boolean = false;
  isImageDropdownOpen: boolean = false;
  isApplicantDropDownOpen: boolean = false;
  isBootcampDropDownOpen: boolean = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
    if (this.isDropdownOpen) {
        this.isQuizDropDownOpen = false; 
        this.isImageDropdownOpen = false;
        this.isApplicantDropDownOpen = false;
        this.isBootcampDropDownOpen = false;
    }
}
toggleQuizDropDown() {
  this.isQuizDropDownOpen = !this.isQuizDropDownOpen;
  if (this.isQuizDropDownOpen) {
      this.isDropdownOpen = false; 
      this.isImageDropdownOpen = false;
      this.isApplicantDropDownOpen = false;
      this.isBootcampDropDownOpen = false;
  }
}
toggleImageDropdown() {
  this.isImageDropdownOpen = !this.isImageDropdownOpen;
  if (this.isImageDropdownOpen) {
    this.isDropdownOpen = false;
    this.isQuizDropDownOpen = false;
    this.isApplicantDropDownOpen = false;
    this.isBootcampDropDownOpen = false;
  }
}
toggleApplicantDropDown() {
  this.isApplicantDropDownOpen = !this.isApplicantDropDownOpen;
  if (this.isApplicantDropDownOpen) {
    this.isDropdownOpen = false;
    this.isQuizDropDownOpen = false;
    this.isImageDropdownOpen = false;
    this.isBootcampDropDownOpen = false;
  }
}
toggleBootcampDropDown() {
  this.isBootcampDropDownOpen = !this.isBootcampDropDownOpen; 
  if(this.isBootcampDropDownOpen) {
    this.isDropdownOpen = false;
    this.isQuizDropDownOpen = false;
    this.isImageDropdownOpen = false;
    this.isApplicantDropDownOpen = false;
  }
}
}
