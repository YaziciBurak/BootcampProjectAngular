import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, output } from '@angular/core';
import { BootcampListItemDto } from '../../features/models/responses/bootcamp/bootcamp-list-item-dto';
import { BootcampService } from '../../features/services/concretes/bootcamp.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PageRequest } from '../../core/models/page-request';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { formatDate1 } from '../../core/helpers/format-date';
import { DynamicQuery } from '../../core/models/dynamic-query';
import { initFlowbite } from 'flowbite';
import { InstructorListItemDto } from '../../features/models/responses/instructor/instructor-list-item-dto';
import { GetlistInstructorResponse } from '../../features/models/responses/instructor/getlist-instructor-response';
import { InstructorService } from '../../features/services/concretes/instructor.service';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-bootcamp-list-page',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, HttpClientModule, SharedModule],
  templateUrl: './bootcamp-list-page.component.html',
  styleUrl: './bootcamp-list-page.component.css'
})
export class BootcampListPageComponent implements OnInit {
  @Input() selectedInstructorId: string;
  @Output() instructorSelected = new EventEmitter<string>();
  instructors!: InstructorListItemDto;
  currentInstructor!: GetlistInstructorResponse;
  selectedInstructorName: string | null = null;
  filterText:string = 'Eğitmenler';
  activeFilter: 'all' | 'deadlinePassed' | 'continuing' = 'all';

  formDate = formatDate1;
  dateNow = Date.now;
  currentPageNumber: number = 0;
  bootcampList: BootcampListItemDto = {
    index: 0,
    size: 0,
    count: 0,
    hasNext: false,
    hasPrevious: false,
    pages: 0,
    items: []
  };
  constructor(private bootcampService: BootcampService, 
    private instructorService: InstructorService, 
    private activatedRoute: ActivatedRoute,
    private router:Router,
    private change:ChangeDetectorRef
  ) { }
  readonly PAGE_SIZE = 3;
  


  ngOnInit(): void {
    this.getInstructors();
    initFlowbite();
    window.scrollTo(0,0);
    this.activatedRoute.paramMap.subscribe(params => {
      const instructorId = params.get('instructorId');
      const page = parseInt(params.get('page') || '0', 10);
      console.log(`Initializing with instructorId: ${instructorId} and page: ${page}`);
      if (instructorId) {
          this.selectedInstructorId = instructorId;
          this.getBootcampListByInstructor({ page, pageSize:this.PAGE_SIZE }, instructorId);
      } else {
          this.getList({ page, pageSize: this.PAGE_SIZE });
      }
  });
  }
  getInstructors() {
    this.instructorService.getListAll().subscribe((response) => {
      this.instructors = response;
    })
  }
  onSelectedInstructor(instructorId: string, instructorName: string): void {
    this.router.navigate(['/bootcamps/instructor', instructorId]).then(() => {
      this.selectedInstructorId = instructorId;
      this.selectedInstructorName = instructorName;
      this.filterText = instructorName;
      this.getBootcampListByInstructor({ page: this.currentPageNumber, pageSize: this.PAGE_SIZE }, instructorId);
    });
  }
  

  isExpired(endDate: Date): boolean {
    return new Date(endDate) < new Date();
  }
  updateFilterText(instructorId: string): void {
    const instructor = this.instructors.items.find((instructor: any) => instructor.id === instructorId);
    if (instructor) {
      this.filterText = `${instructor.firstName} ${instructor.lastName}`;
    }
  }
  getList(pageRequest: PageRequest) {
    this.bootcampService.getList(pageRequest).subscribe((response) => {
      this.bootcampList = response;
      this.updateCurrentBootcampPageNumber(response.index + 1);
    })
  }

  getBootcampListByInstructor(pageRequest: PageRequest, instructorId: string) {
    console.log(`Fetching bootcamps for instructor ${instructorId} with page ${pageRequest.page}`);
    this.bootcampService.getListBootcampByInstructorId(pageRequest, instructorId).subscribe((response) => {
      this.bootcampList = response;
      this.updateCurrentBootcampPageNumber(response.index );
    })
  }
  onPageNumberClicked(pageNumber: number): void {
    console.log(`Page number clicked: ${pageNumber}`);
    const pageSize = this.PAGE_SIZE;
    const instructorId = this.selectedInstructorId;  
    if (instructorId) {
      this.router.navigate(['/bootcamps/instructor', instructorId, { page: pageNumber }]);
      this.getBootcampListByInstructor({ page: pageNumber, pageSize }, instructorId);
    } else {
      this.router.navigate(['/bootcamps', { page: pageNumber }]);
      this.getList({ page: pageNumber, pageSize });
    }
  }
  updateCurrentBootcampPageNumber(pageNumber: number): void {
    console.log(`Updating current page number to: ${pageNumber}`);
    this.currentPageNumber = pageNumber;
  }
  getPageNumbers(): number[] {
    const pageNumbers = [];
     for (let i = 0; i < this.bootcampList.pages; i++) {
      pageNumbers.push(i);
  }
     return pageNumbers;
   }
  onViewMoreClicked(): void {
    const nextPageIndex = this.bootcampList.index + 1;
    const pageSize = this.bootcampList.size;
    this.getList({ page: nextPageIndex, pageSize })
    this.getContinuingBootcamps({ page: nextPageIndex, pageSize })
    this.updateCurrentPageNumber();
  }

  onPreviousPageClicked(): void {
    const previousPageIndex = this.bootcampList.index - 1;
    const pageSize = this.bootcampList.size;
    this.getList({ page: previousPageIndex, pageSize });
    this.getContinuingBootcamps({ page: previousPageIndex, pageSize })
    this.updateCurrentPageNumber();
  }

  updateCurrentPageNumber(): void {
    this.currentPageNumber = this.bootcampList.index + 1;
  }
  lowerCurrentPageNumber(): void {
    this.currentPageNumber = this.bootcampList.index - 1;
  }

  setCurrentPageNumber(pageNumber: number): void {
    this.currentPageNumber = pageNumber -1;
    const pageRequest = {page: this.currentPageNumber, pageSize: this.PAGE_SIZE};
    switch(this.activeFilter) {
      case 'all':
        this.getAllBootcamps(pageRequest);
        break;
      case 'continuing':
        this.getContinuingBootcamps(pageRequest);
        break;
      case 'deadlinePassed':
        this.getDeadlinePassedBootcamps(pageRequest);
        break;
    }
  }

  getAllBootcamps(pageRequest: PageRequest): void {
    this.activeFilter = 'all';
    this.getList({ page: pageRequest.page, pageSize: pageRequest.pageSize });
  }

  getContinuingBootcamps(pageRequest: PageRequest): void {
    this.activeFilter = 'continuing';
    const query: DynamicQuery = {
      filter: {
        field: 'deadline',
        operator: 'gte',
        value: new Date().toISOString(),
      }
    }
    this.bootcampService.getListBootcampByDynamic({ page: pageRequest.page, pageSize: pageRequest.pageSize }, query).subscribe((response) => {
      this.bootcampList = response;
    })
  }

  getDeadlinePassedBootcamps(pageRequest: PageRequest): void {
    this.activeFilter = 'deadlinePassed';
    const query: DynamicQuery = {
      filter: {
        field: 'deadline',
        operator: 'lte',
        value: new Date().toISOString(),
      }
    }
    this.bootcampService.getListBootcampByDynamic({ page: pageRequest.page, pageSize: pageRequest.pageSize }, query).subscribe((response) => {
      this.bootcampList = response;
    })
  }
}