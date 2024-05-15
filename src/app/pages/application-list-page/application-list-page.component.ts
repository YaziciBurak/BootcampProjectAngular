import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SharedModule } from 'primeng/api';
import { formatDate1 } from '../../core/helpers/format-date';
import { ApplicantListItemDto } from '../../features/models/responses/applicant/applicant-list-item-dto';
import { ApplicationListItemDto } from '../../features/models/responses/application/application-list-item-dto';
import { ApplicationService } from '../../features/services/concretes/application.service';
import { initFlowbite } from 'flowbite';
import { PageRequest } from '../../core/models/page-request';
import { DynamicQuery } from '../../core/models/dynamic-query';
import { AuthService } from '../../features/services/concretes/auth.service';

@Component({
  selector: 'app-application-list-page',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, HttpClientModule, SharedModule],
  templateUrl: './application-list-page.component.html',
  styleUrl: './application-list-page.component.css'
})
export class ApplicationListPageComponent implements OnInit {
  activeFilter: 'all' | 'accepted' | 'rejected' | 'waiting' = 'all';
  formDate = formatDate1;
  dateNow = Date.now;
  currentPageNumber: number = 0;
  applicationList: ApplicationListItemDto = {
    index: 0,
    size: 0,
    count: 0,
    hasNext: false,
    hasPrevious: false,
    pages: 0,
    items: []
  };
  constructor(private authService: AuthService, private applicationService: ApplicationService, private activatedRoute: ActivatedRoute) { }
  readonly PAGE_SIZE = 3;
  ngOnInit(): void {
    initFlowbite();


  };
  getList(pageRequest: PageRequest) {

    this.applicationService.getList(pageRequest).subscribe((response) => {
      this.applicationList = response;
      this.updateCurrentPageNumber();
    })
  }
  onViewMoreClicked(): void {
    const nextPageIndex = this.applicationList.index + 1;
    const pageSize = this.applicationList.size;
    this.getList({ page: nextPageIndex, pageSize })
    this.updateCurrentPageNumber();
  }

  onPreviousPageClicked(): void {
    const previousPageIndex = this.applicationList.index - 1;
    const pageSize = this.applicationList.size;
    this.getList({ page: previousPageIndex, pageSize });
    this.updateCurrentPageNumber();
  }

  updateCurrentPageNumber(): void {
    this.currentPageNumber = this.applicationList.index + 1;
  }
  lowerCurrentPageNumber(): void {
    this.currentPageNumber = this.applicationList.index - 1;
  }

  setCurrentPageNumber(pageNumber: number): void {
    this.currentPageNumber = pageNumber - 1;
    const pageRequest = { page: this.currentPageNumber, pageSize: this.PAGE_SIZE };
    switch (this.activeFilter) {
      case 'all':
        this.getAllApplications(pageRequest);
        break;
      case 'accepted':
        this.getAcceptedApplications(pageRequest);
        break;
      case 'rejected':
        this.getRejectedApplications(pageRequest);
        break;

      case 'waiting':
        this.getWaitingApplications(pageRequest);
        break;

    }
  }

  getAllApplications(pageRequest: PageRequest): void {
    this.activeFilter = 'all';
    const loggedInUserId = this.authService.getCurrentUserId();
    const query: DynamicQuery = {
      filter: {
        field: 'applicantId',
        operator: 'eq',
        value: loggedInUserId.toString(),
        
      }
    }
      this.applicationService.getListApplicationByDynamic({ page: pageRequest.page, pageSize: pageRequest.pageSize }, query).subscribe((response) => {
      this.applicationList = response;
    })
  }

  getAcceptedApplications(pageRequest: PageRequest): void {
    this.activeFilter = 'accepted';
    const loggedInUserId = this.authService.getCurrentUserId();
    const query: DynamicQuery = {
      filter: {
        field: 'applicantId',
        operator: 'eq',
        value: loggedInUserId.toString(),
        logic: 'and',
        filters: [
          {
            field: 'applicationStateId',
            operator: 'eq',
            value: '2',

          }

        ]
      }
    }
    this.applicationService.getListApplicationByDynamic({ page: pageRequest.page, pageSize: pageRequest.pageSize }, query).subscribe((response) => {
      this.applicationList = response;
    })
  }

  getRejectedApplications(pageRequest: PageRequest): void {
    this.activeFilter = 'rejected';
    const loggedInUserId = this.authService.getCurrentUserId();
    const query: DynamicQuery = {
      filter: {
        field: 'applicantId',
        operator: 'eq',
        value: loggedInUserId.toString(),
        logic: 'and',
        filters: [
          {
            field: 'applicationStateId',
            operator: 'eq',
            value: '3',

          }

        ]
      }
    }
    this.applicationService.getListApplicationByDynamic({ page: pageRequest.page, pageSize: pageRequest.pageSize }, query).subscribe((response) => {
      this.applicationList = response;
    })
  }

  getWaitingApplications(pageRequest: PageRequest): void {
    this.activeFilter = 'waiting';
    const loggedInUserId = this.authService.getCurrentUserId();
    const query: DynamicQuery = {
      filter: {
        field: 'applicantId',
        operator: 'eq',
        value: loggedInUserId.toString(),
        logic: 'and',
        filters: [
          {
            field: 'applicationStateId',
            operator: 'eq',
            value: '1',

          }

        ]
      }
    }
    this.applicationService.getListApplicationByDynamic({ page: pageRequest.page, pageSize: pageRequest.pageSize }, query).subscribe((response) => {
      this.applicationList = response;
    })
  }
}
