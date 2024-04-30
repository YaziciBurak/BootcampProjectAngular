import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApplicationStateListComponent } from '../application-state-list.component'; 
import { Route, Router, RouterModule } from '@angular/router';
import { ApplicationStateService } from '../../../../../features/services/concretes/application-state.service'; 
import { CreateApplicationstateRequest } from '../../../../../features/models/requests/applicationstate/create-applicationstate-request'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-application-state-form',
  standalone: true,
  imports: [ReactiveFormsModule,ApplicationStateListComponent,CommonModule,RouterModule],
  templateUrl: './add-application-state-form.component.html',
  styleUrl: './add-application-state-form.component.css'
})
export class AddApplicationStateFormComponent implements OnInit{
  
  applicationStateForm!:FormGroup
  formMessage:string | null=null;

  constructor(private formBuilder:FormBuilder,private applicationStateService:ApplicationStateService,
     private router:Router, private change:ChangeDetectorRef) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.applicationStateForm=this.formBuilder.group({
      name:['',[Validators.required]]
    })
  }

  add() {
    if(this.applicationStateForm.valid) {
      let applicationState:CreateApplicationstateRequest = Object.assign({},this.applicationStateForm.value);
      this.applicationStateService.create(applicationState).subscribe({
        next:(response)=>{
          alert("Ekleme Başarılı!")
        },
        error:(error)=>{
          this.formMessage="Eklenemedi";
          this.change.markForCheck();
        },
        complete:()=>{
          this.formMessage="Başarıyla Eklendi";
          this.applicationStateForm.reset();
          this.change.markForCheck();   
          
          setTimeout(() => {
            this.router.navigate(['/admin/applicationState'])
          },500 );
        }
        });
      }
    }
    
    onFormSubmit() {
      if (this.applicationStateForm.invalid) {
        this.formMessage="Lütfen gerekli alanları doldurunuz";
        return;
      }
      this.add();
    }
}
