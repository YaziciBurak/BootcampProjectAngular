import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

type TickerCompany = {
  name: string;
  imageUrl: string;
  extraClasses: string;
};

@Component({
  selector: 'app-homepage-ticker',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './homepage-ticker.component.html',
  styleUrl: './homepage-ticker.component.css',
})
export class HomepageTickerComponent {
  companies: TickerCompany[] = [
    {
      name: 'Elastic',
      imageUrl:
        '/assets/img/elastic-logo.svg',
      extraClasses: 'w-144 h-47',
    },
    {
      name: 'Hubspot',
      imageUrl:
        '/assets/img/hubspot-logo.png',
      extraClasses: 'w-144 h-47',
    },
    {
      name: 'Click Up',
      imageUrl:
        '/assets/img/clickup-logo.png',
      extraClasses: 'w-144 h-50',
    },
    {
      name: 'Github',
      imageUrl:
        '/assets/img/github-logo.png',
      extraClasses: 'aspect-[2.44]',
    },
    {
      name: 'Dropbox',
      imageUrl:
        '/assets/img/dropbox-logo.png',
      extraClasses: 'w-144 h-47',
    },

    {
      name: 'FreshBooks',
      imageUrl:
        '/assets/img/freshbooks-logo.png',
      extraClasses: 'w-60 aspect-[3.45]',
    },
    {
      name: 'Elastic',
      imageUrl:
        '/assets/img/elastic-logo.svg',
      extraClasses: 'w-144 h-47',
    },
    {
      name: 'Google',
      imageUrl:
        '/assets/img/google-logo.svg',
      extraClasses: 'w-144 h-47',
    },

  ];
}
