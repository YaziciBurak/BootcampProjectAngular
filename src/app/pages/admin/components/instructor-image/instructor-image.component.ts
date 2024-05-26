import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InstructorimageListItemDto } from '../../../../features/models/responses/instructorimage/instructorimage-list-item-dto';
import { InstructorListItemDto } from '../../../../features/models/responses/instructor/instructor-list-item-dto';
import { InstructorImageService } from '../../../../features/services/concretes/instructor-image.service';
import { InstructorService } from '../../../../features/services/concretes/instructor.service';
import { PageRequest } from '../../../../core/models/page-request';
import { CreateInstructorimageRequest } from '../../../../features/models/requests/instructorimage/create-instructorimage-request';
import { UpdateInstructorimageRequest } from '../../../../features/models/requests/instructorimage/update-instructorimage-request';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructor-image',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './instructor-image.component.html',
  styleUrl: './instructor-image.component.css'
})
export class InstructorImageComponent implements OnInit {
  formMessage: string | null = null;
  instructorImageUpdateForm: FormGroup;
  instructorImageCreateForm: FormGroup;
  selectedInstructorImage: any;
  showUpdateModal: boolean = false;
  showCreateModal: boolean = false;
  instructorImageList: InstructorimageListItemDto;
  instructorList: InstructorListItemDto;
  submitted = false;

  constructor(
    private instructorImageService: InstructorImageService,
    private instructorService: InstructorService,
    private formBuilder: FormBuilder,
    private change: ChangeDetectorRef,
    private toastr:ToastrService
  ) { }
  ngOnInit(): void {
    this.loadInstructorImages();
    this.createForm();
    this.updateForm();
  }
  updateForm() {
    this.instructorImageUpdateForm = this.formBuilder.group({
      id: [''],
      instructorId: ['', [Validators.required]],
      file: [null, [Validators.required]]
    })
  }
  createForm() {
    this.instructorImageCreateForm = this.formBuilder.group({
      instructorId: ['', [Validators.required]],
      imagePath: ['',[Validators.required]],
      file: ['', [Validators.required]]
    })
  }
  loadInstructorImages() {
    const pageRequest: PageRequest = { pageIndex: 0, pageSize: 18 };
    this.getInstructorImages(pageRequest);
    this.getInstructors(pageRequest);
  }
  getInstructorImages(pageRequest: PageRequest) {
    this.instructorImageService.getList(pageRequest).subscribe(response => {
      this.instructorImageList = response;
    });
  }
  getInstructors(pageRequest: PageRequest) {
    this.instructorService.getList(pageRequest).subscribe(response => {
      this.instructorList = response;
    })
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
        this.instructorImageService.delete(id).subscribe({
          next: () => {
            this.toastr.success('Silme işlemi başarılı!');
            this.loadInstructorImages();
          },
          error: (error) => {
            this.toastr.error('Silme işlemi başarısız!', error);
          },
        });
      }
    });
  }
  add() {
    this.submitted = true;
    if (this.instructorImageCreateForm.valid) {
      let instructorImage: CreateInstructorimageRequest = Object.assign({}, this.instructorImageCreateForm.value);
      let formData = new FormData();
      formData.append('instructorId', instructorImage.instructorId.toString());
      formData.append('file', instructorImage.file);
      formData.append('imagePath', instructorImage.imagePath);
      this.instructorImageService.create(formData).subscribe({
        error: (error) => {
          this.toastr.error("Eklenemedi",error)
          this.change.markForCheck();
        },
        complete: () => {
          this.toastr.success("Başarıyla eklendi!");
          this.change.markForCheck();
          this.closeModal();
          this.loadInstructorImages();
        }
      });
    } else {
      this.markFormGroupTouched(this.instructorImageCreateForm);
    }
  }
  update() {
    this.submitted = true;
    if(this.instructorImageUpdateForm.valid) {
    let instructorImage: UpdateInstructorimageRequest = { ...this.instructorImageUpdateForm.value, file: this.instructorImageUpdateForm.get('file').value };
    let formData = new FormData();
    formData.append('id', instructorImage.id.toString());
    formData.append('instructorId', instructorImage.instructorId);
    formData.append('file', instructorImage.file);
    this.instructorImageService.update(formData).subscribe({
      next: () => {
        this.closeModal(); // Modal'ı kapat
        this.loadInstructorImages(); // Verileri yeniden getir
        this.toastr.success("Güncelleme başarılı!");
      },
      error: (error) => {
        this.toastr.error('Güncelleme işlemi başarısız:', error);
      }
    });
  } else {
    this.markFormGroupTouched(this.instructorImageUpdateForm);
  }
  }
  openUpdateModal(instructorImage: any) {
    this.instructorImageService.getById(instructorImage.id).subscribe({
      next: (response) => {
        this.selectedInstructorImage = { ...response };
        this.instructorImageUpdateForm.patchValue({
          id: this.selectedInstructorImage.id,
          instructorId: this.selectedInstructorImage.instructorId,
          file: this.selectedInstructorImage.file
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
    this.instructorImageCreateForm.reset();
    this.showCreateModal = true;
    this.submitted = false;
  }
  closeModal() {
    this.showUpdateModal = false;
    this.showCreateModal = false;
    this.submitted = false;
  }
  onFileChange(event: any) {
    const file = event.target.files[0];
    this.instructorImageCreateForm?.get('file')?.setValue(file);
  }
  onFileUpdateChange(event: any) {
    const file = event.target.files[0];
    this.instructorImageUpdateForm?.get('file')?.setValue(file);
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
