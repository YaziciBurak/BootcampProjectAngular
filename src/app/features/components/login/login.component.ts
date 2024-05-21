import { AuthService } from './../../services/concretes/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserForLoginRequest } from '../../models/requests/users/user-for-login-request';
import { Router, RouterModule } from '@angular/router';
import { SwalService } from '../../services/concretes/swal.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
  export class LoginComponent {

loginForm!:FormGroup
    constructor(private formBuilder:FormBuilder,private authService:AuthService,private router:Router, private swal:SwalService){}
  
    ngOnInit(): void {
      this.createLoginForm();
      if(this.authService.loggedIn()){
        this.swal.callToast("Zaten giriş yaptınız. Ana sayfaya yönlendiriliyorsunuz.", "info")
        this.router.navigate(['/']);
      }
    }
  
    createLoginForm(){
      this.loginForm=this.formBuilder.group({
        email:["",Validators.required],
        password:["",Validators.required]
      })
    }
  
    login(){
      if(this.loginForm.valid){
        let loginModel:UserForLoginRequest = Object.assign({},this.loginForm.value);
        this.authService.login(loginModel).subscribe(response=>{
          this.swal.callToast("Giriş Başarılı.", "success")
          this.router.navigate(['/'])
        }
        ,(error:any)=>{
          this.swal.callToast("Hatalı Giriş", "error")
        })
      }
    }

}

