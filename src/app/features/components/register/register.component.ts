import { Component } from '@angular/core';
import { FormBuilder,FormGroup,Validators,ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/concretes/auth.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,RouterModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm!:FormGroup
  submitted = false;
  constructor(private formBuilder:FormBuilder,private authService:AuthService,
    private router:Router,private toastr:ToastrService){}

  ngOnInit(): void {
    window.scroll(0,0);
    this.createRegisterForm();
  }

  createRegisterForm(){
   this.registerForm=this.formBuilder.group({
    firstName:["",[Validators.required, Validators.pattern('^[a-zA-ZçÇğĞıİöÖşŞüÜ ]+$'), Validators.minLength(2)]],  
    lastName:["",[Validators.required,Validators.pattern('^[a-zA-ZçÇğĞıİöÖşŞüÜ ]+$'),Validators.minLength(2)]],  
    userName:["",[Validators.required, Validators.minLength(4)]],
    email:["",[Validators.required, Validators.email]],
    password:["",[Validators.required, Validators.minLength(6)]]
   })
  }
 
  register(){
    this.submitted = true;
    if(this.registerForm.valid){
      let registerModel = Object.assign({},this.registerForm.value);
      this.authService.RegisterApplicant(registerModel).subscribe((response)=>{
        this.toastr.success("Kayıt Başarılı")
        this.router.navigate(['login']);
      },   error => {
        // Hata mesajını Toastr ile kullanıcıya göster
        this.toastr.error(error, 'Kayıt Hatası');
      }) 
    } 
    else {
      this.markFormGroupTouched(this.registerForm);
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
