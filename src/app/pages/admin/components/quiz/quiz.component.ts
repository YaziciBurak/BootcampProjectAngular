import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { QuizListItemDto } from '../../../../features/models/responses/quiz/quiz-list-item-dto';
import { QuizService } from '../../../../features/services/concretes/quiz.service';
import { PageRequest } from '../../../../core/models/page-request';
import { CreateQuizRequest } from '../../../../features/models/requests/quiz/create-quiz-request';
import { BootcampListItemDto } from '../../../../features/models/responses/bootcamp/bootcamp-list-item-dto';
import { ApplicantListItemDto } from '../../../../features/models/responses/applicant/applicant-list-item-dto';
import { ApplicantService } from '../../../../features/services/concretes/applicant.service';
import { BootcampService } from '../../../../features/services/concretes/bootcamp.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css'
})

export class QuizComponent implements OnInit {
  formMessage: string | null = null;
  quizCreateForm: FormGroup;
  selectedQuiz: any;
  showCreateModal: boolean = false;
  applicantList: ApplicantListItemDto;
  bootcampList: BootcampListItemDto;
  submitted = false;

  quizList: QuizListItemDto;
  constructor(private quizService: QuizService,
    private applicantService: ApplicantService,
    private bootcampService: BootcampService,
    private formBuilder: FormBuilder,
    private change: ChangeDetectorRef,
    private toastr:ToastrService
  ) { }
  ngOnInit(): void {
    this.loadQuizzes();
    this.createForm();
  }
  loadQuizzes() {
    const pageRequest: PageRequest = { pageIndex: 0, pageSize: 20 };
    this.getQuizzes(pageRequest);
    this.getApplicants(pageRequest);
    this.getBootcamps(pageRequest);
  }
  createForm() {
    this.quizCreateForm = this.formBuilder.group({
      applicantId: ['', [Validators.required]],
      bootcampId: ['', [Validators.required]],
      startTime: ['', [Validators.required]],
      endTime: ['', [Validators.required]]

    })
  }
  getQuizzes(pageRequest: PageRequest) {
    this.quizService.getList(pageRequest).subscribe(response => {
      this.quizList = response;
    });
  }
  getApplicants(pageRequest: PageRequest) {
    this.applicantService.getList(pageRequest).subscribe(response => {
      this.applicantList = response;
    });
  }
  getBootcamps(pageRequest: PageRequest) {
    this.bootcampService.getList(pageRequest).subscribe(response => {
      this.bootcampList = response;
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
        this.quizService.delete(id).subscribe({
          next: () => {
            this.toastr.success('Silme işlemi başarılı!');
            this.loadQuizzes();
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
    if (this.quizCreateForm.valid) {
      let question: CreateQuizRequest = Object.assign({}, this.quizCreateForm.value);
      this.quizService.create(question).subscribe({
        error: (error) => {
          this.toastr.error("Eklenemedi!",error)
          this.change.markForCheck();
        },
        complete: () => {
          this.toastr.success("Başarıyla eklendi!");
          this.change.markForCheck();
          this.closeModal();
          this.loadQuizzes();
        }
      });
    } else {
      this.markFormGroupTouched(this.quizCreateForm);
    }
  }
  openAddModal() {
    this.quizCreateForm.reset();
    this.showCreateModal = true;
    this.submitted = false;
  }

  closeModal() {
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
