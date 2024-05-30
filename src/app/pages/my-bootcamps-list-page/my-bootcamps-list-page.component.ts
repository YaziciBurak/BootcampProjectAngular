import { Component, OnInit } from '@angular/core';
import { formatDate1 } from '../../core/helpers/format-date';
import { ApplicationListItemDto } from '../../features/models/responses/application/application-list-item-dto';
import { AuthService } from '../../features/services/concretes/auth.service';
import { ApplicationService } from '../../features/services/concretes/application.service';
import { PageRequest } from '../../core/models/page-request';
import { DynamicQuery } from '../../core/models/dynamic-query';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { BootcampContentService } from '../../features/services/concretes/bootcamp-content.service';

@Component({
  selector: 'app-my-bootcamps-list-page',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, SharedModule],
  templateUrl: './my-bootcamps-list-page.component.html',
  styleUrl: './my-bootcamps-list-page.component.css',
})
export class MyBootcampsListPageComponent implements OnInit {
  activeFilter: 'all' | 'continue' | 'finished' = 'all';
  formDate = formatDate1;
  dateNow = Date.now;
  today = new Date();
  todayYear = this.today.getFullYear();
  todayMonth = this.today.getMonth() + 1;
  todayDate = this.today.getDate();
  currentPageNumber: number = 0;
  applicationList: ApplicationListItemDto = {
    index: 0,
    size: 0,
    count: 0,
    hasNext: false,
    hasPrevious: false,
    pages: 0,
    items: [],
  };
  constructor(
    private authService: AuthService,
    private applicationService: ApplicationService,
    private activatedRoute: ActivatedRoute,
    private bootcampContentService: BootcampContentService
  ) { }
  readonly PAGE_SIZE = 3;
  ngOnInit(): void {
    this.getMyAllBootcamps({ pageIndex: 0, pageSize: this.PAGE_SIZE });
    this.activatedRoute.params.subscribe((params) => {
      const bootcampId = params['bootcampId'];
      console.log(bootcampId);
      if (bootcampId) {
        this.getBootcampContentByBootcampId(
          { pageIndex: 0, pageSize: this.PAGE_SIZE },
          bootcampId
        );
      } else {
        this.getMyAllBootcamps({ pageIndex: 0, pageSize: this.PAGE_SIZE });
      }
    });
  }
  getBootcampContentByBootcampId(pageRequest: PageRequest, bootcampId: number) {
    this.bootcampContentService
      .getbybootcampId(pageRequest, bootcampId)
      .subscribe(
        (response) => {
          console.log('Bootcamp Content:', response);
        },
        (error) => {
          console.error('Error:', error);
        }
      );
  }

  getList(pageRequest: PageRequest) {
    this.applicationService.getList(pageRequest).subscribe((response) => {
      this.applicationList = response;
    });
  }
  getPageNumbers(): number[] {
    const pageNumbers = [];
    for (let i = 0; i < this.applicationList.pages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  }
  onPageNumberClicked(pageNumber: number): void {
    console.log(`Page number clicked: ${pageNumber}`);
    const pageRequest = { pageIndex: pageNumber, pageSize: this.PAGE_SIZE };
    switch (this.activeFilter) {
      case 'all':
        this.getMyAllBootcamps(pageRequest);
        break;
      case 'continue':
        this.getMyContinueBootcamps(pageRequest);
        break;
      case 'finished':
        this.getMyFinishedBootcamps(pageRequest);
        break;
    }
  }
  setCurrentPageNumber(pageNumber: number): void {
    this.currentPageNumber = pageNumber - 1;
    const pageRequest = {
      pageIndex: this.currentPageNumber,
      pageSize: this.PAGE_SIZE,
    };
    switch (this.activeFilter) {
      case 'all':
        this.getMyAllBootcamps(pageRequest);
        break;
      case 'continue':
        this.getMyContinueBootcamps(pageRequest);
        break;
      case 'finished':
        this.getMyFinishedBootcamps(pageRequest);
        break;
    }
  }

  getMyAllBootcamps(pageRequest: PageRequest): void {
    this.activeFilter = 'all';
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
          },
        ],
      },
    };
    this.applicationService
      .getListApplicationByDynamic(
        { pageIndex: pageRequest.pageIndex, pageSize: pageRequest.pageSize },
        query
      )
      .subscribe((response) => {
        this.applicationList = response;
      });
  }

  getMyContinueBootcamps(pageRequest: PageRequest): void {
    this.activeFilter = 'continue';
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
          },
          {
            field: 'bootcamp.endDate',
            operator: 'gte',
            value: `${this.todayYear}-${this.todayMonth}-${this.todayDate}`,
          },
        ],
      },
    };
    this.applicationService
      .getListApplicationByDynamic(pageRequest, query)
      .subscribe((response) => {
        this.applicationList = response;
      });
  }

  getMyFinishedBootcamps(pageRequest: PageRequest): void {
    this.activeFilter = 'finished';
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
          },
          {
            field: 'bootcamp.endDate',
            operator: 'lt',
            value: `${this.todayYear}-${this.todayMonth}-${this.todayDate}`,
          },
        ],
      },
    };
    this.applicationService
      .getListApplicationByDynamic(pageRequest, query)
      .subscribe((response) => {
        this.applicationList = response;
      });
  }
}
