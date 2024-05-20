import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BootcampListItemDto } from '../../../models/responses/bootcamp/bootcamp-list-item-dto';
import { BootcampService } from '../../../services/concretes/bootcamp.service';
import { PageRequest } from '../../../../core/models/page-request';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { InstructorComponent } from '../../instructor/instructor.component';
import { BootcampCardComponent } from '../../../../shared/components/bootcamp-card/bootcamp-card.component';

@Component({
  selector: 'app-bootcamp-list-group',
  standalone: true,
  imports: [RouterModule, CommonModule, InstructorComponent, HttpClientModule, FormsModule, BootcampCardComponent],
  templateUrl: './bootcamp-list-group.component.html',
  styleUrl: './bootcamp-list-group.component.css'
})
export class BootcampListGroupComponent implements OnInit {

  dateNow = Date.now;
  currentPageNumber!: number;
  bootcampList: BootcampListItemDto = {
    index: 0,
    size: 0,
    count: 0,
    hasNext: false,
    hasPrevious: false,
    pages: 0,
    items: []
  };
  constructor(private bootcampService: BootcampService, private activatedRoute: ActivatedRoute) { }
  readonly PAGE_SIZE = 6;
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params["instructorId"]) {
        this.getBootcampListByInstructor({ pageIndex: 0, pageSize: this.PAGE_SIZE }, params["instructorId"])
      } else { this.getList({ pageIndex: 0, pageSize: this.PAGE_SIZE }) }
    })
  }

  isExpired(endDate: Date): boolean {
    return new Date(endDate) < new Date();
  }

  getList(pageRequest: PageRequest) {
    this.bootcampService.getList(pageRequest).subscribe((response) => {
      this.bootcampList = response;
      this.updateCurrentPageNumber();
    })
  }

  getBootcampListByInstructor(pageRequest: PageRequest, instructorId: string) {
    this.bootcampService.getListBootcampByInstructorId(pageRequest, instructorId).subscribe((response) => {
      this.bootcampList = response;
      this.updateCurrentPageNumber();
    })
  }



  onViewMoreClicked(): void {
    const nextPageIndex = this.bootcampList.index + 1;
    const pageSize = this.bootcampList.size;
    this.getList({ pageIndex: nextPageIndex, pageSize })
    this.updateCurrentPageNumber();

  }

  onPreviousPageClicked(): void {
    const previousPageIndex = this.bootcampList.index - 1;
    const pageSize = this.bootcampList.size;
    this.getList({ pageIndex: previousPageIndex, pageSize });
    this.updateCurrentPageNumber();
  }

  updateCurrentPageNumber(): void {
    this.currentPageNumber = this.bootcampList.index + 1;
  }
  lowerCurrentPageNumber(): void {
    this.currentPageNumber = this.bootcampList.index - 1;
  }

}