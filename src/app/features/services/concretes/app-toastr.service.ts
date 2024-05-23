import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AppToastrService {

  constructor(private toastr: ToastrService) { }

  message(message: string, title: string, messageType: ToastrMessageType, toastrOptions?: Partial<ToastrOptions>){
    this.toastr[messageType](message, title,{
      positionClass: toastrOptions?.position ?? ToastrPosition.TopRight,
      timeOut: toastrOptions?.timeOut ?? 4000,
      progressBar: toastrOptions?.progressBar ?? true,
      closeButton: toastrOptions?.closeButton ?? true,

    });
  }
}

export class ToastrOptions {
  position?: ToastrPosition;
  timeOut?: number;
  progressBar?: boolean;
  closeButton?: boolean;
}

export enum ToastrMessageType{
  Success = "success",
  Info = "info",
  Warning = "warning",
  Error = "error"
}

export enum  ToastrPosition{
  TopRight = "toast-top-right",
  BottomRight = "toast-bottom-right",
  BottomLeft = "toast-bottom-left",
  TopLeft = "toast-top-left",
  TopFullWidth = "toast-top-full-width",
  BottomFullWidth = "toast-bottom-full-width",
  TopCenter = "toast-top-center",
  BottomCenter ="toast-bottom-center"
}
