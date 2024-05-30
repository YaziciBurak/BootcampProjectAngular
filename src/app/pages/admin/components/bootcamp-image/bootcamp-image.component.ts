import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BootcampimageListItemDto } from '../../../../features/models/responses/bootcampimage/bootcampimage-list-item-dto';
import { BootcampListItemDto } from '../../../../features/models/responses/bootcamp/bootcamp-list-item-dto';
import { BootcampImageService } from '../../../../features/services/concretes/bootcamp-image.service';
import { BootcampService } from '../../../../features/services/concretes/bootcamp.service';
import { PageRequest } from '../../../../core/models/page-request';
import { CreateBootcampimageRequest } from '../../../../features/models/requests/bootcampimage/create-bootcampimage-request';
import { UpdateBootcampimageRequest } from '../../../../features/models/requests/bootcampimage/update-bootcampimage-request';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bootcamp-image',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './bootcamp-image.component.html',
  styleUrl: './bootcamp-image.component.css'
})
export class BootcampImageComponent implements OnInit {

  formMessage: string | null = null;
  bootcampImageUpdateForm: FormGroup;
  bootcampImageCreateForm: FormGroup;
  selectedBootcampImage: any;
  showUpdateModal: boolean = false;
  showCreateModal: boolean = false;
  bootcampImageList: BootcampimageListItemDto;
  bootcampList: BootcampListItemDto;
  submitted = false;

  constructor(
    private bootcampImageService: BootcampImageService,
    private bootcampService: BootcampService,
    private formBuilder: FormBuilder,
    private change: ChangeDetectorRef,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadBootcampImages();
    this.createForm();
    this.updateForm();
  }
  updateForm() {
    this.bootcampImageUpdateForm = this.formBuilder.group({
      id: [''],
      bootcampId: ['', [Validators.required]],
      file: [null, [Validators.required]]
    })
  }

  createForm() {
    this.bootcampImageCreateForm = this.formBuilder.group({
      imagePath: ['', [Validators.required]],
      bootcampId: ['', [Validators.required]],
      file: ['', [Validators.required]]
    })
  }

  loadBootcampImages() {
    const pageRequest: PageRequest = { pageIndex: 0, pageSize: 40 };
    this.getBootcamps(pageRequest);
    this.getBootcampImages(pageRequest);
  }
  getBootcampImages(pageRequest: PageRequest) {
    this.bootcampImageService.getList(pageRequest).subscribe(response => {
      this.bootcampImageList = response;
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
        this.bootcampImageService.delete(id).subscribe({
          next: () => {
            this.toastr.success('Silme işlemi başarılı!');
            this.loadBootcampImages();
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
    if (this.bootcampImageCreateForm.valid) {
      let bootcampImage: CreateBootcampimageRequest = Object.assign({}, this.bootcampImageCreateForm.value);
      let formData = new FormData();
      formData.append('bootcampId', bootcampImage.bootcampId.toString());
      formData.append('imagePath', bootcampImage.imagePath);
      formData.append('file', bootcampImage.file);
      this.bootcampImageService.create(formData).subscribe({
        error: (error) => {
          this.toastr.error("Eklenemedi", error);
          this.change.markForCheck();
        },
        complete: () => {
          this.toastr.success("Başarıyla eklendi!");
          this.change.markForCheck();
          this.closeModal();
          this.loadBootcampImages();
        }
      });
    } else {
      this.markFormGroupTouched(this.bootcampImageCreateForm);
    }
  }
  update() {
    this.submitted = true;
    if (this.bootcampImageUpdateForm.valid) {
      let bootcampImage: UpdateBootcampimageRequest = { ...this.bootcampImageUpdateForm.value, file: this.bootcampImageUpdateForm.get('file').value };
      let formData = new FormData();
      formData.append('id', bootcampImage.id.toString());
      formData.append('bootcampId', bootcampImage.bootcampId.toString());
      formData.append('file', bootcampImage.file);
      this.bootcampImageService.update(formData).subscribe({
        next: () => {
          this.closeModal(); // Modal'ı kapat
          this.loadBootcampImages(); // Verileri yeniden getir
          this.toastr.success("Güncelleme başarılı!");
        },
        error: (error) => {
          this.toastr.error('Güncelleme işlemi başarısız:', error);
        }
      });
    } else {
      this.markFormGroupTouched(this.bootcampImageUpdateForm);
    }
  }

  openUpdateModal(bootcampImage: any) {
    this.bootcampImageService.getById(bootcampImage.id).subscribe({
      next: (response) => {
        this.selectedBootcampImage = { ...response };
        this.bootcampImageUpdateForm.patchValue({
          id: this.selectedBootcampImage.id,
          bootcampId: this.selectedBootcampImage.bootcampId,
          file: this.selectedBootcampImage.file
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
    this.bootcampImageCreateForm.reset();
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
    this.bootcampImageCreateForm?.get('file')?.setValue(file);
  }
  onFileUpdateChange(event: any) {
    const file = event.target.files[0];
    this.bootcampImageUpdateForm?.get('file')?.setValue(file);
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
