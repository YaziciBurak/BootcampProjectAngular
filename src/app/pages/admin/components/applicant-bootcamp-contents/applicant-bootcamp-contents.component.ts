import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApplicantBootcampcontentListItemDto } from '../../../../features/models/responses/applicantbootcampcontent/applicant-bootcampcontent-list-item-dto';
import { ApplicantBootcampContentService } from '../../../../features/services/concretes/applicant-bootcamp-content.service';
import { PageRequest } from '../../../../core/models/page-request';

@Component({
  selector: 'app-applicant-bootcamp-contents',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './applicant-bootcamp-contents.component.html',
  styleUrl: './applicant-bootcamp-contents.component.css'
})
export class ApplicantBootcampContentsComponent implements OnInit{
  formMessage:string | null = null;
  applicantBootcampContentUpdateForm: FormGroup;
  applicantBootcampContentCreateForm:FormGroup;
  selectedApplicantBootcampContent: any;
  showUpdateModal: boolean = false;
  showCreateModal: boolean = false;
  applicantBootcampContentList:ApplicantBootcampcontentListItemDto;
  
  constructor (
    private applicantBootcampContentService:ApplicantBootcampContentService,
    private formBuilder:FormBuilder,
    private change:ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadApplicantBootcampContent();
  }
  loadApplicantBootcampContent() {
    const pageRequest: PageRequest = {page:0, pageSize:30};
    this.getApplicantBootcampContents(pageRequest);
  }
  getApplicantBootcampContents(pageRequest: PageRequest) {
    this.applicantBootcampContentService.getList(pageRequest).subscribe(response => {
      this.applicantBootcampContentList = response;
    });
  }
  delete(id: number) {
    if (confirm('Bu uygulama durumunu silmek istediğinizden emin misiniz?')) {
      this.applicantBootcampContentService.delete(id).subscribe({
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
    this.loadApplicantBootcampContent();
    this.formMessage = "Başarıyla Silindi";
    setTimeout(() => {
      this.formMessage = "";
    }, 3000);
  }
}
