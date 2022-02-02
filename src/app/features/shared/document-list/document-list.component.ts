import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
import { Document } from 'src/app/document';
import { DocumentsService } from 'src/app/documents.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.scss']
})
export class DocumentListComponent implements OnInit {

@Input() scopedId!: number;
@Input() applicationId!: number;
@Input() TaskId!: number;
@Input() DocumentTitle!: string;
documentList!: any[];
pageSize = 1000;
pageNumber: number = 1;
documentURL!: string;
isLoading: boolean=true;
document: Document[] =[];

  constructor(private documentService: DocumentsService,) { }

  ngOnInit(): void {
    this.documentService.getDocuments()
    .subscribe(document => this.document=document)
    this.getUploadedFiles();
  }
  getUploadedFiles(){

  }
}
