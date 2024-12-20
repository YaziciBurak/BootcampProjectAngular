import {
  ChangeDetectorRef,
  ElementRef,
  Component,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';
import { NavigationSkipped, NavigationStart, Router, RouterLink, RouterModule } from '@angular/router';
import { LoginComponent } from '../../../features/components/login/login.component';
import { RegisterComponent } from '../../../features/components/register/register.component';
import { CommonModule } from '@angular/common';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../../features/services/concretes/auth.service';
import {
  Collapse,
  Dropdown,
  DropdownOptions,
  InstanceOptions,
  initFlowbite,
} from 'flowbite';
import { BootcampService } from '../../../features/services/concretes/bootcamp.service';
import { FormsModule } from '@angular/forms';
import { GetlistBootcampResponse } from '../../../features/models/responses/bootcamp/getlist-bootcamp-response';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  @Input() searchQuery: string;
  isLoggedIn!: boolean;
  isAdmin!: boolean;
  menuItems!: MenuItem[];
  userLogged!: boolean;
  searchResults: GetlistBootcampResponse[] = [];
  searchDropdown: Dropdown;
  isMenuOpen = false;
  constructor(
    private bootcampService: BootcampService,
    private authService: AuthService,
    private router: Router,
    private change: ChangeDetectorRef,
    private renderer: Renderer2,
    private el: ElementRef

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
      override: true,
    };
    this.searchDropdown = new Dropdown(
      $targetEl,
      $triggerEl,
      options,
      instanceOptions
    );

    this.initHamburgerMenu();
    this.initProfileMenu();
  }

  initHamburgerMenu() {
    // set the target element that will be collapsed or expanded (eg. navbar menu)
    const $targetEl = document.getElementById('navbar-hamburger');

    // optionally set a trigger element (eg. a button, hamburger icon)
    const $triggerEl = document.getElementById('hamburger-open');

    // optional options with default values and callback functions
    const options = {};

    const instanceOptions = {
      id: 'targetEl',
      override: true
    };

    const collapse = new Collapse($targetEl, $triggerEl, options, instanceOptions);

    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart || event instanceof NavigationSkipped) {
        collapse.collapse();
      }
    });
  }

  initProfileMenu() {
    // set the target element that will be collapsed or expanded (eg. navbar menu)
    const $targetEl = document.getElementById('profile-menu');

    // optionally set a trigger element (eg. a button, hamburger icon)
    const $triggerEl = document.getElementById('profile');

    // optional options with default values and callback functions

    const options: DropdownOptions = {

    };
    const instanceOptions = {
      id: 'targetEl',
      override: true
    };

    const dropdown = new Dropdown($targetEl, $triggerEl, options);
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart || event instanceof NavigationSkipped) {
        dropdown.hide(); // Collapse yerine hide kullanılır
      }
    });
  }

  logOut() {
    this.authService.logOut();
    this.router.navigate(['homepage']);
  }
  ngAfterViewInit(): void {
    this.authService.loggedIn$.subscribe((isLoggedIn) => {
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
    } else {
      this.isLoggedIn = false;
    }
    if (this.authService.isAdmin()) {
      this.isAdmin = true;
    }
  }

  onSearchInput(query: string) {
    if (!query || query == "") {
      this.searchDropdown.hide();
    }

    this.bootcampService
      .getListBootcampByDynamic(
        { pageIndex: 0, pageSize: 5 },
        {
          filter: {
            field: 'name',
            operator: 'contains',
            value: query,
          },
        }
      )
      .subscribe(
        (response) => {
          this.searchQuery = query;
          this.searchResults = response.items;
          this.searchDropdown.show();
        },
        (error) => console.error('failed to search bootcamps:', error)
      );
  }
  goToFAQ(): void {
    const homepageContent = document.getElementById('homepage-content');
    if (homepageContent) {
      const faqSection = homepageContent.querySelector('#faq-section');
      if (faqSection) {
        faqSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      this.router.navigate(['/sss']);
    }
  }
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
