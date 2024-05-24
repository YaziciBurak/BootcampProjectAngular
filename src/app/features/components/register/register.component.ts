import { Component } from '@angular/core';
import { FormBuilder,FormGroup,Validators,ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/concretes/auth.service';
import { CommonModule } from '@angular/common';
import { transition, trigger,style,animate, state } from '@angular/animations';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,RouterModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
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
export class RegisterComponent {
  registerForm!:FormGroup
  submitted = false;
  constructor(private formBuilder:FormBuilder,private authService:AuthService,
    private router:Router){}

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm(){
   this.registerForm=this.formBuilder.group({
    firstName:["",[Validators.required, Validators.pattern('^[a-zA-ZçÇğĞıİöÖşŞüÜ]+$'), Validators.minLength(3)]],  
    lastName:["",[Validators.required,Validators.pattern('^[a-zA-ZçÇğĞıİöÖşŞüÜ]+$'),Validators.minLength(2)]],  
    userName:["",[Validators.required, Validators.minLength(4)]],
    email:["",[Validators.required, Validators.email]],
    password:["",[Validators.required, Validators.minLength(6)]]
   })
  }
 
  register(){
    this.submitted = true;
    if(this.registerForm.valid){
      console.log(this.registerForm.value);
      let registerModel = Object.assign({},this.registerForm.value);
      this.authService.RegisterApplicant(registerModel).subscribe((response)=>{
        alert("Kayıt Başarılı")
        this.router.navigate(['login']);
      }, (errorResponse: any) => { 
          errorResponse.error.Errors.forEach((error: any) => {
            error.Errors.forEach((errorMessage: string) => {
              alert(`Error: ${errorMessage}`);
            });
          });
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
