import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BootcampListItemDto } from '../../../features/models/responses/bootcamp/bootcamp-list-item-dto';

@Component({
  selector: 'app-bootcamp-card',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './bootcamp-card.component.html',
  styleUrl: './bootcamp-card.component.css',
})
export class BootcampCardComponent {
  bootcampList: BootcampListItemDto = {
    index: 0,
    size: 0,
    count: 0,
    hasNext: false,
    hasPrevious: false,
    pages: 0,
    items: [
      {
        id: 1,
        name: 'Bootcamp 1',
        instructorId: '1',
        instructorFirstName: 'Instructor',
        instructorLastName: 'One',
        bootcampStateName: 'Open',
        bootcampImagePath: 'path/to/image',
        startDate: new Date(),
        endDate: new Date(),
      },
      {
        id: 2,
        name: 'Bootcamp 2',
        instructorId: '2',
        instructorFirstName: 'Instructor',
        instructorLastName: 'Two',
        bootcampStateName: 'Open',
        bootcampImagePath: 'path/to/image',
        startDate: new Date(),
        endDate: new Date(),
      },
      {
        id: 3,
        name: 'Bootcamp 3',
        instructorId: '3',
        instructorFirstName: 'Instructor',
        instructorLastName: 'Three',
        bootcampStateName: 'Open',
        bootcampImagePath: 'path/to/image',
        startDate: new Date(),
        endDate: new Date(),
      },
      {
        id: 4,
        name: 'Bootcamp 4',
        instructorId: '4',
        instructorFirstName: 'Instructor',
        instructorLastName: 'Four',
        bootcampStateName: 'Open',
        bootcampImagePath: 'path/to/image',
        startDate: new Date(),
        endDate: new Date(),
      },
    ],
  };
}
