import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BootcampListItemDto } from '../../../features/models/responses/bootcamp/bootcamp-list-item-dto';
import { PageRequest } from '../../../core/models/page-request';
import { BootcampService } from '../../../features/services/concretes/bootcamp.service';

@Component({
  selector: 'app-bootcamp-card',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './bootcamp-card.component.html',
  styleUrl: './bootcamp-card.component.css',
})
export class BootcampCardComponent implements OnInit{
  bootcampList:BootcampListItemDto ;

  constructor(private bootcampService:BootcampService) {}
  ngOnInit(): void {
    this.loadBootcamps();
  }
  loadBootcamps() {
    const pageRequest: PageRequest = { page: 0, pageSize: 4};
    this.getApplicationStates(pageRequest);
  }
  getApplicationStates(pageRequest: PageRequest) {
    this.bootcampService.getList(pageRequest).subscribe(response => {
      this.bootcampList = response;
    });
}
}
