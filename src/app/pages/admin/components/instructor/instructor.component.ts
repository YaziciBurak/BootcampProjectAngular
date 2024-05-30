import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InstructorListItemDto } from '../../../../features/models/responses/instructor/instructor-list-item-dto';
import { InstructorService } from '../../../../features/services/concretes/instructor.service';
import { PageRequest } from '../../../../core/models/page-request';
import { UpdateInstructorRequest } from '../../../../features/models/requests/instructor/update-instructor-request';
import { formatDate } from '../../../../core/helpers/format-date';
import { AuthService } from '../../../../features/services/concretes/auth.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructor',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './instructor.component.html',
  styleUrl: './instructor.component.css'
})
export class InstructorComponent implements OnInit {

  formMessage: string | null = null;
  instructorUpdateForm: FormGroup;
  instructorCreateForm: FormGroup;
  selectedInstructor: any;
  showUpdateModal: boolean = false;
  showCreateModal: boolean = false;
  instructorList: InstructorListItemDto;
  submitted = false;

  constructor(
    private instructorService: InstructorService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private change: ChangeDetectorRef,
    private toastr:ToastrService
  ) { }

  ngOnInit(): void {
    this.loadInstructors();
    this.updateForm();
    this.createForm();
  }
  loadInstructors() {
    const pageRequest: PageRequest = { pageIndex: 0, pageSize: 20 };
    this.getInstructors(pageRequest);
  }
  getInstructors(pageRequest: PageRequest) {
    this.instructorService.getList(pageRequest).subscribe((response) => {
      this.instructorList = response;
    })
  }
  updateForm() {
    this.instructorUpdateForm = this.formBuilder.group({
      userName: ["",[Validators.required,Validators.minLength(4)]],
      firstName:["",[Validators.required, Validators.pattern('^[a-zA-ZçÇğĞıİöÖşŞüÜ ]+$'), Validators.minLength(2)]],  
      lastName:["",[Validators.required,Validators.pattern('^[a-zA-ZçÇğĞıİöÖşŞüÜ ]+$'),Validators.minLength(2)]], 
      dateOfBirth: ["", Validators.required],
      nationalIdentity: ["",[Validators.required,Validators.pattern('^[0-9]*$'),Validators.minLength(11)]],
      email: ["",[Validators.required,Validators.email]],
      companyName: ["", Validators.required],
    });
  }
  createForm() {
    this.instructorCreateForm = this.formBuilder.group({
      userName: ["",[Validators.required,Validators.minLength(4)]],
      firstName:["",[Validators.required, Validators.pattern('^[a-zA-ZçÇğĞıİöÖşŞüÜ ]+$'), Validators.minLength(2)]],  
      lastName:["",[Validators.required,Validators.pattern('^[a-zA-ZçÇğĞıİöÖşŞüÜ ]+$'),Validators.minLength(2)]], 
      dateOfBirth: ["", Validators.required],
      nationalIdentity: ["",[Validators.required,Validators.pattern('^[0-9]*$'),Validators.minLength(11)]],
      email: ["",[Validators.required,Validators.email]],
      companyName: ["", [Validators.required]],
      password: ["", [Validators.required,Validators.minLength(6)]]
    })
  }
  add() {
    this.submitted = true;
    if (this.instructorCreateForm.valid) {
      let instructor = Object.assign({}, this.instructorCreateForm.value);
      this.authService.RegisterInstructor(instructor).subscribe({
        error: (error) => {
          this.toastr.error("Eklenemedi",error);
          this.change.markForCheck();
        },
        complete: () => {
          this.toastr.success("Başarıyla eklendi!");
          this.change.markForCheck();
          this.closeModal();
          this.loadInstructors();
        }
      });
    } else {
      this.markFormGroupTouched(this.instructorCreateForm);
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
        this.instructorService.delete(id).subscribe({
          next: () => {
            this.toastr.success('Silme işlemi başarılı!', 'Başarılı');
            this.loadInstructors();
          },
          error: (error) => {
            this.toastr.error('Silme işlemi başarısız!', error);
          },
        });
      }
    });
  }
  update() {
    this.submitted = true;
    if(this.instructorUpdateForm.valid){
    const id = this.selectedInstructor.id;
    const updatedUserName = this.instructorUpdateForm.value.userName;
    const updatedFirstName = this.instructorUpdateForm.value.firstName;
    const updatedLastName = this.instructorUpdateForm.value.lastName;
    const updatedEmail = this.instructorUpdateForm.value.email;
    const updatedNationalIdentity = this.instructorUpdateForm.value.nationalIdentity;
    const updatedDateOfBirth = this.instructorUpdateForm.value.dateOfBirth;
    const updatedDate = this.instructorUpdateForm.value.updatedDate;
    const updatedCompanyName = this.instructorUpdateForm.value.companyName;
    const updatedPassword = this.instructorUpdateForm.value.password;
    const request: UpdateInstructorRequest = {
      id: id,
      userName: updatedUserName,
      firstName: updatedFirstName,
      lastName: updatedLastName,
      email: updatedEmail,
      nationalIdentity: updatedNationalIdentity,
      dateOfBirth: updatedDateOfBirth,
      updatedDate: updatedDate,
      companyName: updatedCompanyName,
      password: updatedPassword
    };
    this.instructorService.update(request).subscribe({
      next: () => {
        this.closeModal();
        this.loadInstructors();
        this.toastr.success("Güncelleme başarılı!");
      },
      error: (error) => {
        this.toastr.error('Güncelleme işlemi başarısız:', error);
      }
    });
  } else {
    this.markFormGroupTouched(this.instructorUpdateForm);
  }
  }

  openUpdateModal(instructor: any) {
    this.instructorService.getById(instructor.id).subscribe({
      next: (response) => {
        this.selectedInstructor = { ...response };
        this.instructorUpdateForm.patchValue(
          {
            userName: this.selectedInstructor.userName,
            firstName: this.selectedInstructor.firstName,
            lastName: this.selectedInstructor.lastName,
            email: this.selectedInstructor.email,
            nationalIdentity: this.selectedInstructor.nationalIdentity,
            dateOfBirth: formatDate(this.selectedInstructor.dateOfBirth),
            updatedDate: this.selectedInstructor.updatedDate,
            companyName: this.selectedInstructor.companyName,
            password: this.selectedInstructor.password
          }); // Modal içindeki formu güncelle
        this.showUpdateModal = true;
        return response;
      },
      error: (error) => {
        this.toastr.error('Veri getirme işlemi başarısız:', error);
      }
    });
  }
  openAddModal() {
    this.instructorCreateForm.reset();
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
