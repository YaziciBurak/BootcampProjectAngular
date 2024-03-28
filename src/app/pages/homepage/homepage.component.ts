import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { GetlistBootcampResponse } from '../../models/responses/bootcamp/getlist-bootcamp-response';
import { GetlistBootcampstateResponse } from '../../models/responses/bootcampstate/getlist-bootcampstate-response';
import { DataResult } from '../../dataresult';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [RouterOutlet,RouterModule,CommonModule,HttpClientModule,NavbarComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent implements OnInit{

  bootcampList:GetlistBootcampResponse[] = [];
  bootcampState:GetlistBootcampstateResponse[] = [];
  
  constructor(private httpClient:HttpClient){}

  ngOnInit(): void {
    this.getListModels();
  }
  ngOnInit1(): void {
    this.getListModels1();
  }
 getListModels(){
    this.httpClient.get<DataResult<GetlistBootcampResponse[]>>("http://localhost:5278/api/Bootcamps")
    .subscribe({
      next:(response:DataResult<GetlistBootcampResponse[]>)=>{
        console.log("Cevap geldi :",response);
        this.bootcampList=response.data;
      },
      error:(error)=>{console.log("cevap hatalı :",error)},
      complete:()=>{console.log("istek sonlandı")}
    })
  }
  getListModels1(){
    this.httpClient.get<GetlistBootcampstateResponse[]>("http://localhost:5278/api/BootcampStates")
    .subscribe({
      next:(response:GetlistBootcampstateResponse[])=>{
        console.log("Cevap geldi :",response);
        this.bootcampState=response;
      },
      error:(error)=>{console.log("cevap hatalı :",error)},
      complete:()=>{console.log("istek sonlandı")}
    })
  }
  }
