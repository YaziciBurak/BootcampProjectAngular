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


@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule,HttpClientModule],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css'
})

export class QuizComponent implements OnInit {
  formMessage: string | null = null;
  quizCreateForm:FormGroup;
  selectedQuiz: any;
  showCreateModal: boolean = false;
  applicantList:ApplicantListItemDto;
  bootcampList:BootcampListItemDto;

  quizList:QuizListItemDto;
  constructor (private quizService:QuizService,
    private applicantService:ApplicantService,
    private bootcampService:BootcampService,
    private formBuilder:FormBuilder,
    private change:ChangeDetectorRef
  ) {}

ngOnInit(): void {
  this.loadQuizzes();
  this.createForm();
}

loadQuizzes() {
  const pageRequest: PageRequest = { page: 0, pageSize: 20 };
  this.getQuizzes(pageRequest);
  this.getApplicants(pageRequest);
  this.getBootcamps(pageRequest);
}

createForm() {
  this.quizCreateForm = this.formBuilder.group({
    applicantId: ['', [Validators.required]],  
    bootcampId: ['',[Validators.required]],
    startTime: ['',[Validators.required]],
    endTime: ['',[Validators.required]]
  
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

getBootcamps(pageRequest:PageRequest) {
  this.bootcampService.getList(pageRequest).subscribe(response => {
    this.bootcampList = response;
  })
}

delete(id: number) {
  if (confirm('Bu uygulama durumunu silmek istediğinizden emin misiniz?')) {
    this.quizService.delete(id).subscribe({
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
  this.loadQuizzes();
  this.formMessage = "Başarıyla Silindi";
  setTimeout(() => {
    this.formMessage = "";
  }, 3000);
}

add() {
  if(this.quizCreateForm.valid) {
    let question:CreateQuizRequest = Object.assign({},this.quizCreateForm.value);
    this.quizService.create(question).subscribe({
      next:(response)=>{
        this.handleCreateSuccess();
      },
      error:(error)=>{
        this.formMessage="Eklenemedi";
        this.change.markForCheck();
      },
      complete:()=>{
        this.formMessage="Başarıyla Eklendi";
        this.change.markForCheck();
        this.closeModal();
        this.loadQuizzes();
      }
      });
    }
  }
  handleCreateSuccess() {
    this.loadQuizzes();
    this.formMessage = "Başarıyla Eklendi"; 
    setTimeout(() => {
      this.formMessage = "";
    }, 3000);
  }
  
  openAddModal() {
    this.quizCreateForm.reset();
    this.showCreateModal = true;
  }

  closeModal() {
    this.showCreateModal = false;
  }

}
