import { AuthService } from './../../services/concretes/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserForLoginRequest } from '../../models/requests/users/user-for-login-request';
import { Router, RouterModule } from '@angular/router';
import { AppToastrService, ToastrMessageType } from '../../services/concretes/app-toastr.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,RouterModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
  export class LoginComponent implements OnInit{

loginForm!:FormGroup
submitted = false;
passwordFieldType: string = 'password';
    constructor(private formBuilder:FormBuilder,
      private authService:AuthService,
      private router:Router, 
      private toastrService:AppToastrService
    ){}
    ngOnInit(): void {
      window.scroll(0,0);
      this.createLoginForm();
      if(this.authService.loggedIn()){
        this.toastrService.message("Zaten giriş yaptınız. Ana sayfaya yönlendiriliyorsunuz.", "Bilgilendirme", ToastrMessageType.Info)
        this.router.navigate(['/']);
      }
    }
    createLoginForm(){
      this.loginForm=this.formBuilder.group({
        email:["",[Validators.required,Validators.email]],
        password:["",[Validators.required]]
      })
    }
    get formControls() {
      return this.loginForm.controls;
    }
    togglePasswordVisibility(): void {
      this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
    }
    login(){
      this.submitted = true;
      if(this.loginForm.valid){
        let loginModel:UserForLoginRequest = Object.assign({},this.loginForm.value);
        this.authService.login(loginModel).subscribe(response=>{
          this.toastrService.message("Giriş Başarılı.", "Merhaba", ToastrMessageType.Success)
          this.router.navigate(['/'])
        }
        ,(error:any)=>{
        })
      } else {
        this.markFormGroupTouched(this.loginForm);
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

