import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { QuestionListItemDto } from '../../../../features/models/responses/question/question-list-item-dto';
import { QuestionService } from '../../../../features/services/concretes/question.service';
import { PageRequest } from '../../../../core/models/page-request';
import { CreateQuestionRequest } from '../../../../features/models/requests/question/create-question-request';
import { UpdateQuestionRequest } from '../../../../features/models/requests/question/update-question-request';
import { BootcampListItemDto } from '../../../../features/models/responses/bootcamp/bootcamp-list-item-dto';
import { BootcampService } from '../../../../features/services/concretes/bootcamp.service';

@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [HttpClientModule,FormsModule,ReactiveFormsModule,CommonModule,RouterModule],
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.css'
})
export class QuestionsComponent implements OnInit{
  formMessage: string | null = null;
  questionUpdateForm: FormGroup;
  questionCreateForm:FormGroup;
  selectedQuestion: any;
  showUpdateModal: boolean = false;
  showCreateModal: boolean = false;
  bootcampList: BootcampListItemDto;
  questionList:QuestionListItemDto;

  constructor(private questionService:QuestionService,private bootcampService:BootcampService,private formBuilder:FormBuilder,private change:ChangeDetectorRef) {}
 
  ngOnInit(): void {
    this.loadQuestions();
    this.updateForm();
    this.createForm();
  }

  loadQuestions() {
    const pageRequest: PageRequest = { page: 0, pageSize: 20 };
    this.getQuestions(pageRequest);
    this.getBootcamps(pageRequest);
  }
  updateForm() {
    this.questionUpdateForm = this.formBuilder.group({
      bootcampId: ['', [Validators.required]],  
      text: ['',[Validators.required]],
      answerA:['' ,[Validators.required]],
      answerB: ['',[Validators.required]], 
      answerC: ['',[Validators.required]],
      answerD: ['',[Validators.required]],
      correctAnswer: ['',[Validators.required]]
    });
  }

  createForm() {
    this.questionCreateForm = this.formBuilder.group({
      bootcampId: ['', [Validators.required]],  
      text: ['',[Validators.required]],
      answerA:['' ,[Validators.required]],
      answerB: ['',[Validators.required]], 
      answerC: ['',[Validators.required]],
      answerD: ['',[Validators.required]],
      correctAnswer: ['',[Validators.required]]
    })
  }

  getQuestions(pageRequest: PageRequest) {
    this.questionService.getList(pageRequest).subscribe(response => {
      this.questionList = response;
      console.log(response);
    });
  }
  getBootcamps(pageRequest: PageRequest) {
    this.bootcampService.getList(pageRequest).subscribe(response => {
      this.bootcampList = response;
      console.log(response);
    });
  }

  delete(id: number) {
    if (confirm('Bu uygulama durumunu silmek istediğinizden emin misiniz?')) {
      this.questionService.delete(id).subscribe({
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
    this.loadQuestions();
    this.formMessage = "Başarıyla Silindi";
    setTimeout(() => {
      this.formMessage = "";
    }, 3000);
  }

  add() {
    if(this.questionCreateForm.valid) {
      let question:CreateQuestionRequest = Object.assign({},this.questionCreateForm.value);
      this.questionService.create(question).subscribe({
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
          this.loadQuestions();
        }
        });
      }
    }
    handleCreateSuccess() {
      this.loadQuestions();
      this.formMessage = "Başarıyla Eklendi"; 
      setTimeout(() => {
        this.formMessage = "";
      }, 3000);
    }

    update() {
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
        bootcampId:bootcampId,
        text:text,
        answerA:answerA,
        answerB:answerB,
        answerC:answerC,
        answerD:answerD,
        correctAnswer:correctAnswer
  
      };
      this.questionService.update(request).subscribe({
        next: (response) => {
            this.closeModal(); // Modal'ı kapat
            this.loadQuestions(); // Verileri yeniden getir
        },
        error: (error) => {
            console.error('Güncelleme işlemi başarısız:', error);
        }
    });
  }

  openUpdateModal(question: any) {
    this.questionService.getById(question.id).subscribe({
      next: (response) => {
        this.selectedQuestion = { ...response };
        this.questionUpdateForm.patchValue({ id: this.selectedQuestion.id,
          text: this.selectedQuestion.text,
          answerA: this.selectedQuestion.answerA,
          answerB: this.selectedQuestion.answerB,
          answerC: this.selectedQuestion.answerC,
          answerD: this.selectedQuestion.answerD,
          correctAnswer: this.selectedQuestion.correctAnswer
         }); 
        this.showUpdateModal = true; // Modal'ı aç
        return response;
      },
      error: (error) => {
        console.error('Veri getirme işlemi başarısız:', error);
      }
    });
  }

  openAddModal() {
    this.questionCreateForm.reset();
    this.showCreateModal = true;
  }
  
  closeModal() {
    this.showUpdateModal = false;
    this.showCreateModal = false;
  }
  
  getShortenedText(text: string): string {
    const maxLength = 20;
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  }
}

