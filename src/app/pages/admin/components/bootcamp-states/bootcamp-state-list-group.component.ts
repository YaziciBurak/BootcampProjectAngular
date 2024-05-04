import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BootcampstateListItemDto } from '../../../../features/models/responses/bootcampstate/bootcampstate-list-item-dto'; 
import { BootcampStateService } from '../../../../features/services/concretes/bootcamp-state.service'; 
import { PageRequest } from '../../../../core/models/page-request'; 
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'primeng/api';
import { UpdateBootcampstateRequest } from '../../../../features/models/requests/bootcampstate/update-bootcampstate-request';
import { CreateBootcampstateRequest } from '../../../../features/models/requests/bootcampstate/create-bootcampstate-request';

@Component({
  selector: 'app-bootcamp-state-list-group',
  standalone: true,
  imports: [FormsModule,HttpClientModule,ReactiveFormsModule,CommonModule,RouterModule,SharedModule],
  templateUrl: './bootcamp-state-list-group.component.html',
  styleUrl: './bootcamp-state-list-group.component.css'
})
export class BootcampStateListGroupComponent implements OnInit{
  formMessage:string | null=null;
  bootcampStateUpdateForm:FormGroup;
  bootcampStateCreateForm:FormGroup;
  selectedBootcampState:any;
  showUpdateModal: boolean = false;
  showCreateModal: boolean = false;
  bootcampStateList:BootcampstateListItemDto;
  
  constructor(
    private bootcampStateService: BootcampStateService,
    private formBuilder:FormBuilder,
    private change:ChangeDetectorRef
  ) {}



ngOnInit(): void {
  this.loadBootcampStates();
  this.updateForm();
  this.createForm();
}

updateForm() {
  this.bootcampStateUpdateForm = this.formBuilder.group({
    name: ['', [Validators.required]]
  });
}
createForm(){
  this.bootcampStateCreateForm=this.formBuilder.group({
    name:['',[Validators.required]]
  })
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

 add() {
  if(this.bootcampStateCreateForm.valid) {
    let bootcampState:CreateBootcampstateRequest = Object.assign({},this.bootcampStateCreateForm.value);
    this.bootcampStateService.create(bootcampState).subscribe({
      next:(response)=>{
        this.handleCreateSuccess();
      },
      error:(error)=>{
        this.formMessage="Eklenemedi";
        this.change.markForCheck();
      },
      complete:()=>{
        this.formMessage="Başarıyla Eklendi";
        this.change.markForCheck();
        this.closeModal();
        this.loadBootcampStates();
      }
      });
    }
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
handleCreateSuccess() {
  this.loadBootcampStates();
  this.formMessage = "Başarıyla Eklendi"; 
  setTimeout(() => {
    this.formMessage = "";
  }, 3000);
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
    name: this.bootcampStateUpdateForm.value.name };
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
      this.bootcampStateUpdateForm.patchValue({ name: this.selectedBootcampState.name }); // Modal içindeki formu güncelle
      this.showUpdateModal = true; 
      return bootcampState.id;
    },
    error: (error) => {
      console.error('Veri getirme işlemi başarısız:', error);
    }
  });
}
openAddModal() {
  this.bootcampStateCreateForm.reset();
  this.showCreateModal = true;
}
closeModal() {
  this.showUpdateModal = false;
  this.showCreateModal = false;
}
} 


