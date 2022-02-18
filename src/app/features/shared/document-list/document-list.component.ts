import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
import { DocumentsService } from 'src/app/documents.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Document } from 'src/app/document';
import { saveAs as importedSaveAs } from "file-saver"; 

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
    this.documentService.getDocumentsByID().subscribe(document => this.document=document)
    this.getUploadedFiles();
  }
  getUploadedFiles(){

  }

  checkAllCheckBox(ev: any){
    this.document.forEach(x => x.checked = ev.target.chceked)
  }
  isAllCheckBoxChecked(){
    return this.document.every(d => d.checked);
  }

  delete(): void{
    const selectedDoc = this.document.filter(doc => doc.checked).map(d => d.Document_ID);
    console.log(selectedDoc);
    
    if (selectedDoc && selectedDoc.length > 0){
      this.documentService.deletedocument(selectedDoc as number[]).subscribe(res => {
        alert("Sucessfully Deleted");
        window.location.reload();
      }, err =>{
        alert("Something went wrong");
      });
    }else{
      alert("You must select at least one document");
    }
  }

  downloadFile(data){
    const FileName = data.Title;
    var Title=FileName;
    this.documentService.downloadFile(Title).subscribe((data)=>{
      importedSaveAs(data, Title)
    });
  }
}
