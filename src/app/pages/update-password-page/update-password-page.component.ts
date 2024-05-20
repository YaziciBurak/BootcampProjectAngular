import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../features/services/concretes/auth.service';
import { ApplicantService } from '../../features/services/concretes/applicant.service';

@Component({
  selector: 'app-update-password-page',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './update-password-page.component.html',
  styleUrl: './update-password-page.component.css'
})
export class UpdatePasswordPageComponent implements OnInit{
  updatePasswordForm:FormGroup;
  applicantId:string;
  constructor(
    private formBuilder:FormBuilder,
    private authService:AuthService,
    private applicantService:ApplicantService
  ) {}
  ngOnInit(): void {
    this.getApplicantId();
    this.updateForm();
  }
  getApplicantId():void {
    this.applicantId = this.authService.getCurrentUserId();
  }
  updateForm():void {
    this.updatePasswordForm = this.formBuilder.group({
      password:['',[Validators.required]],
      newPassword:['',[Validators.required]]
    })
  }
  onSubmit():void {
    if(this.updatePasswordForm.valid) {
      const updatePassword = {...this.updatePasswordForm.value, id:this.applicantId};
      this.applicantService.updatePassword(updatePassword).subscribe({
        next:(response) => {
          console.log('update işlemi başarılı:',response);
        },
        error:(error) => {
          console.error('update yaparken hata meydana geldi:',error)
        } 
      })
    }
  }
}
