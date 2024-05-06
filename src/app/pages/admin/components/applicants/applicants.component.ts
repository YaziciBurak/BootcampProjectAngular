import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApplicantListItemDto } from '../../../../features/models/responses/applicant/applicant-list-item-dto';
import { ApplicantService } from '../../../../features/services/concretes/applicant.service';
import { PageRequest } from '../../../../core/models/page-request';
import { UpdateApplicantRequest } from '../../../../features/models/requests/applicant/update-applicant-request';
import { last } from 'rxjs';

@Component({
  selector: 'app-applicants',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './applicants.component.html',
  styleUrl: './applicants.component.css'
})
export class ApplicantsComponent implements OnInit{
formsMessage:string  | null = null;
applicantUpdateForm:FormGroup;
selectedApplicant:any;
showUpdateModal: boolean = false;


applicantList: ApplicantListItemDto;

constructor(private applicantService:ApplicantService,private formBuilder:FormBuilder,private change:ChangeDetectorRef) {}
  ngOnInit(): void {
    this.loadApplicants();
    this.updateForm();
  }

  loadApplicants() {
    const pageRequest: PageRequest = { page: 0, pageSize: 20 };
    this.getApplicants(pageRequest);
  }
  updateForm() {
    this.applicantUpdateForm = this.formBuilder.group({
      userName: ['', [Validators.required]],  
      firstName: ['',[Validators.required]],
      lastName:['' ,[Validators.required]],
      email: ['',[Validators.required]], 
      about: ['',[Validators.required]],
      dateOfBirth: ['',[Validators.required]],
      nationalIdentity: ['', [Validators.required]]
    });
  }

  getApplicants(pageRequest: PageRequest) {
    this.applicantService.getList(pageRequest).subscribe(response => {
      this.applicantList = response;  
    });
  }

  update() {
    const id = this.selectedApplicant.id;
    const password = this.selectedApplicant.password;
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
      firstName:firstName,
      lastName:lastName,
      email:email,
      about:about,
      dateOfBirth:dateOfBirth,
      updatedDate:updatedDate,
      password:password

    };
    this.applicantService.update(request).subscribe({
      next: (response) => {
          this.closeModal(); // Modal'ı kapat
          this.loadApplicants(); // Verileri yeniden getir
      },
      error: (error) => {
          console.error('Güncelleme işlemi başarısız:', error);
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
        dateOfBirth: this.selectedApplicant.dateOfBirth,
        about: this.selectedApplicant.about,
        nationalIdentity: this.selectedApplicant.nationalIdentity
       }); 
      this.showUpdateModal = true; // Modal'ı aç
      return response;
    },
    error: (error) => {
      console.error('Veri getirme işlemi başarısız:', error);
    }
  });
}

closeModal() {
  this.showUpdateModal = false;
}

}
