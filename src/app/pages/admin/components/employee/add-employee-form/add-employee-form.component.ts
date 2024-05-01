import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../../../../features/services/concretes/employee.service';
import { AuthService } from '../../../../../features/services/concretes/auth.service';


@Component({
  selector: 'app-add-employee-form',
  standalone: true,
  imports: [RouterModule,HttpClientModule,CommonModule,ReactiveFormsModule],
  templateUrl: './add-employee-form.component.html',
  styleUrl: './add-employee-form.component.css'
})
export class AddEmployeeFormComponent implements OnInit {
 employeeForm!:FormGroup
  formMessage:string | null=null;

  constructor(private formBuilder:FormBuilder,private employeeService:EmployeeService,
    private authService:AuthService,
     private router:Router, private change:ChangeDetectorRef) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.employeeForm=this.formBuilder.group({
        firstName:["",Validators.required],  
        lastName:["",Validators.required],  
        userName:["",Validators.required],
        dateOfBirth:["",Validators.required],
        nationalIdentity:["",Validators.required],
        email:["",Validators.required],
        position:["",Validators.required],
        password:["",Validators.required]
    })
  }


  onFormSubmit() {
    if (this.employeeForm.invalid) {
      this.formMessage="Lütfen gerekli alanları doldurunuz";
      return;
    }
    this.add();
  }
  add() {
    if(this.employeeForm.valid) {
      let employee = Object.assign({},this.employeeForm.value);
      this.authService.RegisterEmployee(employee).subscribe({
        next:(response)=>{
          alert("Ekleme Başarılı!")
        },
        error:(error)=>{
          this.formMessage="Eklenemedi";
          this.change.markForCheck();
        },
        complete:()=>{
          this.formMessage="Başarıyla Eklendi";
          this.employeeForm.reset();
          this.change.markForCheck();   
          
          setTimeout(() => {
            this.router.navigate(['/admin/employee'])
          },500 );
        }
        });
      }
    }
}
