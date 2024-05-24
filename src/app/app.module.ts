import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Ekle
import { ToastrModule } from 'ngx-toastr'; // Ekle
import { EditorModule } from '@tinymce/tinymce-angular';

import { AppComponent } from './app.component';

@NgModule({

  imports: [
    BrowserModule,
    BrowserAnimationsModule, // Ekle
    ToastrModule.forRoot(),
    EditorModule,
  ],
  providers: [],

})
export class AppModule { }