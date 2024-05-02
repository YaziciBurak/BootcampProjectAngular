import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InstructorService } from '../../../../../../features/services/concretes/instructor.service';
import { AuthService } from '../../../../../../features/services/concretes/auth.service';
import { Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-instructor-form',
  standalone: true,
  imports: [RouterModule, HttpClientModule, CommonModule, ReactiveFormsModule],
  templateUrl: './add-instructor-form.component.html',
  styleUrl: './add-instructor-form.component.css'
})
export class AddInstructorFormComponent implements OnInit {

  instructorForm!:FormGroup
  formMessage:string | null=null;

  constructor(private formBuilder:FormBuilder,private instructorService:InstructorService,
    private authService:AuthService,
     private router:Router, private change:ChangeDetectorRef) {}

  ngOnInit(): void {
    this.createForm();
}
createForm(){
  this.instructorForm=this.formBuilder.group({
      firstName:["",Validators.required],  
      lastName:["",Validators.required],  
      userName:["",Validators.required],
      dateOfBirth:["",Validators.required],
      nationalIdentity:["",Validators.required],
      email:["",Validators.required],
      companyName:["",Validators.required],
      password:["",Validators.required]
  })
}
onFormSubmit() {
  if (this.instructorForm.invalid) {
    this.formMessage="Lütfen gerekli alanları doldurunuz";
    return;
  }
  this.add();
}
add() {
  if(this.instructorForm.valid) {
    let instructor = Object.assign({},this.instructorForm.value);
    this.authService.RegisterInstructor(instructor).subscribe({
      next:(response)=>{
        alert("Ekleme Başarılı!")
      },
      error:(error)=>{
        this.formMessage="Eklenemedi";
        this.change.markForCheck();
      },
      complete:()=>{
        this.formMessage="Başarıyla Eklendi";
        this.instructorForm.reset();
        this.change.markForCheck();   
        
        setTimeout(() => {
          this.router.navigate(['/admin/instructor'])
        },500 );
      }
      });
    }
  }
}
