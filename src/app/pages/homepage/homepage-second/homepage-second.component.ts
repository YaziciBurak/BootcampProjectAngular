import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

type FeaturedCard = {
  title: string;
  description: string;
  imagePath: string;
};

@Component({
  selector: 'app-homepage-second',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './homepage-second.component.html',
  styleUrl: './homepage-second.component.css',
})
export class HomepageSecondComponent {
  featuredCards: FeaturedCard[] = [
    {
      title: 'Uzman Eğitmenler',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting',
      imagePath: '/assets/img/homepage-feature-card-1.svg',
    },
    {
      title: 'Öğretici İçerikler',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting',
      imagePath: '/assets/img/homepage-feature-card-2.svg',
    },
    {
      title: 'Sertifika Fırsatı',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting',
      imagePath: '/assets/img/homepage-feature-card-3.svg',
    },
  ];
}
