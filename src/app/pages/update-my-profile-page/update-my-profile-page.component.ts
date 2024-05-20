import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,  FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../features/services/concretes/auth.service';
import { ApplicantService } from '../../features/services/concretes/applicant.service';
import { formatDateString } from '../../core/helpers/format-date';

@Component({
  selector: 'app-update-my-profile-page',
  standalone: true,
  imports: [CommonModule,RouterModule,HttpClientModule,ReactiveFormsModule,FormsModule],
  templateUrl: './update-my-profile-page.component.html',
  styleUrl: './update-my-profile-page.component.css'
})
export class UpdateMyProfilePageComponent implements OnInit{
  applicantUpdateForm:FormGroup;
  applicantId:string;
  constructor(
    private formBuilder:FormBuilder,
    private authService:AuthService,
    private applicantService:ApplicantService
  ) {}
  ngOnInit(): void {
    console.log('merhaba');
  this.getApplicantId(); console.log('applicant id geliyor',this.applicantId);
  this.getApplicantData();
  this.updateForm();
  }
  getApplicantId():void {
    this.applicantId = this.authService.getCurrentUserId();
  }

  updateForm():void {
    this.applicantUpdateForm = this.formBuilder.group({
      userName: ['',[Validators.required]],  
      firstName: ['',[Validators.required]],
      lastName:['',[Validators.required]],
      email: ['',[Validators.required]], 
      about: ['',[Validators.required]],
      dateOfBirth: ['',[]],
      nationalIdentity: ['',[Validators.required]]
    });
  }

  getApplicantData(): void {
    this.applicantService.getById(this.applicantId).subscribe({
      next:(applicant) => {
        this.applicantUpdateForm.patchValue({ 
          firstName : applicant.firstName,
          lastName : applicant.lastName,
          userName : applicant.userName,
          email : applicant.email,
          dateOfBirth : formatDateString(applicant.dateOfBirth), 
          nationalIdentity : applicant.nationalIdentity,
          about : applicant.about
          }); 
      },
      error: (error) => {
     console.error('Applicant verilerini getirirken hata meydana geldi:', error);
      } 
    })
  }
  onSubmit():void{
    if(this.applicantUpdateForm.valid) {
      const updateApplicant = {...this.applicantUpdateForm.value, id: this.applicantId};
      this.applicantService.update(updateApplicant).subscribe({
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
