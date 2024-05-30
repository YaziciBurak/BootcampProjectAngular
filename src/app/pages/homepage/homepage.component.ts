import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { HomepageIllustrationComponent } from './homepage-illustration/homepage-illustration.component';
import { HomepageSecondComponent } from './homepage-second/homepage-second.component';
import { HomepageTickerComponent } from './homepage-ticker/homepage-ticker.component';
import { HomepageBootcamplistComponent } from './homepage-bootcamplist/homepage-bootcamplist.component';
import { HomepageSubscribeComponent } from './homepage-subscribe/homepage-subscribe.component';
import { HomepageInstructorlistComponent } from './homepage-instructorlist/homepage-instructorlist.component';
import { HomepageStatisticsComponent } from './homepage-statistics/homepage-statistics.component';
import { HomepageFaqComponent } from './homepage-faq/homepage-faq.component';

import { FooterComponent } from '../../shared/components/footer/footer.component';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    CommonModule,
    NavbarComponent,
    HomepageIllustrationComponent,
    HomepageSecondComponent,
    HomepageTickerComponent,
    HomepageBootcamplistComponent,
    HomepageSubscribeComponent,
    HomepageInstructorlistComponent,
    HomepageStatisticsComponent,
    HomepageFaqComponent, 
    FooterComponent,
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
})
export class HomepageComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {
    window.scrollTo(0, 0);
  }
}
