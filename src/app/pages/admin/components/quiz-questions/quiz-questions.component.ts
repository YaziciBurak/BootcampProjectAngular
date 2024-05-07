import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { QuizQuestionService } from '../../../../features/services/concretes/quiz-question.service';
import { QuizQuestionListItemDto } from '../../../../features/models/responses/quizquestion/quiz-question-list-item-dto';
import { PageRequest } from '../../../../core/models/page-request';
import { QuestionListItemDto } from '../../../../features/models/responses/question/question-list-item-dto';
import { QuestionService } from '../../../../features/services/concretes/question.service';

@Component({
  selector: 'app-quiz-questions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quiz-questions.component.html',
  styleUrl: './quiz-questions.component.css'
})
export class QuizQuestionsComponent implements OnInit{

  quizQuestionList:QuizQuestionListItemDto;

  constructor(private quizQuestionService:QuizQuestionService) {}

  ngOnInit(): void {
    this.loadQuizQuestions();
  }

  loadQuizQuestions() {
    const pageRequest: PageRequest = { page: 0, pageSize: 20 };
    this.getListQuizQuestionList(pageRequest);
   
  }
  getListQuizQuestionList(pageRequest:PageRequest) {
    this.quizQuestionService.getList(pageRequest).subscribe(response => {
    this.quizQuestionList = response;
    })
  }

}
