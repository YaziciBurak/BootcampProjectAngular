import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { BootcampStateService } from '../../../../../features/services/concretes/bootcamp-state.service'; 
import { CreateBootcampstateRequest } from '../../../../../features/models/requests/bootcampstate/create-bootcampstate-request'; 
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-add-bootcamp-state-form',
  standalone: true,
  imports: [RouterModule,HttpClientModule,CommonModule,ReactiveFormsModule],
  templateUrl: './add-bootcamp-state-form.component.html',
  styleUrl: './add-bootcamp-state-form.component.css'
})
export class AddBootcampStateFormComponent implements OnInit {
 bootcampStateForm!:FormGroup
  formMessage:string | null=null;

  constructor(private formBuilder:FormBuilder,private bootcampStateService:BootcampStateService,
     private router:Router, private change:ChangeDetectorRef) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.bootcampStateForm=this.formBuilder.group({
      name:['',[Validators.required]]
    })
  }


  onFormSubmit() {
    if (this.bootcampStateForm.invalid) {
      this.formMessage="Lütfen gerekli alanları doldurunuz";
      return;
    }
    this.add();
  }
  add() {
    if(this.bootcampStateForm.valid) {
      let bootcampState:CreateBootcampstateRequest = Object.assign({},this.bootcampStateForm.value);
      this.bootcampStateService.add(bootcampState).subscribe({
        next:(response)=>{
          alert("Ekleme Başarılı!")
        },
        error:(error)=>{
          this.formMessage="Eklenemedi";
          this.change.markForCheck();
        },
        complete:()=>{
          this.formMessage="Başarıyla Eklendi";
          this.bootcampStateForm.reset();
          this.change.markForCheck();   
          
          setTimeout(() => {
            this.router.navigate(['/admin/bootcampState'])
          },500 );
        }
        });
      }
    }
}
