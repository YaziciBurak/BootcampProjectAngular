import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ResultListItemDto } from '../../../../features/models/responses/result/result-list-item-dto';
import { ResultService } from '../../../../features/services/concretes/result.service';
import { PageRequest } from '../../../../core/models/page-request';
import { CreateResultRequest } from '../../../../features/models/requests/result/create-result-request';
import { QuizService } from '../../../../features/services/concretes/quiz.service';
import { QuizListItemDto } from '../../../../features/models/responses/quiz/quiz-list-item-dto';
import { Toast, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './results.component.html',
  styleUrl: './results.component.css'
})
export class ResultsComponent implements OnInit {
  formMessage: string | null = null;
  resultCreateForm: FormGroup;
  showCreateModal: boolean = false;
  resultList: ResultListItemDto;
  quizList: QuizListItemDto;
  submitted = false;

  constructor(
    private resultService: ResultService,
    private quizService: QuizService,
    private formBuilder: FormBuilder,
    private change: ChangeDetectorRef,
    private toastr:ToastrService
  ) { }
  ngOnInit(): void {
    this.loadResults();
    this.createForm();
  }
  loadResults() {
    const pageRequest: PageRequest = { pageIndex: 0, pageSize: 20 }
    this.getResults(pageRequest);
    this.getQuizzes(pageRequest);
  }
  createForm() {
    this.resultCreateForm = this.formBuilder.group({
      quizId: ['', [Validators.required]],
      wrongAnswers: ['', [Validators.required]],
      correctAnswers: ['', [Validators.required]]
    })
  }
  getResults(pageRequest: PageRequest) {
    this.resultService.getList(pageRequest).subscribe(response => {
      this.resultList = response;
    })
  }
  getQuizzes(pageRequest: PageRequest) {
    this.quizService.getList(pageRequest).subscribe(response => {
      this.quizList = response;
    })
  }
  add() {
    this.submitted = true;
    if (this.resultCreateForm.valid) {
      let question: CreateResultRequest = Object.assign({}, this.resultCreateForm.value);
      this.resultService.create(question).subscribe({
        error: (error) => {
          this.toastr.error("Eklenemedi",error);
          this.change.markForCheck();
        },
        complete: () => {
          this.toastr.success("Başarıyla eklendi!");
          this.change.markForCheck();
          this.closeModal();
          this.loadResults();
        }
      });
    } else {
      this.markFormGroupTouched(this.resultCreateForm);
    }
  }
  openAddModal() {
    this.resultCreateForm.reset();
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
