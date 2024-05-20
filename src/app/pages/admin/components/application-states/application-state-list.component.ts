import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ApplicationStateService } from '../../../../features/services/concretes/application-state.service';
import { PageRequest } from '../../../../core/models/page-request';
import { ApplicationstateListItemDto } from '../../../../features/models/responses/applicationstate/applicationstate-list-item-dto';
import { SharedModule } from 'primeng/api';
import { UpdateApplicationstateRequest } from '../../../../features/models/requests/applicationstate/update-applicationstate-request';
import { CreateApplicationstateRequest } from '../../../../features/models/requests/applicationstate/create-applicationstate-request';

@Component({
  selector: 'app-application-state-list',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, RouterModule, HttpClientModule, CommonModule, SharedModule],
  templateUrl: './application-state-list.component.html',
  styleUrl: './application-state-list.component.css'
})
export class ApplicationStateListComponent implements OnInit {

  formMessage: string | null = null;
  applicationStateUpdateForm: FormGroup;
  applicationStateCreateForm: FormGroup;
  selectedAppState: any;
  showUpdateModal: boolean = false;
  showCreateModal: boolean = false;

  applicationStateList: ApplicationstateListItemDto;

  constructor(
    private applicationStateService: ApplicationStateService,
    private formBuilder: FormBuilder,
    private change: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadApplicationStates();
    this.updateForm();
    this.createForm();
  }

  updateForm() {
    this.applicationStateUpdateForm = this.formBuilder.group({
      name: ['', [Validators.required]]
    });
  }
  createForm() {
    this.applicationStateCreateForm = this.formBuilder.group({
      name: ['', [Validators.required]]
    })
  }

  loadApplicationStates() {
    const pageRequest: PageRequest = { pageIndex: 0, pageSize: 20 };
    this.getApplicationStates(pageRequest);
  }

  getApplicationStates(pageRequest: PageRequest) {
    this.applicationStateService.getList(pageRequest).subscribe(response => {
      this.applicationStateList = response;
    });
  }
  add() {
    if (this.applicationStateCreateForm.valid) {
      let applicationState: CreateApplicationstateRequest = Object.assign({}, this.applicationStateCreateForm.value);
      this.applicationStateService.create(applicationState).subscribe({
        next: (response) => {
          this.handleCreateSuccess();
        },
        error: (error) => {
          this.formMessage = "Eklenemedi";
          this.change.markForCheck();
        },
        complete: () => {
          this.formMessage = "Başarıyla Eklendi";
          this.change.markForCheck();
          this.closeModal();
          this.loadApplicationStates();
        }
      });
    }
  }
  handleCreateSuccess() {
    this.loadApplicationStates();
    this.formMessage = "Başarıyla Eklendi";
    setTimeout(() => {
      this.formMessage = "";
    }, 3000);
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
    this.formMessage = "Başarıyla Silindi";
    setTimeout(() => {
      this.formMessage = "";
    }, 3000);
  }

  update() {
    const id = this.selectedAppState.id;
    const request: UpdateApplicationstateRequest = {
      id: id,
      name: this.applicationStateUpdateForm.value.name
    };
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
    this.applicationStateService.getById(appState.id).subscribe({
      next: (response) => {
        this.selectedAppState = { ...response };
        this.applicationStateUpdateForm.patchValue({ name: this.selectedAppState.name }); // Modal içindeki formu güncelle
        this.showUpdateModal = true; // Modal'ı aç
        return appState.id;
      },
      error: (error) => {
        console.error('Veri getirme işlemi başarısız:', error);
      }
    });
  }
  openAddModal() {
    this.applicationStateCreateForm.reset();
    this.showCreateModal = true;
  }
  closeModal() {
    this.showUpdateModal = false;
    this.showCreateModal = false;
  }
}








