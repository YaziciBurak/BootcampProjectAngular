import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InstructorListItemDto } from '../../../../../features/models/responses/instructor/instructor-list-item-dto';
import { InstructorService } from '../../../../../features/services/concretes/instructor.service';
import { PageRequest } from '../../../../../core/models/page-request';
import { UpdateInstructorRequest } from '../../../../../features/models/requests/instructor/update-instructor-request';
import { formatDate } from '../../../../../core/helpers/format-date';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-instructor-list-group',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, HttpClientModule, CommonModule, RouterModule],
  templateUrl: './instructor-list-group.component.html',
  styleUrl: './instructor-list-group.component.css'
})
export class InstructorListGroupComponent implements OnInit{
  formMessage: string | null = null;
  instructorUpdateForm: FormGroup;
  instructorCreateForm: FormGroup;
  selectedInstructor: any;
  showUpdateModal: boolean = false;
  showCreateModal: boolean = false;

  instructorList: InstructorListItemDto = {
    index: 0,
    size: 0,
    count: 0,
    hasNext: false,
    hasPrevious: false,
    pages: 0,
    items: []

};
constructor(private instructorService: InstructorService, private formBuilder: FormBuilder) { }



  ngOnInit(): void {
    this.loadInstructors();
    this.updateForm();
    this.createForm();
  }
  updateForm() {
    this.instructorUpdateForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      userName: ["", Validators.required],
      dateOfBirth: ["", Validators.required],
      nationalIdentity: ["", Validators.required],
      email: ["", Validators.required],
      companyName: ["", Validators.required],
      password: ["", Validators.required]
    });
  }
  createForm() {
    this.instructorCreateForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      userName: ["", Validators.required],
      dateOfBirth: ["", Validators.required],
      nationalIdentity: ["", Validators.required],
      email: ["", Validators.required],
      companyName: ["", Validators.required],
      password: ["", Validators.required]
    })
  }

  loadInstructors() {
    const pageRequest: PageRequest = {
      page: 0,
      pageSize: 20
    };
    this.getInstructors(pageRequest);
  }
  getInstructors(pageRequest: PageRequest) {
    this.instructorService.getList(pageRequest).subscribe((response) => {
      this.instructorList = response;
    })
  }

  delete(id: string) {
    if (confirm('Bu uygulama durumunu silmek istediğinizden emin misiniz?')) {
      this.instructorService.delete(id).subscribe({
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
    this.loadInstructors();
    this.formMessage = "Başarıyla Silindi";
    setTimeout(() => {
      this.formMessage = "";
    }, 3000);
  }
  update() {
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
      next: (response) => {
        this.closeModal();
        this.loadInstructors();
      },
      error: (error) => {
        console.error('Güncelleme işlemi başarısız:', error);
      }
    });
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
        console.error('Veri getirme işlemi başarısız:', error);
      }
    });
  }
  closeModal() {
    this.showUpdateModal = false;
    this.showCreateModal = false;
  }
}



