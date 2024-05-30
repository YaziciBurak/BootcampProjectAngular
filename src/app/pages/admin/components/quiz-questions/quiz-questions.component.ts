import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { QuizQuestionService } from '../../../../features/services/concretes/quiz-question.service';
import { QuizQuestionListItemDto } from '../../../../features/models/responses/quizquestion/quiz-question-list-item-dto';
import { PageRequest } from '../../../../core/models/page-request';

@Component({
  selector: 'app-quiz-questions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quiz-questions.component.html',
  styleUrl: './quiz-questions.component.css'
})
export class QuizQuestionsComponent implements OnInit {
  currentPageNumber: number = 0;
  quizQuestionList: QuizQuestionListItemDto;
  
  constructor(private quizQuestionService: QuizQuestionService) { }

  ngOnInit(): void {
    this.loadQuizQuestions();
  }
  
  loadQuizQuestions() {
    const pageRequest: PageRequest = { pageIndex: this.currentPageNumber, pageSize: 3 };
    this.getListQuizQuestionList(pageRequest);
  }
  setCurrentPageNumber(pageNumber: number): void {
    this.currentPageNumber = pageNumber - 1; 
    if (this.currentPageNumber < 0) {
      this.currentPageNumber = 0;
    } else if (this.currentPageNumber >= this.quizQuestionList.pages) {
      this.currentPageNumber = this.quizQuestionList.pages - 1;
    }
    this.loadQuizQuestions(); 
  }

  getListQuizQuestionList(pageRequest: PageRequest) {
    this.quizQuestionService.getList(pageRequest).subscribe(response => {
      this.quizQuestionList = response;
    })
  }

}
