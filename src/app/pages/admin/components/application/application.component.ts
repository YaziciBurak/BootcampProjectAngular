import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApplicantListItemDto } from '../../../../features/models/responses/applicant/applicant-list-item-dto';
import { BootcampListItemDto } from '../../../../features/models/responses/bootcamp/bootcamp-list-item-dto';
import { ApplicationstateListItemDto } from '../../../../features/models/responses/applicationstate/applicationstate-list-item-dto';
import { ApplicantService } from '../../../../features/services/concretes/applicant.service';
import { BootcampService } from '../../../../features/services/concretes/bootcamp.service';
import { ApplicationService } from '../../../../features/services/concretes/application.service';
import { PageRequest } from '../../../../core/models/page-request';
import { ApplicationListItemDto } from '../../../../features/models/responses/application/application-list-item-dto';
import { CreateApplicationRequest } from '../../../../features/models/requests/application/create-application-request';
import { UpdateApplicationRequest } from '../../../../features/models/requests/application/update-application-request';
import { ApplicationStateService } from '../../../../features/services/concretes/application-state.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-application',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './application.component.html',
  styleUrl: './application.component.css'
})
export class ApplicationComponent implements OnInit {
  formMessage: string | null = null;
  applicationUpdateForm: FormGroup;
  applicationCreateForm: FormGroup;
  selectedApplication: any;
  showUpdateModal: boolean = false;
  showCreateModal: boolean = false;
  applicantList: ApplicantListItemDto;
  bootcampList: BootcampListItemDto;
  applicationList: ApplicationListItemDto;
  applicationStateList: ApplicationstateListItemDto;

  constructor(
    private applicationService: ApplicationService,
    private applicantService: ApplicantService,
    private bootcampService: BootcampService,
    private applicationStateService: ApplicationStateService,
    private formBuilder: FormBuilder,
    private change: ChangeDetectorRef,
    private toastr:ToastrService
  ) { }

  ngOnInit(): void {
    this.loadApplication();
    this.updateForm();
    this.createForm();
  }

  loadApplication() {
    const pageRequest: PageRequest = { pageIndex: 0, pageSize: 25 };
    this.getApplications(pageRequest);
    this.getApplicationStates(pageRequest);
    this.getBootcamps(pageRequest);
    this.getApplicants(pageRequest);
  }

  updateForm() {
    this.applicationUpdateForm = this.formBuilder.group({
      applicantId: ['', [Validators.required]],
      bootcampId: ['', [Validators.required]],
      applicationStateId: ['', [Validators.required]]
    });
  }
  createForm() {
    this.applicationCreateForm = this.formBuilder.group({
      applicantId: ['', [Validators.required]],
      bootcampId: ['', [Validators.required]],
      applicationStateId: ['']
    })
  }
  getApplications(pageRequest: PageRequest) {
    this.applicationService.getList(pageRequest).subscribe(response => {
      this.applicationList = response;
    });
  }
  getApplicants(pageRequest: PageRequest) {
    this.applicantService.getList(pageRequest).subscribe(response => {
      this.applicantList = response;
    });
  }
  getApplicationStates(pageRequest: PageRequest) {
    this.applicationStateService.getList(pageRequest).subscribe(response => {
      this.applicationStateList = response;
    });
  }
  getBootcamps(pageRequest: PageRequest) {
    this.bootcampService.getList(pageRequest).subscribe(response => {
      this.bootcampList = response;
    });
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
        this.applicationService.delete(id).subscribe({
          next: () => {
            this.toastr.success('Silme işlemi başarılı!');
            this.loadApplication();
          },
          error: (error) => {
            this.toastr.error('Silme işlemi başarısız!', error);
          },
        });
      }
    });
  }
  add() {
    if (this.applicationCreateForm.valid) {
      let application: CreateApplicationRequest = Object.assign({}, this.applicationCreateForm.value);
      this.applicationService.create(application).subscribe({
        error: (error) => {
          this.toastr.error("Eklenemedi",error);
          this.change.markForCheck();
        },
        complete: () => {
          this.toastr.success("Başarıyla Eklendi");
          this.change.markForCheck();
          this.closeModal();
          this.loadApplication();
        }
      });
    }
  }
  update() {
    const id = this.selectedApplication.id;
    const applicantId = this.applicationUpdateForm.value.applicantId;
    const bootcampId = this.applicationUpdateForm.value.bootcampId;
    const applicationStateId = this.applicationUpdateForm.value.applicationStateId;
    const request: UpdateApplicationRequest = {
      id: id,
      applicantId: applicantId,
      bootcampId: bootcampId,
      applicationStateId: applicationStateId
    };
    this.applicationService.update(request).subscribe({
      next: () => {
        this.closeModal(); // Modal'ı kapat
        this.loadApplication(); // Verileri yeniden getir
        this.toastr.success("Güncelleme başarılı.");
      },
      error: (error) => {
        this.toastr.error('Güncelleme işlemi başarısız:', error);
      }
    });
  }

  openUpdateModal(application: any) {
    this.applicationService.getById(application.id).subscribe({
      next: (response) => {
        this.selectedApplication = { ...response };
        this.applicationUpdateForm.patchValue({
          id: this.selectedApplication.id,
          applicantId: this.selectedApplication.applicantId,
          bootcampId: this.selectedApplication.bootcampId,
          applicationStateId: this.selectedApplication.applicationStateId
        });
        this.showUpdateModal = true; // Modal'ı aç
        return response;
      },
      error: (error) => {
        this.toastr.error('Veri getirme işlemi başarısız:', error);
      }
    });
  }
  openAddModal() {
    this.applicationCreateForm.reset();
    this.showCreateModal = true;
  }
  closeModal() {
    this.showUpdateModal = false;
    this.showCreateModal = false;
  }
}
