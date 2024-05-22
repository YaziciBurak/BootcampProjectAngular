import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from '../../../features/components/login/login.component';
import { RegisterComponent } from '../../../features/components/register/register.component';
import { BootcampListGroupComponent } from '../../../features/components/bootcamps/bootcamp-list-group/bootcamp-list-group.component';
import { CommonModule } from '@angular/common';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../../features/services/concretes/auth.service';
import { Dropdown, DropdownOptions, InstanceOptions, initFlowbite } from 'flowbite';
import { BootcampService } from '../../../features/services/concretes/bootcamp.service';
import { FormsModule } from '@angular/forms';
import { GetlistBootcampResponse } from '../../../features/models/responses/bootcamp/getlist-bootcamp-response';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, HttpClientModule, LoginComponent, RegisterComponent, BootcampListGroupComponent, CommonModule, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @Input() searchQuery: string;
  isLoggedIn!: boolean;
  isAdmin!: boolean;
  menuItems!: MenuItem[];
  userLogged!: boolean;
  searchResults: GetlistBootcampResponse[] = [];
  searchDropdown: Dropdown;
  constructor(private bootcampService: BootcampService,
     private authService: AuthService,
      private router: Router,
      private change:ChangeDetectorRef
    ) { }

  ngOnInit(): void {
    initFlowbite();
    this.getMenuItems();
    this.getRoles();
    this.ngAfterViewInit();
    const $targetEl = document.getElementById('dropdownSearchResults');
    const $triggerEl = document.getElementById('search-bar');
    const options: DropdownOptions = {
      placement: 'bottom',
      triggerType: 'none',
      ignoreClickOutsideClass: false,
    };
    const instanceOptions: InstanceOptions = {
      id: 'dropdownSearchResults',
      override: true
    };
    this.searchDropdown = new Dropdown($targetEl, $triggerEl, options, instanceOptions);
  }

  logOut() {
    this.authService.logOut();
    this.router.navigate(['homepage'])
  }
  ngAfterViewInit(): void {
    this.authService.loggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
      this.change.detectChanges();
    });
  }
  checkUserRoles() {
    this.isLoggedIn = this.authService.loggedIn();
    this.isAdmin = this.authService.isAdmin();
  }
  getRoles(): string[] {
    return this.authService.getRoles();
  }
  getUserName(): string {
    return this.authService.getUserName();
  }

  getUserId(): string {
    return this.authService.getCurrentUserId();
  }

  async getMenuItems() {
    const isUserLoggedIn = await this.authService.loggedIn();
    if (isUserLoggedIn) {
      this.isLoggedIn = true;
    }
    else {
      this.isLoggedIn = false;
    }
    if (this.authService.isAdmin()) {

      this.isAdmin = true;
    }
  }

  onSearchInput(query: string) {
    if (!query) {
      this.searchDropdown.hide();
    }

    this.bootcampService.getListBootcampByDynamic(
      { pageIndex: 0, pageSize: 5 },
      {
        filter: {
          field: "name",
          operator: "contains",
          value: query
        }
      },
    ).subscribe(response => {
      this.searchResults = response.items;
      this.searchDropdown.show();
    }, error => console.error("failed to search bootcamps:", error))
  }
}

