import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BootcampListGroupComponent } from '../../features/components/bootcamps/bootcamp-list-group/bootcamp-list-group.component';
import { HomepageIllustrationComponent } from './homepage-illustration/homepage-illustration.component';
import { HomepageSecondComponent } from './homepage-second/homepage-second.component';
import { HomepageTickerComponent } from './homepage-ticker/homepage-ticker.component';

import { HomepageBootcamplistComponent } from './homepage-bootcamplist/homepage-bootcamplist.component';
import { HomepageSubscribeComponent } from './homepage-subscribe/homepage-subscribe.component';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule, HttpClientModule, NavbarComponent, BootcampListGroupComponent, HomepageIllustrationComponent,
    HomepageSecondComponent, HomepageTickerComponent, HomepageBootcamplistComponent, HomepageSubscribeComponent
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {}


