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
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

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
    private change: ChangeDetectorRef,
    private toastr:ToastrService
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
        next: () => {
        },
        error: (error) => {
          this.toastr.error("Eklenemedi",error)
          this.change.markForCheck();
        },
        complete: () => {
          this.toastr.success("Başarıyla eklendi!");
          this.change.markForCheck();
          this.closeModal();
          this.loadApplicationStates();
        }
      });
    }
  }
  delete(id: number) {
    Swal.fire({
      title: 'Emin misiniz?',
      text: "Bu veriyi silmek istediğinizden emin misiniz?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Evet, sil!',
      cancelButtonText: 'İptal',
    }).then((result) => {
      if (result.isConfirmed) {
        this.applicationStateService.delete(id).subscribe({
          next: () => {
            this.toastr.success('Silme işlemi başarılı!', 'Başarılı');
            this.loadApplicationStates();
          },
          error: (error) => {
            this.toastr.error('Silme işlemi başarısız!', error);
          },
        });
      }
    });
  }
  update() {
    const id = this.selectedAppState.id;
    const request: UpdateApplicationstateRequest = {
      id: id,
      name: this.applicationStateUpdateForm.value.name
    };
    this.applicationStateService.update(request).subscribe({
      next: () => {
        this.showUpdateModal = false; // Modal'ı kapat
        this.loadApplicationStates(); // Verileri yeniden getir
        this.toastr.success("Güncelleme başarılı!");
      },
      error: (error) => {
        this.toastr.error('Güncelleme işlemi başarısız:', error);
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
        this.toastr.error('Veri getirme işlemi başarısız:', error);
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








