import { Component, OnInit } from '@angular/core';
import { formatDate1 } from '../../core/helpers/format-date';
import { ApplicationListItemDto } from '../../features/models/responses/application/application-list-item-dto';
import { AuthService } from '../../features/services/concretes/auth.service';
import { ApplicationService } from '../../features/services/concretes/application.service';
import { initFlowbite } from 'flowbite';
import { PageRequest } from '../../core/models/page-request';
import { DynamicQuery } from '../../core/models/dynamic-query';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../../shared/shared.module';
import { BootcampContentService } from '../../features/services/concretes/bootcamp-content.service';
import { BootcampcontentListItemDto } from '../../features/models/responses/bootcampcontent/bootcampcontent-list-item-dto';

@Component({
  selector: 'app-my-bootcamps-list-page',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, HttpClientModule, SharedModule],
  templateUrl: './my-bootcamps-list-page.component.html',
  styleUrl: './my-bootcamps-list-page.component.css'
})
export class MyBootcampsListPageComponent implements OnInit {
  activeFilter: 'all' | 'continue' | 'finished'  = 'all';
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
  constructor(private authService: AuthService, private applicationService: ApplicationService, 
    private activatedRoute: ActivatedRoute,  private bootcampContentService: BootcampContentService, ) { }
  readonly PAGE_SIZE = 3;
  ngOnInit(): void {
    

    this.getMyAllBootcamps({ page: 0, pageSize: this.PAGE_SIZE });
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
          }

        ]
      }
    }
      this.applicationService.getListApplicationByDynamic({ page: pageRequest.page, pageSize: pageRequest.pageSize }, query).subscribe((response) => {
      this.applicationList = response;
    })
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
            value: '2'
          },
          {
            field: 'bootcamp.bootcampStateId',
            operator: 'eq',
            value: '1'
          }

        ]
      }
    }
    this.applicationService.getListApplicationByDynamic({ page: pageRequest.page, pageSize: pageRequest.pageSize }, query).subscribe((response) => {
      this.applicationList = response;
    })
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
            value: '2'
          },
          {
            field: 'bootcamp.bootcampStateId',
            operator: 'eq',
            value: '4'
          }

        ]
      }
    }
    this.applicationService.getListApplicationByDynamic({ page: pageRequest.page, pageSize: pageRequest.pageSize }, query).subscribe((response) => {
      this.applicationList = response;
    })
  }


   
    
  

  
}

