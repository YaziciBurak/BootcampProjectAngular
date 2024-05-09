import { Component, OnInit } from '@angular/core';
import { BootcampListItemDto } from '../../features/models/responses/bootcamp/bootcamp-list-item-dto';
import { BootcampService } from '../../features/services/concretes/bootcamp.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PageRequest } from '../../core/models/page-request';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { formatDate1 } from '../../core/helpers/format-date';

@Component({
  selector: 'app-bootcamp-list-page',
  standalone: true,
  imports: [CommonModule,RouterModule,FormsModule,HttpClientModule],
  templateUrl: './bootcamp-list-page.component.html',
  styleUrl: './bootcamp-list-page.component.css'
})
export class BootcampListPageComponent implements OnInit {
    formDate = formatDate1;

    dateNow = Date.now;
    currentPageNumber!:number;
    bootcampList:BootcampListItemDto={
      index:0,
      size:0,
      count:0,
      hasNext:false,
      hasPrevious:false,
      pages:0,
      items:[]
    };
    constructor(private bootcampService:BootcampService,private activatedRoute:ActivatedRoute){}
    readonly PAGE_SIZE=15;

    ngOnInit(): void {
      this.activatedRoute.params.subscribe(params=>{
        if(params["instructorId"]){
          this.getBootcampListByInstructor({page:0,pageSize:this.PAGE_SIZE},params["instructorId"])
        }else{this.getList({page:0,pageSize:this.PAGE_SIZE})}
      }) 
    }
  
    isExpired(endDate: Date): boolean {
      return new Date(endDate) < new Date(); 
    }
  
    getList(pageRequest:PageRequest){
      this.bootcampService.getList(pageRequest).subscribe((response)=>{
        this.bootcampList=response;
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
      this.getList({ page: nextPageIndex, pageSize })
      this.updateCurrentPageNumber();   
    }
  
    onPreviousPageClicked(): void {
      const previousPageIndex = this.bootcampList.index - 1;
      const pageSize = this.bootcampList.size;
      this.getList({ page: previousPageIndex, pageSize });
      this.updateCurrentPageNumber();
    }
  
    updateCurrentPageNumber(): void {
      this.currentPageNumber = this.bootcampList.index + 1;
    }
    lowerCurrentPageNumber(): void {
      this.currentPageNumber = this.bootcampList.index - 1;
    }
}
