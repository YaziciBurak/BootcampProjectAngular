import { Component, OnInit } from '@angular/core';
import { BootcampstateListItemDto } from '../../../../features/models/responses/bootcampstate/bootcampstate-list-item-dto'; 
import { BootcampStateService } from '../../../../features/services/concretes/bootcamp-state.service'; 
import { PageRequest } from '../../../../core/models/page-request'; 
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'primeng/api';
import { UpdateBootcampstateRequest } from '../../../../features/models/requests/bootcampstate/update-bootcampstate-request';

@Component({
  selector: 'app-bootcamp-state-list-group',
  standalone: true,
  imports: [FormsModule,HttpClientModule,ReactiveFormsModule,CommonModule,RouterModule,SharedModule],
  templateUrl: './bootcamp-state-list-group.component.html',
  styleUrl: './bootcamp-state-list-group.component.css'
})
export class BootcampStateListGroupComponent implements OnInit{
  formMessage:string | null=null;
  bootcampStateForm:FormGroup;
  selectedBootcampState:any;
  showUpdateModal: boolean = false;

  bootcampStateList:BootcampstateListItemDto={
    index:0,
    size:0,
    count:0,
    hasNext:false,
    hasPrevious:false,
    pages:0,
    items:[]
  };
  constructor(private bootcampStateService: BootcampStateService ,private formBuilder:FormBuilder) {}



ngOnInit(): void {
  this.loadBootcampStates();
  this.updateForm();
}

updateForm() {
  this.bootcampStateForm = this.formBuilder.group({
    name: ['', [Validators.required]]
  });
}

loadBootcampStates() {
  const pageRequest: PageRequest = {
    page: 0, 
    pageSize: 20 
  };
  this.getBootcampStates(pageRequest);
}


 getBootcampStates(pageRequest:PageRequest) {
  this.bootcampStateService.getList(pageRequest).subscribe((response)=>{
    this.bootcampStateList=response;
  })
 }

 delete(id: number) {
  if (confirm('Bu uygulama durumunu silmek istediğinizden emin misiniz?')) {
    this.bootcampStateService.delete(id).subscribe({
      next: (response) => {
        this.handleDeleteSuccess();
      },
      error: (error) => {
        console.error('Silme işlemi başarısız:', error);
      }
    });
  }
}

handleDeleteSuccess() {
  this.loadBootcampStates();
  this.formMessage = "Başarıyla Silindi"; 
  setTimeout(() => {
    this.formMessage = "";
  }, 3000);
}
update() {
  const id = this.selectedBootcampState.id;
  const request: UpdateBootcampstateRequest = { id: id,
    name: this.bootcampStateForm.value.name };
  this.bootcampStateService.update(request).subscribe({
    next: (response) => {
      this.showUpdateModal = false; 
      this.loadBootcampStates();
    },
    error: (error) => {
      console.error('Güncelleme işlemi başarısız:', error);
    }
  });
}
openUpdateModal(bootcampState: any) {
  this.bootcampStateService.getById(bootcampState.id).subscribe({
    next: (response) => {
      this.selectedBootcampState = { ...response };
      this.bootcampStateForm.patchValue({ name: this.selectedBootcampState.name }); // Modal içindeki formu güncelle
      this.showUpdateModal = true; 
      return bootcampState.id;
    },
    error: (error) => {
      console.error('Veri getirme işlemi başarısız:', error);
    }
  });
}
closeUpdateModal() {
  this.showUpdateModal = false;
}
} 


