import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,  FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../features/services/concretes/auth.service';
import { ApplicantService } from '../../features/services/concretes/applicant.service';
import { formatDateString } from '../../core/helpers/format-date';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-my-profile-page',
  standalone: true,
  imports: [CommonModule,RouterModule,HttpClientModule,ReactiveFormsModule,FormsModule],
  templateUrl: './update-my-profile-page.component.html',
  styleUrl: './update-my-profile-page.component.css',
  animations: [
    trigger('inputFocus', [
      state('true', style({
        borderColor: '#66afe9',
        boxShadow: '0 0 5px rgba(102, 175, 233, 0.6)'
      })),
      state('false', style({
        borderColor: '#ccc',
        boxShadow: 'none'
      })),
      transition('false <=> true', animate('300ms ease-in-out'))
    ])
  ]
})
export class UpdateMyProfilePageComponent implements OnInit{
  applicantUpdateForm:FormGroup;
  applicantId:string;
  submitted = false;
  constructor(
    private formBuilder:FormBuilder,
    private authService:AuthService,
    private applicantService:ApplicantService,
    private toastr:ToastrService
  ) {}
  ngOnInit(): void {
  this.getApplicantId();
  this.getApplicantData();
  this.updateForm();
  }
  getApplicantId():void {
    this.applicantId = this.authService.getCurrentUserId();
  }

  updateForm():void {
    this.applicantUpdateForm = this.formBuilder.group({
      firstName:["",[Validators.required, Validators.pattern('^[a-zA-ZçÇğĞıİöÖşŞüÜ]+$'), Validators.minLength(2)]],  
      lastName:["",[Validators.required,Validators.pattern('^[a-zA-ZçÇğĞıİöÖşŞüÜ]+$'),Validators.minLength(2)]],  
      userName:["",[Validators.required, Validators.minLength(4)]],
      email:["",[Validators.required, Validators.email]],
      about: ["",],
      dateOfBirth: ["",[Validators.required]],
      nationalIdentity: ["",[Validators.required,Validators.pattern('^[0-9]*$'),Validators.minLength(11)]]
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
     this.toastr.error('Applicant verilerini getirirken hata meydana geldi:', error);
      } 
    })
  }
  onSubmit():void{
    this.submitted = true;
    if(this.applicantUpdateForm.valid) {
      const updateApplicant = {...this.applicantUpdateForm.value, id: this.applicantId};
      this.applicantService.update(updateApplicant).subscribe({
        next:(response) => {
          this.toastr.success('Güncelleme Başarılı!');
        },
        error:(error) => {
          this.toastr.error('update yaparken hata meydana geldi:',error)
        } 
      })
    }  else {
      this.markFormGroupTouched(this.applicantUpdateForm);
    }
  }
  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
