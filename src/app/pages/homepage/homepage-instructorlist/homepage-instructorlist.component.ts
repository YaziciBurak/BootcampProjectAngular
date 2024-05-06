import { Component } from '@angular/core';
import { InstructorCardComponent } from '../../../shared/components/instructor-card/instructor-card.component';

@Component({
  selector: 'app-homepage-instructorlist',
  standalone: true,
  imports: [InstructorCardComponent],
  templateUrl: './homepage-instructorlist.component.html',
  styleUrl: './homepage-instructorlist.component.css'
})
export class HomepageInstructorlistComponent {

}
