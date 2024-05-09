import { Component, OnInit } from '@angular/core';
import { GetbyidBootcampResponse } from '../../features/models/responses/bootcamp/getbyid-bootcamp-response';
import { BootcampService } from '../../features/services/concretes/bootcamp.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule} from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { formatDate, formatDate1 } from '../../core/helpers/format-date';

@Component({
  selector: 'app-bootcamp-detail-page',
  standalone: true,
  imports: [CommonModule,HttpClientModule,RouterModule],
  templateUrl: './bootcamp-detail-page.component.html',
  styleUrl: './bootcamp-detail-page.component.css'
})
export class BootcampDetailPageComponent implements OnInit{
  getByIdBootcampResponse !: GetbyidBootcampResponse;
  bootcampId:number = 1 ;
  formatDate = formatDate1;

  constructor(private bootcampService: BootcampService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: { [x: string]: number; }) => {
      if (params["bootcampId"]) {
        this.getBootcampById(params["bootcampId"])
      } else { console.log("getById bootcamp error") }
    })
  }
  getBootcampById(bootcampId: number): void {
    this.bootcampService.getById(bootcampId).subscribe(
      (response: GetbyidBootcampResponse) => {
        console.log("geliyor " + response.name);
        this.getByIdBootcampResponse = response;
      },
      (error: any) => {
        console.error('Error fetching bootcamp:', error);
        console.log("getBootcampById error");
      }
    );
  }
}
