import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { BootcampListGroupComponent } from '../bootcamp-list-group.component';
import { GetbyidBootcampResponse } from '../../../../models/responses/bootcamp/getbyid-bootcamp-response';
import { BootcampService } from '../../../../services/concretes/bootcamp.service';

@Component({
  selector: 'app-bootcamp-details',
  standalone: true,
  imports: [RouterModule, CommonModule, BootcampListGroupComponent],
  templateUrl: './bootcamp-details.component.html',
  styleUrl: './bootcamp-details.component.css',
})
export class BootcampDetailComponent {
  getByIdBootcampResponse!: GetbyidBootcampResponse;
  bootcampId: number = 1;

  constructor(
    private bootcampService: BootcampService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: { [x: string]: number }) => {
      if (params['bootcampId']) {
        this.getBootcampById(params['bootcampId']);
      } else {
        console.log('getById bootcamp error');
      }
    });
  }
  getBootcampById(bootcampId: number): void {
    this.bootcampService.getById(bootcampId).subscribe(
      (response: GetbyidBootcampResponse) => {
        console.log('geliyor ' + response.name);
        this.getByIdBootcampResponse = response;
      },
      (error: any) => {
        console.error('Error fetching bootcamp:', error);
        console.log('getBootcampById error');
      }
    );
  }
}
