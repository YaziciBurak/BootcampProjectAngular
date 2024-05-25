import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApplicantBootcampcontentListItemDto } from '../../../../features/models/responses/applicantbootcampcontent/applicant-bootcampcontent-list-item-dto';
import { ApplicantBootcampContentService } from '../../../../features/services/concretes/applicant-bootcamp-content.service';
import { PageRequest } from '../../../../core/models/page-request';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-applicant-bootcamp-contents',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './applicant-bootcamp-contents.component.html',
  styleUrl: './applicant-bootcamp-contents.component.css'
})
export class ApplicantBootcampContentsComponent implements OnInit {
  formMessage: string | null = null;
  applicantBootcampContentUpdateForm: FormGroup;
  applicantBootcampContentCreateForm: FormGroup;
  selectedApplicantBootcampContent: any;
  showUpdateModal: boolean = false;
  showCreateModal: boolean = false;
  applicantBootcampContentList: ApplicantBootcampcontentListItemDto;

  constructor(
    private applicantBootcampContentService: ApplicantBootcampContentService,
    private toastr:ToastrService
  ) { }

  ngOnInit(): void {
    this.loadApplicantBootcampContent();
  }
  loadApplicantBootcampContent() {
    const pageRequest: PageRequest = { pageIndex: 0, pageSize: 30 };
    this.getApplicantBootcampContents(pageRequest);
  }
  getApplicantBootcampContents(pageRequest: PageRequest) {
    this.applicantBootcampContentService.getList(pageRequest).subscribe(response => {
      this.applicantBootcampContentList = response;
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
        this.applicantBootcampContentService.delete(id).subscribe({
          next: () => {
            this.toastr.success('Silme işlemi başarılı!');
            this.loadApplicantBootcampContent();
          },
          error: (error) => {
            this.toastr.error('Silme işlemi başarısız!', error)
          }
        });
      }
    });
  }
}
