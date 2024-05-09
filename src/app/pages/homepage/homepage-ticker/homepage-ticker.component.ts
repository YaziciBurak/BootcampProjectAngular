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
        'https://cdn.builder.io/api/v1/image/assets/TEMP/13149432d5758d20387fd0e10649aacd4dccc4a62aa581b2144b92d6845c2880?apiKey=d64f73725dfb4ccb8c714d58677398b5&',
      extraClasses: 'w-60 max-w-full aspect-[3.03]',
    },
    {
      name: 'Hubspot',
      imageUrl:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/08a5cdcdd7b112cca4dcc4e376ac9cf23a91f04ef05a787a7d901281f6c930d8?apiKey=d64f73725dfb4ccb8c714d58677398b5&',
      extraClasses: 'aspect-[2.86]',
    },
    {
      name: 'Click Up',
      imageUrl:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/d941b4836d8a85314b4e09a9b6ab1368b158e23cdd4581fda8e3168b1c5bdae6?apiKey=d64f73725dfb4ccb8c714d58677398b5&',
      extraClasses: 'aspect-[2]',
    },
    {
      name: 'Dropbox',
      imageUrl:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/93dcc2fc9751bf8d1d2dc33133c16b5eab06e163ed6ab6f2772906d9d7d55c6a?apiKey=d64f73725dfb4ccb8c714d58677398b5&',
      extraClasses: 'aspect-[2]',
    },
    
    {
      name: 'Github',
      imageUrl:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/16bfc557e96702087bfe9e6dea6eb1629e348256f9ab9245d440e47446f39e7d?apiKey=d64f73725dfb4ccb8c714d58677398b5&',
      extraClasses: 'aspect-[2.44]',
    },
    {
      name: 'FreshBooks',
      imageUrl:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/c34ef1b30ce64c703b3c4a9a84a17b84523fdd5a7c235da600c235d4637a5478?apiKey=d64f73725dfb4ccb8c714d58677398b5&',
      extraClasses: 'w-60 aspect-[3.45]',
    },
    {
      name: 'Google',
      imageUrl:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/fbc79f49a95aa09b5d1e0e9fb23cb067874c7de14ae7da2e08ce06ebcbe5ab38?apiKey=d64f73725dfb4ccb8c714d58677398b5&',
      extraClasses: 'aspect-[2.33] w-[185px]',
    },
    {
      name: 'Elastic',
      imageUrl:
        'https://cdn.builder.io/api/v1/image/assets/TEMP/13149432d5758d20387fd0e10649aacd4dccc4a62aa581b2144b92d6845c2880?apiKey=d64f73725dfb4ccb8c714d58677398b5&',
      extraClasses: 'w-60 max-w-full aspect-[3.03]',
    },
  ];
}
