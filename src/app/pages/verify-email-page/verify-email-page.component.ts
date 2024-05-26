import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AuthService } from '../../features/services/concretes/auth.service';

@Component({
  selector: 'app-verify-email-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './verify-email-page.component.html',
  styleUrl: './verify-email-page.component.css'
})
export class VerifyEmailPageComponent implements OnInit {
  activationKey: string;
  success: boolean | null = null;

  constructor(private route: ActivatedRoute, private authService: AuthService) {
    this.route.queryParams.subscribe((params) => {
      this.activationKey = params['ActivationKey'];
    });
  }

  ngOnInit(): void {
    console.log('VerifyEmailComponent', this.activationKey);
    this.authService
      .verifyEmail({ authenticatorCode: this.activationKey })
      .subscribe(
        (response) => {
          console.log('VerifyEmailComponent', response);
          this.success = true;
        },
        (error) => {
          console.log('VerifyEmailComponent', error);
          this.success = false;
        }
      );
  }

}
