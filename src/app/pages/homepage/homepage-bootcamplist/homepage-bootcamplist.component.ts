import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BootcampCardComponent } from '../../../shared/components/bootcamp-card/bootcamp-card.component';

@Component({
  selector: 'app-homepage-bootcamplist',
  standalone: true,
  imports: [RouterModule, CommonModule, BootcampCardComponent],
  templateUrl: './homepage-bootcamplist.component.html',
  styleUrl: './homepage-bootcamplist.component.css',
})
export class HomepageBootcamplistComponent {}
