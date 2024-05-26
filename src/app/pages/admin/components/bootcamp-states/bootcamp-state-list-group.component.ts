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
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bootcamp-state-list-group',
  standalone: true,
  imports: [FormsModule, HttpClientModule, ReactiveFormsModule, CommonModule, RouterModule, SharedModule],
  templateUrl: './bootcamp-state-list-group.component.html',
  styleUrl: './bootcamp-state-list-group.component.css'
})
export class BootcampStateListGroupComponent implements OnInit {
  formMessage: string | null = null;
  bootcampStateUpdateForm: FormGroup;
  bootcampStateCreateForm: FormGroup;
  selectedBootcampState: any;
  showUpdateModal: boolean = false;
  showCreateModal: boolean = false;
  bootcampStateList: BootcampstateListItemDto;
  submitted = false;

  constructor(
    private bootcampStateService: BootcampStateService,
    private formBuilder: FormBuilder,
    private change: ChangeDetectorRef,
    private toastr:ToastrService
  ) { }

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
  createForm() {
    this.bootcampStateCreateForm = this.formBuilder.group({
      name: ['', [Validators.required]]
    })
  }
  loadBootcampStates() {
    const pageRequest: PageRequest = {
      pageIndex: 0,
      pageSize: 20
    };
    this.getBootcampStates(pageRequest);
  }
  getBootcampStates(pageRequest: PageRequest) {
    this.bootcampStateService.getList(pageRequest).subscribe((response) => {
      this.bootcampStateList = response;
    })
  }
  add() {
    this.submitted = true;
    if (this.bootcampStateCreateForm.valid) {
      let bootcampState: CreateBootcampstateRequest = Object.assign({}, this.bootcampStateCreateForm.value);
      this.bootcampStateService.create(bootcampState).subscribe({
        error: (error) => {
          this.toastr.error("Eklenemedi",error);
          this.change.markForCheck();
        },
        complete: () => {
          this.toastr.success("Başarıyla Eklendi");
          this.change.markForCheck();
          this.closeModal();
          this.loadBootcampStates();
        }
      });
    } else {
    this.markFormGroupTouched(this.bootcampStateCreateForm);
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
      cancelButtonText:'İptal',
    }).then((result) => {
      if (result.isConfirmed) {
        this.bootcampStateService.delete(id).subscribe({
          next: () => {
            this.toastr.success('Silme işlemi başarılı!');
            this.loadBootcampStates();
          },
          error: (error) => {
            this.toastr.error('Silme işlemi başarısız!',error);
          }
        });
      }
    }); 
  }
  update() {
    this.submitted = true;
    if(this.bootcampStateUpdateForm.valid) {
    const id = this.selectedBootcampState.id;
    const request: UpdateBootcampstateRequest = {
      id: id,
      name: this.bootcampStateUpdateForm.value.name
    };
    this.bootcampStateService.update(request).subscribe({
      next: () => {
        this.showUpdateModal = false;
        this.loadBootcampStates();
        this.toastr.success('Güncelleme işlemi başarılı!');
      },
      error: (error) => {
        this.toastr.error('Güncelleme işlemi başarısız:', error);
      }
    });
  } else {
  this.markFormGroupTouched(this.bootcampStateUpdateForm);
}
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
        this.toastr.error('Veri getirme işlemi başarısız:', error);
      }
    });
  }
  openAddModal() {
    this.bootcampStateCreateForm.reset();
    this.showCreateModal = true;
    this.submitted = false;
  }
  closeModal() {
    this.showUpdateModal = false;
    this.showCreateModal = false;
    this.submitted = false;
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


