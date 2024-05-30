import { Component } from '@angular/core';
import { InstructorCardComponent } from '../../../shared/components/instructor-card/instructor-card.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'primeng/api';

@Component({
  selector: 'app-homepage-instructorlist',
  standalone: true,
  imports: [InstructorCardComponent, RouterModule, SharedModule],
  templateUrl: './homepage-instructorlist.component.html',
  styleUrl: './homepage-instructorlist.component.css',
})
export class HomepageInstructorlistComponent {}
