import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { InstructorListItemDto } from '../../../features/models/responses/instructor/instructor-list-item-dto';
import { InstructorService } from '../../../features/services/concretes/instructor.service';

@Component({
  selector: 'app-instructor-card',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './instructor-card.component.html',
  styleUrl: './instructor-card.component.css',
})
export class InstructorCardComponent implements OnInit {
  instructorList: InstructorListItemDto;

  constructor(private instructorService: InstructorService) {}
  ngOnInit(): void {
    const pageRequest = { page: 0, pageSize: 4 };
    this.instructorService.getList(pageRequest).subscribe((response) => {
      this.instructorList = response;
    });
  }
}
