import { Component, OnInit, ElementRef, Input, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators, FormGroup, FormArray, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DocumentsService } from 'src/app/documents.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastServiceService } from 'src/app/toast-service.service';
import { SupportedFileTypes } from 'src/app/file-supported';


@Component({
  selector: 'app-upload-documents',
  templateUrl: './upload-documents.component.html',
  styleUrls: ['./upload-documents.component.scss']
})
export class UploadDocumentsComponent implements OnInit {
  title: string = '';
  @Input() requestId!: number;
  @Input() scopedId!: number;
  @Input() applicationId!: number;
  @Input() TitleName!: string;
  document!: any[];
  files: any[]=[];
  resourceInfo:any[]=[];
  @ViewChild("fileDropRef", {static: false}) fileDropRef!:ElementRef;
  allSupportedFiles:any;
  supportedFileTypes: SupportedFileTypes = new SupportedFileTypes();
  fileUploadform!: FormGroup;
  dynamicItems!:FormArray;
  fileUploadValidation: any;
  submitted!: boolean;

  constructor( public activeModal:NgbActiveModal,
    public toastService: ToastServiceService,
    public formBuilder: FormBuilder,
    private docService: DocumentsService,
    public spinner: NgxSpinnerService,) { }

  ngOnInit(): void {
    this.title= 'Upload Documents - ' + this.TitleName;
    this.allSupportedFiles = this.supportedFileTypes.getallSupportedTypes();
    this.fileUploadValidation={
      dynamicItems: this.formBuilder.array([])
    };
    this.fileUploadform=this.formBuilder.group(
      this.fileUploadValidation
    );
    this.submitted=false;
  }
  clearDocuments(){
    if (this.files.length == 0){
      this.toastService.warning("No File Selected")
    }else{
      this.files=[];
      this.toastService.success("Files Cleared");
    }
  }
  deleteFile(fileIndex: number){
    this.files.splice(fileIndex, 1);
    this.dynamicItems.removeAt(fileIndex);
    this.toastService.success('File removed Successfully');

  }
  openFile(){
    this.fileDropRef.nativeElement.click();
  }

  fileBrowserHandler(files: any){
    this.dynamicItems= this.fileUploadform.get('dynamicItems') as FormArray;
    for (const item of files){
      let fileExt = item.name.split('.').pop();
      let separatedList = this.allSupportedFiles[0].extension.split(',');
      let findExt = separatedList.filter((x: any) => x == fileExt.toLowerCase());
      if (findExt.length > 0){
        item.progress = 0;
        this.files.push(item);  
      }else{
        this.toastService.error(item.name + ' ' + 'this is not supported');
      }
    }
    this.uploadFilesSimulator(0);
  }

  formatBytes(bytes: number, decimals: number){
    if (bytes == 0){
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB','YB'];
    const i = Math.floor(Math.log(bytes) /Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  uploadFilesSimulator(index: number){
    setTimeout(() =>{
      if (index === this.files.length){
        return;
      }
      else{
        const progressInterval = setInterval(()=>{
          if (this.files[index].progress === 100){
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
          }else{
            this.files[index].progress += 5;
          }
        }, 50);
      }
    }, 100);
  }
  validFileUploadSubmit(){
    this.submitted= true;
    if (!this.fileUploadform.valid){
      this.dynamicItems = this.fileUploadform.get('dynamicItems') as FormArray;
      return;
    }
    else{
      const formData: any = new FormData();
      for(const item of this.files){
        formData.append('files', item);
      }
      var resourceData = {
        applicationId: this.applicationId,
        Number: String(this.requestId)
      }
      const resource = JSON.stringify(resourceData);
      formData.append('references', resource);
      this.resourceInfo.push(resourceData);
      this.spinner.show();
      this.docService.getDocumentsByID(formData).subscribe((res) => {
        this.activeModal.dismiss();
        this.toastService.success("Documents uploaded successfully.");
        this.spinner.hide();
      }, (error) => {
        this.toastService.error(error);
        this.spinner.hide();
      });
    }
  }
  get form(){
    return this.fileUploadform.controls;
  }

}
