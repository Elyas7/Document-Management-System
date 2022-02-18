import { Component, OnInit } from '@angular/core';
import { Document } from 'src/app/document';
import { DocumentsService } from 'src/app/documents.service';
import { GridComponent, GridDataResult, PageChangeEvent, GridModule, DataBindingDirective } from '@progress/kendo-angular-grid';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastServiceService } from 'src/app/toast-service.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-document-summary-bulk-download',
  templateUrl: './document-summary-bulk-download.component.html',
  styleUrls: ['./document-summary-bulk-download.component.scss']
})
export class DocumentSummaryBulkDownloadComponent implements OnInit {
  document:Document[]=[];
  file: any;

  constructor(private docService: DocumentsService,
    public spinner:NgxSpinnerService,
    public toastService: ToastServiceService,
    public modalService: NgbModal,) { }

  ngOnInit(): void {
  }

  getFile(files: FileList){
    this.file= files.item(0);
    const formData = new FormData();
    formData.set('FileUpload', this.file);
    this.spinner.show();
    this.docService.AddFileDetails(formData).subscribe(result =>{
      this.toastService.success("Document uploaded successfully");
      this.spinner.hide();
      window.location.reload();
    });
  }

}
