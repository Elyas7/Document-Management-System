import { Injectable, TemplateRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastServiceService {
  toasts: any[]=[];
  successoptions: any = {type:"Success", classname: 'bg-success text-light', delay:10000};
  erroroptions: any = {type: "Error", classname: 'bg-danger text-light', delay: 10000 };
  warningoptions: any = { type:"Warning",classname: 'bg-warning text-light', delay: 10000 };

  remove(toast: any){
    this.toasts=this.toasts.filter(t=> t !==toast);
  }
  success(textOrTpl: string | TemplateRef<any>){

    this.toasts.push({ textOrTpl, ...this.successoptions });
  }
  error(textOrTpl: string | TemplateRef<any>){
    this.toasts.push({ textOrTpl, ...this.erroroptions });
  }
  warning(textOrTpl: string | TemplateRef<any>){
    this.toasts.push({ textOrTpl, ...this.warningoptions });
  }

  constructor() { }
}
