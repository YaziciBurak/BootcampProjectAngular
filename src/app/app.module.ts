import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { EditorModule } from '@tinymce/tinymce-angular';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './core/interceptors/Auth/auth.interceptor';
import { RefreshTokenService } from './features/services/concretes/refresh-token.service';


@NgModule({

  declarations: [

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, // Ekle
    ToastrModule.forRoot(),
    SweetAlert2Module.forRoot(),
    EditorModule,
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    RefreshTokenService,],
  bootstrap: []
})
export class AppModule { }