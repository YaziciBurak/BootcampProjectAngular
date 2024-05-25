import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApplicantListItemDto } from '../../../../features/models/responses/applicant/applicant-list-item-dto';
import { ApplicantService } from '../../../../features/services/concretes/applicant.service';
import { PageRequest } from '../../../../core/models/page-request';
import { UpdateApplicantRequest } from '../../../../features/models/requests/applicant/update-applicant-request';
import { BlacklistService } from '../../../../features/services/concretes/blacklist.service';
import { formatDate } from '../../../../core/helpers/format-date';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-applicants',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './applicants.component.html',
  styleUrl: './applicants.component.css'
})
export class ApplicantsComponent implements OnInit {
  formsMessage: string | null = null;
  applicantUpdateForm: FormGroup;
  blacklistCreateForm: FormGroup;
  selectedApplicant: any;
  selectedBlacklist: any;
  showUpdateModal: boolean = false;
  showCreateModal: boolean = false;


  applicantList: ApplicantListItemDto;

  constructor(private applicantService: ApplicantService,
    private blacklistService: BlacklistService,
    private formBuilder: FormBuilder,
    private change: ChangeDetectorRef,
    private toastr:ToastrService
  ) { }
  ngOnInit(): void {
    this.loadApplicants();
    this.updateForm();
    this.createBlacklistForm();
  }

  loadApplicants() {
    const pageRequest: PageRequest = { pageIndex: 0, pageSize: 20 };
    this.getApplicants(pageRequest);
  }
  updateForm() {
    this.applicantUpdateForm = this.formBuilder.group({
      userName: [[Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: [[Validators.required]],
      about: [[Validators.required]],
      dateOfBirth: [[Validators.required]],
      nationalIdentity: [[Validators.required]]
    });
  }
  createBlacklistForm() {
    this.blacklistCreateForm = this.formBuilder.group({
      reason: ['', [Validators.required]],
      date: [''],
      applicantId: ['']
    })
  }
  getApplicants(pageRequest: PageRequest) {
    this.applicantService.getList(pageRequest).subscribe(response => {
      this.applicantList = response;
    });
  }
  add() {
    if (this.blacklistCreateForm.valid) {
      let blacklist = Object.assign({}, this.blacklistCreateForm.value);
      this.blacklistService.create(blacklist).subscribe({
        error: (error) => {
          this.toastr.error("Eklenemedi",error);
          this.change.markForCheck();
        },
        complete: () => {
          this.toastr.success("Başarıyla Eklendi");
          this.change.markForCheck();
          this.closeModal();
          this.loadApplicants();
        }
      });
    }
  }
  delete(id: string) {
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
        this.applicantService.delete(id).subscribe({
          next: () => {
            this.toastr.success('Silme işlemi başarılı!');
            this.loadApplicants();
          },
          error: (error) => {
            this.toastr.error('Silme işlemi başarısız!',error);
          },
        });
      }
    });
  }
  update() {
    const id = this.selectedApplicant.id;
    const userName = this.applicantUpdateForm.value.userName;
    const firstName = this.applicantUpdateForm.value.firstName;
    const lastName = this.applicantUpdateForm.value.lastName;
    const email = this.applicantUpdateForm.value.email;
    const nationalIdentity = this.applicantUpdateForm.value.nationalIdentity;
    const about = this.applicantUpdateForm.value.about;
    const dateOfBirth = this.applicantUpdateForm.value.dateOfBirth;
    const updatedDate = this.applicantUpdateForm.value.updatedDate;

    const request: UpdateApplicantRequest = {
      id: id,
      nationalIdentity: nationalIdentity,
      userName: userName,
      firstName: firstName,
      lastName: lastName,
      email: email,
      about: about,
      dateOfBirth: dateOfBirth,
      updatedDate: updatedDate
    };
    this.applicantService.update(request).subscribe({
      next: () => {
        this.closeModal(); // Modal'ı kapat
        this.loadApplicants(); // Verileri yeniden getir
        this.toastr.success("Güncelleme başarılı!");
      },
      error: (error) => {
        this.toastr.error('Güncelleme işlemi başarısız:', error);
      }
    });
  }
  openUpdateModal(applicant: any) {
    this.applicantService.getById(applicant.id).subscribe({
      next: (response) => {
        this.selectedApplicant = { ...response };
        this.applicantUpdateForm.patchValue({
          userName: this.selectedApplicant.userName,
          firstName: this.selectedApplicant.firstName,
          lastName: this.selectedApplicant.lastName,
          email: this.selectedApplicant.email,
          dateOfBirth: formatDate(this.selectedApplicant.dateOfBirth),
          about: this.selectedApplicant.about,
          nationalIdentity: this.selectedApplicant.nationalIdentity
        });
        this.showUpdateModal = true; // Modal'ı aç
        return response;
      },
      error: (error) => {
        this.toastr.error('Veri getirme işlemi başarısız:', error);
      }
    });
  }
  openAddModal(applicant: any) {
    this.applicantService.getById(applicant.id).subscribe({
      next: (response) => {
        this.selectedApplicant = { ...response };
        this.blacklistCreateForm.patchValue({
          applicantId: response.id
        })
        return response;
      }
    });
    this.showCreateModal = true;
  }
  closeModal() {
    this.showUpdateModal = false;
    this.showCreateModal = false;
  }
}
