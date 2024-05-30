import { Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BootcampService } from '../../../../features/services/concretes/bootcamp.service';
import { BootcampListItemDto } from '../../../../features/models/responses/bootcamp/bootcamp-list-item-dto';
import { PageRequest } from '../../../../core/models/page-request';
import { InstructorService } from '../../../../features/services/concretes/instructor.service';
import { InstructorListItemDto } from '../../../../features/models/responses/instructor/instructor-list-item-dto';
import { ApplicationListItemDto } from '../../../../features/models/responses/application/application-list-item-dto';
import { ApplicantListItemDto } from '../../../../features/models/responses/applicant/applicant-list-item-dto';
import { EmployeeListItemDto } from '../../../../features/models/responses/employee/employee-list-item-dto';
import { QuizListItemDto } from '../../../../features/models/responses/quiz/quiz-list-item-dto';
import { ApplicantService } from '../../../../features/services/concretes/applicant.service';
import { ApplicationService } from '../../../../features/services/concretes/application.service';
import { EmployeeService } from '../../../../features/services/concretes/employee.service';
import { QuizService } from '../../../../features/services/concretes/quiz.service';

@Component({
  selector: 'app-admin-homepage',
  standalone: true,
  imports: [RouterOutlet,CommonModule],
  templateUrl: './admin-homepage.component.html',
  styleUrl: './admin-homepage.component.css'
})
export class AdminHomepageComponent implements OnInit{

  getListBootcamp:BootcampListItemDto;
  getListInstructor:InstructorListItemDto;
  getListApplication:ApplicationListItemDto;
  getListApplicant:ApplicantListItemDto;
  getListEmployee:EmployeeListItemDto;
  getListQuiz:QuizListItemDto;
  totalBootcamps:number;
  totalInstructors:number;
  totalApplication:number;
  totalApplicant:number;
  totalEmployee:number;
  totalQuiz:number;
  constructor(
    private bootcampService:BootcampService,
    private instructorService:InstructorService,
    private applicantService:ApplicantService,
    private applicationService:ApplicationService,
    private employeeService:EmployeeService,
    private quizService:QuizService
    ) {}
  ngOnInit(): void {
    this.loadBootcamps();
  }
  
  loadBootcamps() {
    const pageRequest: PageRequest = { pageIndex: 0, pageSize: 0 };
    this.getBootcampList(pageRequest);
    this.getInstructorList(pageRequest);
    this.getApplicationList(pageRequest);
    this.getApplicantList(pageRequest);
    this.getEmployeeList(pageRequest);
    this.getQuizList(pageRequest);
  }
  getBootcampList(pageRequest: PageRequest) {
    this.bootcampService.getList(pageRequest).subscribe(response => {
      this.totalBootcamps = response.count;
    })
  }
  getInstructorList(pageRequest: PageRequest) {
    this.instructorService.getList(pageRequest).subscribe(response => {
      this.totalInstructors = response.count;
    })
  }
  getApplicationList(pageRequest:PageRequest) {
    this.applicationService.getList(pageRequest).subscribe( response => {
      this.totalApplication = response.count;
    })
  }
  getApplicantList(pageRequest:PageRequest) {
    this.applicantService.getList(pageRequest).subscribe(response => {
      this.totalApplicant = response.count;
    })
  }
  getEmployeeList(pageRequest:PageRequest) {
    this.employeeService.getList(pageRequest).subscribe(response => {
      this.totalEmployee = response.count;
    })
  }
  getQuizList(pageRequest:PageRequest) {
    this.quizService.getList(pageRequest).subscribe(response => {
      this.totalQuiz = response.count;
    })
  }
}

