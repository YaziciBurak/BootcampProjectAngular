import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ApplicationStateService } from '../../../../features/services/concretes/application-state.service'; 
import { PageRequest } from '../../../../core/models/page-request'; 
import { ApplicationstateListItemDto } from '../../../../features/models/responses/applicationstate/applicationstate-list-item-dto'; 
import { SharedModule } from 'primeng/api';
import { UpdateApplicationstateRequest } from '../../../../features/models/requests/applicationstate/update-applicationstate-request';

@Component({
  selector: 'app-application-state-list',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule, RouterModule,HttpClientModule,CommonModule,SharedModule],
  templateUrl: './application-state-list.component.html',
  styleUrl: './application-state-list.component.css'
})
export class ApplicationStateListComponent implements OnInit {
  
  formMessage: string | null = null;
  applicationStateForm: FormGroup;
  selectedAppState: any;
  showUpdateModal: boolean = false;
  
  applicationStateList: ApplicationstateListItemDto = {
    index: 0,
    size: 0,
    count: 0,
    hasNext: false,
    hasPrevious: false,
    pages: 0,
    items: []
  };

  constructor(
    private applicationStateService: ApplicationStateService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loadApplicationStates();
    this.updateForm();
  }

  updateForm() {
    this.applicationStateForm = this.formBuilder.group({
      name: ['', [Validators.required]]
    });
  }

  loadApplicationStates() {
    const pageRequest: PageRequest = { page: 0, pageSize: 20 };
    this.getApplicationStates(pageRequest);
  }

  getApplicationStates(pageRequest: PageRequest) {
    this.applicationStateService.getList(pageRequest).subscribe(response => {
      this.applicationStateList = response;
    });
  }

  delete(id: number) {
    if (confirm('Bu uygulama durumunu silmek istediğinizden emin misiniz?')) {
      this.applicationStateService.delete(id).subscribe({
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
    this.loadApplicationStates();
    // Güzel bir geri bildirim mesajı oluştur
    this.formMessage = "Başarıyla Silindi";
    setTimeout(() => {
      this.formMessage = "";
    }, 3000);
  }

  update() {
    const id = this.selectedAppState.id;
    const request: UpdateApplicationstateRequest = { id: id,
      name: this.applicationStateForm.value.name };
    this.applicationStateService.update(request).subscribe({
      next: (response) => {
        this.showUpdateModal = false; // Modal'ı kapat
        this.loadApplicationStates(); // Verileri yeniden getir
      },
      error: (error) => {
        console.error('Güncelleme işlemi başarısız:', error);
      }
    });
  }

  openUpdateModal(appState: any) {
    // İlgili application state'i backend'den getir
    this.applicationStateService.getById(appState.id).subscribe({
      next: (response) => {
        // Backend'den gelen verileri formda kullan
        this.selectedAppState = { ...response };
        this.applicationStateForm.patchValue({ name: this.selectedAppState.name }); // Modal içindeki formu güncelle
        this.showUpdateModal = true; // Modal'ı aç
        return appState.id;
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


      
        
  
 


