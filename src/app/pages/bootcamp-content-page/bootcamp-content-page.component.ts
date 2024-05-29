import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { GetbyidBootcampResponse } from '../../features/models/responses/bootcamp/getbyid-bootcamp-response';
import { formatDate1 } from '../../core/helpers/format-date';
import { BootcampService } from '../../features/services/concretes/bootcamp.service';
import { BootcampContentService } from '../../features/services/concretes/bootcamp-content.service';
import { GetbyidBootcampcontentResponse } from '../../features/models/responses/bootcampcontent/getbyid-bootcampcontent-response';
import { BootcampcontentListItemDto } from '../../features/models/responses/bootcampcontent/bootcampcontent-list-item-dto';
import { PageRequest } from '../../core/models/page-request';
import { GetlistBootcampcontentResponse } from '../../features/models/responses/bootcampcontent/getlist-bootcampcontent-response';
import {
  DomSanitizer,
  SafeHtml,
  SafeResourceUrl,
} from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApplicantBootcampContentService } from '../../features/services/concretes/applicant-bootcamp-content.service';
import { QuizService } from '../../features/services/concretes/quiz.service';
import { CreateQuestionRequest } from '../../features/models/requests/question/create-question-request';
import { CreateQuizRequest } from '../../features/models/requests/quiz/create-quiz-request';
import { CreateQuizResponse } from '../../features/models/responses/quiz/create-quiz-response';
import { QuizPageComponent } from '../quiz-page/quiz-page.component';

@Component({
  selector: 'app-bootcamp-content-page',
  standalone: true,
  imports: [CommonModule, RouterModule, QuizPageComponent],
  templateUrl: './bootcamp-content-page.component.html',
  styleUrl: './bootcamp-content-page.component.css',
})
export class BootcampContentPageComponent implements OnInit {
  getByIdBootcampResponse!: GetbyidBootcampResponse;
  getByIdBootcampContentResponse!: GetbyidBootcampcontentResponse;
  bootcampContentList: BootcampcontentListItemDto;
  bootcampContent: GetlistBootcampcontentResponse;
  createdQuiz: CreateQuizResponse;
  videoUrl: SafeResourceUrl;
  bootcampId: number = 1;
  formatDate = formatDate1;
  content: SafeHtml;
  confirmed: boolean = false;
  @ViewChild('checkboxRef') checkboxRef!: ElementRef;

  constructor(
    private sanitizer: DomSanitizer,
    private applicantBootcampContentService: ApplicantBootcampContentService,
    private bootcampService: BootcampService,
    private activatedRoute: ActivatedRoute,
    private bootcampContentService: BootcampContentService,
    private quizService: QuizService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: { [x: string]: number }) => {
      if (params['bootcampId']) {
        console.log('ngOnInit', params['bootcampId']);
        this.getBootcampContentByBootcampId(
          { pageIndex: 0, pageSize: 20 },
          params['bootcampId']
        );
      } else {
        console.log('getById bootcamp error');
      }
    });
  }
  getBootcampById(bootcampId: number): void {
    this.bootcampService.getById(bootcampId).subscribe(
      (response: GetbyidBootcampResponse) => {
        console.log('geliyor ' + response.name);
        this.getByIdBootcampResponse = response;
      },
      (error: any) => {
        console.error('Error fetching bootcamp:', error);
        console.log('getBootcampById error');
      }
    );
  }

  getBootcampContentById(Id: number): void {
    this.bootcampContentService.getById(Id).subscribe(
      (response: GetbyidBootcampcontentResponse) => {
        this.getByIdBootcampContentResponse = response;
      },
      (error: any) => {
        console.error('Error fetching bootcamp:', error);
        console.log('getBootcampById error');
      }
    );
  }

  getBootcampContentByBootcampId(
    pageRequest: PageRequest,
    bootcampId: number
  ): void {
    this.bootcampContentService
      .getbybootcampId(pageRequest, bootcampId)
      .subscribe(
        (response: BootcampcontentListItemDto) => {
          this.bootcampContentList = response;
          this.bootcampContent = response.items[0];
          this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
            this.bootcampContent.videoUrl
          );
          this.content = this.sanitizer.bypassSecurityTrustHtml(
            this.bootcampContent.content
          );
          console.log(this.content);
        },
        (error: any) => {
          console.error('Error fetching bootcamp:', error);
          console.log('getBootcampContentByBootcampId error');
        }
      );
  }
  createApplicantBootcampContent(id: number): void {
    this.applicantBootcampContentService
      .createApplicantBootcampContent(id)
      .subscribe(
        (response) => {},
        (error) => {
          console.error('başvuru yaparken hata oluştu', error);
        }
      );
  }

  showConfirmation(id: number) {
    if (!this.confirmed) {
      const confirmation = confirm(
        'Bootcamp içeriğini bitirdiğinizden emin misiniz?'
      );

      if (confirmation) {
        this.confirmed = true; // Kullanıcı tamam dediğinde checkbox'ı devre dışı bırak
        this.createApplicantBootcampContent(this.bootcampContent.id);
      } else {
        if (this.checkboxRef.nativeElement.checked) {
          this.checkboxRef.nativeElement.checked = false; // Kullanıcı iptal dediğinde checkbox'ı işaretlemeyi iptal et
        }
      }
    }
  }
  handleClick(id: number): void {
    this.getExam(id);
  }

  getExam(id: number): void {
    this.quizService.getExam(id).subscribe(
      (response) => {
        this.createdQuiz = response;
        console.log('created quiz', this.createdQuiz);
        this.passDataToQuiz();
      },

      (error) => {
        console.error('Quiz oluşturma sırasında hata oluştu', error);
      }
    );
  }

  passDataToQuiz() {
    this.router.navigate(['/quiz'], { state: { quiz: this.createdQuiz } });
  }
}
