import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  output,
} from '@angular/core';
import { BootcampListItemDto } from '../../features/models/responses/bootcamp/bootcamp-list-item-dto';
import { BootcampService } from '../../features/services/concretes/bootcamp.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PageRequest } from '../../core/models/page-request';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
  imports: [CommonModule, RouterModule, FormsModule, SharedModule],
  templateUrl: './bootcamp-list-page.component.html',
  styleUrl: './bootcamp-list-page.component.css',
})
export class BootcampListPageComponent implements OnInit {
  @Input() selectedInstructorId: string;
  @Output() instructorSelected = new EventEmitter<string>();
  instructors!: InstructorListItemDto;
  currentInstructor!: GetlistInstructorResponse;
  selectedInstructorName: string | null = null;
  focusedButton: number | null = null;
  isDropdownVisible = false;
  filterText: string = 'Eğitmenler';
  activeFilter: 'all' | 'deadlinePassed' | 'continuing' | 'instructor' = 'all';
  today = new Date();
  todayYear = this.today.getFullYear();
  todayMonth = this.today.getMonth() + 1;
  todayDate = this.today.getDate();

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
    items: [],
  };
  constructor(
    private bootcampService: BootcampService,
    private instructorService: InstructorService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}
  readonly PAGE_SIZE = 3;

  ngOnInit(): void {
    initFlowbite();
    this.getInstructors();
    window.scrollTo(0, 0);
    this.activatedRoute.paramMap.subscribe((params) => {
      const instructorId = params.get('instructorId');
      const page = parseInt(params.get('page') || '0', 10);
      if (instructorId) {
        this.selectedInstructorId = instructorId;
        this.getBootcampListByInstructor(
          { pageIndex: page, pageSize: this.PAGE_SIZE },
          instructorId
        );
      } else {
        this.getList({ pageIndex: page, pageSize: this.PAGE_SIZE });
      }
    });
  }
  getInstructors() {
    this.instructorService.getListAll().subscribe((response) => {
      this.instructors = response;
    });
  }
  onSelectedInstructor(instructorId: string, instructorName: string): void {
    this.router.navigate(['/bootcamps/instructor', instructorId]).then(() => {
      this.selectedInstructorId = instructorId;
      this.selectedInstructorName = instructorName;
      this.filterText = instructorName;
      this.isDropdownVisible = false;
      this.getBootcampListByInstructor(
        { pageIndex: this.currentPageNumber, pageSize: this.PAGE_SIZE },
        instructorId
      );
      this.activeFilter = 'instructor';
    });
  }
  toggleDropdown() {
    this.isDropdownVisible = !this.isDropdownVisible;
  }

  isExpired(endDate: Date): boolean {
    return new Date(endDate) < new Date();
  }
  updateFilterText(instructorId: string): void {
    const instructor = this.instructors.items.find(
      (instructor: any) => instructor.id === instructorId
    );
    if (instructor) {
      this.filterText = `${instructor.firstName} ${instructor.lastName}`;
    }
  }
  getList(pageRequest: PageRequest) {
    this.bootcampService.getList(pageRequest).subscribe((response) => {
      this.bootcampList = response;
    });
  }

  getBootcampListByInstructor(pageRequest: PageRequest, instructorId: string) {
    this.bootcampService
      .getListBootcampByInstructorId(pageRequest, instructorId)
      .subscribe((response) => {
        this.bootcampList = response;
      });
  }
  onPageNumberClicked(pageNumber: number): void {
    const pageRequest = { pageIndex: pageNumber, pageSize: this.PAGE_SIZE };
    switch (this.activeFilter) {
      case 'all':
        this.getAllBootcamps(pageRequest);
        break;
      case 'continuing':
        this.getContinuingBootcamps(pageRequest);
        break;
      case 'deadlinePassed':
        this.getDeadlinePassedBootcamps(pageRequest);
        break;
      case 'instructor':
        this.getBootcampListByInstructor(
          pageRequest,
          this.selectedInstructorId
        );
        break;
    }
  }
  updateCurrentBootcampPageNumber(pageNumber: number): void {
    this.currentPageNumber = pageNumber;
  }
  getPageNumbers(): number[] {
    const pageNumbers = [];
    for (let i = 0; i < this.bootcampList.pages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  }

  setCurrentPageNumber(pageNumber: number): void {
    this.currentPageNumber = pageNumber - 1;
    const pageRequest = {
      pageIndex: this.currentPageNumber,
      pageSize: this.PAGE_SIZE,
    };
    switch (this.activeFilter) {
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
    this.getList(pageRequest);
  }

  getContinuingBootcamps(pageRequest: PageRequest): void {
    this.activeFilter = 'continuing';
    const query: DynamicQuery = {
      sort: [
        {
          field: 'deadline',
          dir: 'desc',
        },
      ],

      filter: {
        field: 'deadline',
        operator: 'gte',
        value: `${this.todayYear}-${this.todayMonth}-${this.todayDate}`,
      },
    };
    this.bootcampService
      .getListBootcampByDynamic(pageRequest, query)
      .subscribe((response) => {
        this.bootcampList = response;
      });
  }

  getDeadlinePassedBootcamps(pageRequest: PageRequest): void {
    this.activeFilter = 'deadlinePassed';
    const query: DynamicQuery = {
      sort: [
        {
          field: 'deadline',
          dir: 'desc',
        },
      ],
      filter: {
        field: 'deadline',
        operator: 'lt',
        value: `${this.todayYear}-${this.todayMonth}-${this.todayDate}`,
      },
    };
    this.bootcampService
      .getListBootcampByDynamic(pageRequest, query)
      .subscribe((response) => {
        this.bootcampList = response;
      });
  }

  setFocus(buttonIndex: number) {
    this.focusedButton = buttonIndex;
  }
}
