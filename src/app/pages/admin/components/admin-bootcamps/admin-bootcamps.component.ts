import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BootcampListItemDto } from '../../../../features/models/responses/bootcamp/bootcamp-list-item-dto';
import { BootcampService } from '../../../../features/services/concretes/bootcamp.service';
import { PageRequest } from '../../../../core/models/page-request';
import { UpdateBootcampRequest } from '../../../../features/models/requests/bootcamp/update-bootcamp-request';
import { InstructorService } from '../../../../features/services/concretes/instructor.service';
import { BootcampStateService } from '../../../../features/services/concretes/bootcamp-state.service';
import { InstructorListItemDto } from '../../../../features/models/responses/instructor/instructor-list-item-dto';
import { BootcampstateListItemDto } from '../../../../features/models/responses/bootcampstate/bootcampstate-list-item-dto';
import { RouterModule } from '@angular/router';
import { CreateBootcampRequest } from '../../../../features/models/requests/bootcamp/create-bootcamp-request';
import { formatDate } from '../../../../core/helpers/format-date';
import { EditorModule } from '@tinymce/tinymce-angular';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-admin-bootcamps',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, HttpClientModule, CommonModule, RouterModule, EditorModule],
  templateUrl: './admin-bootcamps.component.html',
  styleUrl: './admin-bootcamps.component.css',

})
export class AdminBootcampsComponent implements OnInit {
  formMessage: string | null = null;
  bootcampUpdateForm: FormGroup;
  bootcampCreateForm: FormGroup;
  selectedBootcamp: any;
  showUpdateModal: boolean = false;
  showCreateModal: boolean = false;
  bootcampStateList: BootcampstateListItemDto;
  instructorList: InstructorListItemDto;
  bootcampList: BootcampListItemDto;
  submitted = false;

  constructor(
    private bootcampService: BootcampService,
    private formBuilder: FormBuilder,
    private instructorService: InstructorService,
    private bootcampStateService: BootcampStateService,
    private change: ChangeDetectorRef,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadBootcamps();
    this.updateForm();
    this.createForm();
  }

  updateForm() {
    this.bootcampUpdateForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      instructorId: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      detail: ['', [Validators.required]],
      deadline: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      bootcampStateId: [0, [Validators.required]]
    });
  }

  createForm() {
    this.bootcampCreateForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      instructorId: ['', [Validators.required]],
      bootcampStateId: [0, [Validators.required]],
      detail: ['', [Validators.required]],
      deadline: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      startDate: ['', [Validators.required]]
    })
  }

  loadBootcamps() {
    const pageRequest: PageRequest = { pageIndex: 0, pageSize: 40 };
    this.getBootcamps(pageRequest);
    this.getInstructors();
    this.getBootcampStates();
  }

  getBootcamps(pageRequest: PageRequest) {
    this.bootcampService.getList(pageRequest).subscribe(response => {
      this.bootcampList = response;
    });
  }

  getInstructors() {
    this.instructorService.getListAll().subscribe(response => {
      this.instructorList = response;
    });
  }

  getBootcampStates() {
    this.bootcampStateService.getListAll().subscribe(response => {
      this.bootcampStateList = response;
    });
  }

  delete(id: number) {
    Swal.fire({
      title: 'Emin misiniz?',
      text: "Bu Bootcamp'i silmek istediğinizden emin misiniz?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Evet, sil!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.bootcampService.delete(id).subscribe({
          next: () => {
            this.toastr.success('Silme işlemi başarılı!');
            this.loadBootcamps();
          },
          error: (error) => {
            this.toastr.error('Silme işlemi başarısız!', error)
          }
        });
      }
    });
  }
  add() {
    this.submitted = true;
    if (this.bootcampCreateForm.valid) {
      let bootcamp: CreateBootcampRequest = Object.assign({}, this.bootcampCreateForm.value);
      this.bootcampService.create(bootcamp).subscribe({
        error: (error) => {
          this.toastr.error("Eklenemedi!", error);
          this.change.markForCheck();
        },
        complete: () => {
          this.toastr.success("Başarıyla eklendi!");
          this.change.markForCheck();
          this.closeModal();
          this.loadBootcamps();
        }
      });
    } else {
      this.markFormGroupTouched(this.bootcampCreateForm);
    }
  }
  update() {
    this.submitted = true;
    if (this.bootcampUpdateForm.valid) {
      const id = this.selectedBootcamp.id;
      const instructorId = this.bootcampUpdateForm.value.instructorId;
      const bootcampStateId = this.bootcampUpdateForm.value.bootcampStateId;
      const bootcampImageId = this.selectedBootcamp.bootcampImageId;
      const updatedInstructorFirstName = this.bootcampUpdateForm.value.instructorFirstName;
      const updatedInstructorLastName = this.bootcampUpdateForm.value.instructorLastName;
      const updatedBootcampStateName = this.selectedBootcamp.bootcampStateName;
      const bootcampImagePath = this.selectedBootcamp.bootcampImagePath;
      const deadline = this.bootcampUpdateForm.value.deadline;
      const detail = this.bootcampUpdateForm.value.detail;
      const startDate = this.bootcampUpdateForm.value.startDate;
      const endDate = this.bootcampUpdateForm.value.endDate;
      const updatedName = this.bootcampUpdateForm.value.name;

      const request: UpdateBootcampRequest = {
        id: id,
        instructorId: instructorId,
        bootcampStateId: bootcampStateId,
        bootcampImageId: bootcampImageId,
        instructorFirstName: updatedInstructorFirstName,
        instructorLastName: updatedInstructorLastName,
        bootcampStateName: updatedBootcampStateName,
        bootcampImagePath: bootcampImagePath,
        deadline: deadline,
        detail: detail,
        name: updatedName,
        startDate: startDate,
        endDate: endDate
      };

      this.bootcampService.update(request).subscribe({
        next: () => {
          this.closeModal(); // Modal'ı kapat
          this.loadBootcamps(); // Verileri yeniden getir
          this.toastr.success("Güncelleme başarılı!");
        },
        error: (error) => {
          this.toastr.error('Güncelleme işlemi başarısız:', error);
        }
      });
    } else {
      this.markFormGroupTouched(this.bootcampUpdateForm);
    }
  }
  openUpdateModal(bootcamp: any) {
    this.bootcampService.getById(bootcamp.id).subscribe({
      next: (response) => {
        this.selectedBootcamp = { ...response };
        this.bootcampUpdateForm.patchValue({
          name: this.selectedBootcamp.name,
          detail: this.selectedBootcamp.detail,
          startDate: formatDate(this.selectedBootcamp.startDate),
          deadline: formatDate(this.selectedBootcamp.deadline),
          endDate: formatDate(this.selectedBootcamp.endDate),
          instructorId: this.selectedBootcamp.instructorId,
          bootcampStateId: this.selectedBootcamp.bootcampStateId
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
    this.bootcampCreateForm.reset();
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
