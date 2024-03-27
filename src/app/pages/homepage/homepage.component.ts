import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../component/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { GetlistApplicationResponse } from '../../models/responses/application/getlist-application-response';


@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [RouterOutlet,RouterModule,CommonModule,HttpClientModule,NavbarComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent implements OnInit{

  applicationList:GetlistApplicationResponse[] = [];

  constructor(private httpClient:HttpClient){}

  ngOnInit(): void {
    this.getListModels();
  }

  getListModels(){
    this.httpClient.get<GetlistApplicationResponse[]>("http://localhost:5190/api/Models")
    .subscribe({
      next:(response:GetlistApplicationResponse[])=>{
        console.log("Cevap geldi :",response);
        this.applicationList=response;
      },
      error:(error)=>{console.log("cevap hatalı :",error)},
      complete:()=>{console.log("istek sonlandı")}
    })
  }

  getTodos1(){

    console.log("Öncesi")
    this.asyncOperation()
    .then((response:string)=>{
      console.log("Doğru çalıştı : ",response)
    })
    .catch((error)=>{
      console.log("Hata :",error)
    })
    .finally(()=>{
      console.log("Başarılı veya başarısız");
    })
    console.log("sonrası")
  }

  async getTodos2(){
    try {
      let values = await this.asyncOperation();
      console.log(values);
    } catch (error) {
      console.log("hata :",error)
    }
  }

  asyncOperation():Promise<string>{
    //callback function
    return new Promise((resolve,reject)=>{
      setTimeout(()=>{
        reject("çalıştı");
      })
    });
  }
}