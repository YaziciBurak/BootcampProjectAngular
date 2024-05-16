import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { GetbyidBootcampResponse } from '../../features/models/responses/bootcamp/getbyid-bootcamp-response';
import { formatDate1 } from '../../core/helpers/format-date';
import { BootcampService } from '../../features/services/concretes/bootcamp.service';
import { BootcampContentService } from '../../features/services/concretes/bootcamp-content.service';
import { GetbyidBootcampcontentResponse } from '../../features/models/responses/bootcampcontent/getbyid-bootcampcontent-response';

@Component({
  selector: 'app-bootcamp-content-page',
  standalone: true,
  imports: [CommonModule,HttpClientModule,RouterModule],
  templateUrl: './bootcamp-content-page.component.html',
  styleUrl: './bootcamp-content-page.component.css'
})
export class BootcampContentPageComponent implements OnInit{
  getByIdBootcampResponse !: GetbyidBootcampResponse;
  getByIdBootcampContentResponse !: GetbyidBootcampcontentResponse
  bootcampId:number = 1 ;
  formatDate = formatDate1;

  constructor(private bootcampService: BootcampService, private activatedRoute: ActivatedRoute, private bootcampContentService:BootcampContentService) {}

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

  getBootcampContentById(Id: number): void {
    this.bootcampContentService.getById(Id).subscribe(
      (response:  GetbyidBootcampcontentResponse ) => {
     
        this.getByIdBootcampContentResponse = response;
      },
      (error: any) => {
        console.error('Error fetching bootcamp:', error);
        console.log("getBootcampById error");
      }
    );
  }
}

