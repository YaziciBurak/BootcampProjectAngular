import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../features/services/concretes/auth.service';
import { ApplicantService } from '../../features/services/concretes/applicant.service';
import { ToastrService } from 'ngx-toastr';

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
  submitted = false;
  constructor(
    private formBuilder:FormBuilder,
    private authService:AuthService,
    private applicantService:ApplicantService,
    private toastr:ToastrService
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
      password:['',[Validators.required,Validators.minLength(6)]],
      newPassword:['',[Validators.required,Validators.minLength(6)]]
    })
  }
  onSubmit():void {
    this.submitted = true;
    if(this.updatePasswordForm.valid) {
      const updatePassword = {...this.updatePasswordForm.value, id:this.applicantId};
      this.applicantService.updatePassword(updatePassword).subscribe({
        next:(response) => {
          this.toastr.success('Şifre güncelleme başarılı!');
        },
        error:() => {
          this.toastr.error('Hatalı şifre girdiniz!',)
        } 
      })
    } else {
      this.markFormGroupTouched(this.updatePasswordForm);
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
