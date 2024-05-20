import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-homepage-illustration',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './homepage-illustration.component.html',
  styleUrl: './homepage-illustration.component.css'
})
export class HomepageIllustrationComponent {
  constructor(private router: Router) { }
  ngOnInit(): void {

    this.router.navigate(['/']);
  }
}


