import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InstructorListItemDto } from '../../features/models/responses/instructor/instructor-list-item-dto';
import { InstructorService } from '../../features/services/concretes/instructor.service';
import { PageRequest } from '../../core/models/page-request';

@Component({
  selector: 'app-instructor-list-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './instructor-list-page.component.html',
  styleUrl: './instructor-list-page.component.css',
})
export class InstructorListPageComponent implements OnInit {
  instructorList: InstructorListItemDto = {
    index: 0,
    size: 0,
    count: 0,
    hasNext: false,
    hasPrevious: false,
    pages: 0,
    items: [],
  };
  private PAGE_SIZE = 100;
  constructor(private instructorService: InstructorService) {}
  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.getList({ pageIndex: 0, pageSize: this.PAGE_SIZE });
  }
  getList(pageRequest: PageRequest): void {
    this.instructorService.getList(pageRequest).subscribe((response) => {
      this.instructorList = response;
    });
  }
}
