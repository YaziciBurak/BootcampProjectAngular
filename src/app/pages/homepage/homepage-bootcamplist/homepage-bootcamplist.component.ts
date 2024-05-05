import { Component } from '@angular/core';
import { BootcampCardComponent } from '../../../shared/components/bootcamp-card/bootcamp-card.component';

@Component({
  selector: 'app-homepage-bootcamplist',
  standalone: true,
  imports: [BootcampCardComponent],
  templateUrl: './homepage-bootcamplist.component.html',
  styleUrl: './homepage-bootcamplist.component.css'
})
export class HomepageBootcamplistComponent {

}
