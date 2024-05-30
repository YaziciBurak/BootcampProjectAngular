import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { QuestionListItemDto } from '../../../../features/models/responses/question/question-list-item-dto';
import { QuestionService } from '../../../../features/services/concretes/question.service';
import { PageRequest } from '../../../../core/models/page-request';
import { CreateQuestionRequest } from '../../../../features/models/requests/question/create-question-request';
import { UpdateQuestionRequest } from '../../../../features/models/requests/question/update-question-request';
import { BootcampListItemDto } from '../../../../features/models/responses/bootcamp/bootcamp-list-item-dto';
import { BootcampService } from '../../../../features/services/concretes/bootcamp.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.css',
})
export class QuestionsComponent implements OnInit {
  formMessage: string | null = null;
  questionUpdateForm: FormGroup;
  questionCreateForm: FormGroup;
  selectedQuestion: any;
  showUpdateModal: boolean = false;
  showCreateModal: boolean = false;
  bootcampList: BootcampListItemDto;
  submitted = false;
  currentPageNumber: number = 0;
  questionList: QuestionListItemDto;

  constructor(
    private questionService: QuestionService,
    private bootcampService: BootcampService,
    private formBuilder: FormBuilder,
    private change: ChangeDetectorRef,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadQuestions();
    this.updateForm();
    this.createForm();
  }

  loadQuestions() {
    const pageRequest: PageRequest = { pageIndex: this.currentPageNumber, pageSize: 10 };
    this.getQuestions(pageRequest);
    this.getBootcamps(pageRequest);
  }
  setCurrentPageNumber(pageNumber: number): void {
    this.currentPageNumber = pageNumber - 1; 
    if (this.currentPageNumber < 0) {
      this.currentPageNumber = 0;
    } else if (this.currentPageNumber >= this.questionList.pages) {
      this.currentPageNumber = this.questionList.pages - 1;
    }
    this.loadQuestions(); 
  }

  updateForm() {
    this.questionUpdateForm = this.formBuilder.group({
      bootcampId: ['', [Validators.required]],
      text: ['', [Validators.required]],
      answerA: ['', [Validators.required]],
      answerB: ['', [Validators.required]],
      answerC: ['', [Validators.required]],
      answerD: ['', [Validators.required]],
      correctAnswer: ['', [Validators.required]],
    });
  }
  createForm() {
    this.questionCreateForm = this.formBuilder.group({
      bootcampId: ['', [Validators.required]],
      text: ['', [Validators.required]],
      answerA: ['', [Validators.required]],
      answerB: ['', [Validators.required]],
      answerC: ['', [Validators.required]],
      answerD: ['', [Validators.required]],
      correctAnswer: ['', [Validators.required]],
    });
  }
  getQuestions(pageRequest: PageRequest) {
    this.questionService.getList(pageRequest).subscribe((response) => {
      this.questionList = response;
    });
  }
  getBootcamps(pageRequest: PageRequest) {
    this.bootcampService.getList(pageRequest).subscribe((response) => {
      this.bootcampList = response;
    });
  }
  delete(id: number) {
    Swal.fire({
      title: 'Emin misiniz?',
      text: 'Bu veriyi silmek istediğinizden emin misiniz?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Evet, sil!',
      cancelButtonText: 'İptal',
    }).then((result) => {
      if (result.isConfirmed) {
        this.questionService.delete(id).subscribe({
          next: () => {
            this.toastr.success('Silme işlemi başarılı!');
            this.loadQuestions();
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
    if (this.questionCreateForm.valid) {
      let question: CreateQuestionRequest = Object.assign(
        {},
        this.questionCreateForm.value
      );
      this.questionService.create(question).subscribe({
        error: (error) => {
          this.toastr.error('Eklenemedi!', error);
          this.change.markForCheck();
        },
        complete: () => {
          this.toastr.success('Başarıyla eklendi!');
          this.change.markForCheck();
          this.closeModal();
          this.loadQuestions();
        },
      });
    } else {
      this.markFormGroupTouched(this.questionCreateForm);
    }
  }
  update() {
    this.submitted = true;
    if (this.questionUpdateForm.valid) {
      const id = this.selectedQuestion.id;
      const bootcampId = this.questionUpdateForm.value.bootcampId;
      const text = this.questionUpdateForm.value.text;
      const answerA = this.questionUpdateForm.value.answerA;
      const answerB = this.questionUpdateForm.value.answerB;
      const answerC = this.questionUpdateForm.value.answerC;
      const answerD = this.questionUpdateForm.value.answerD;
      const correctAnswer = this.questionUpdateForm.value.correctAnswer;

      const request: UpdateQuestionRequest = {
        id: id,
        bootcampId: bootcampId,
        text: text,
        answerA: answerA,
        answerB: answerB,
        answerC: answerC,
        answerD: answerD,
        correctAnswer: correctAnswer,
      };
      this.questionService.update(request).subscribe({
        next: () => {
          this.closeModal(); // Modal'ı kapat
          this.loadQuestions(); // Verileri yeniden getir
          this.toastr.success('Güncelleme başarılı!');
        },
        error: (error) => {
          this.toastr.error('Güncelleme işlemi başarısız:', error);
        },
      });
    } else {
      this.markFormGroupTouched(this.questionUpdateForm);
    }
  }
  openUpdateModal(question: any) {
    this.questionService.getById(question.id).subscribe({
      next: (response) => {
        this.selectedQuestion = { ...response };
        this.questionUpdateForm.patchValue({
          id: this.selectedQuestion.id,
          bootcampId: this.selectedQuestion.bootcampId,
          text: this.selectedQuestion.text,
          answerA: this.selectedQuestion.answerA,
          answerB: this.selectedQuestion.answerB,
          answerC: this.selectedQuestion.answerC,
          answerD: this.selectedQuestion.answerD,
          correctAnswer: this.selectedQuestion.correctAnswer,
        });
        this.showUpdateModal = true; // Modal'ı aç
        return response;
      },
      error: (error) => {
        this.toastr.error('Veri getirme işlemi başarısız:', error);
      },
    });
  }

  openAddModal() {
    this.questionCreateForm.reset();
    this.showCreateModal = true;
    this.submitted = false;
  }

  closeModal() {
    this.showUpdateModal = false;
    this.showCreateModal = false;
    this.submitted = false;
  }

  getShortenedText(text: string): string {
    const maxLength = 25;
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  }
  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
