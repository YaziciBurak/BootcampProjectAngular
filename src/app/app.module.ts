import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { EditorModule } from '@tinymce/tinymce-angular';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, // Ekle
    ToastrModule.forRoot(),
    SweetAlert2Module.forRoot(),
    HttpClientModule,
    EditorModule,
  ],
  providers: [],
  bootstrap: [],
})
export class AppModule { }
