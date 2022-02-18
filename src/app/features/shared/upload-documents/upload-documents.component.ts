import { Component, OnInit, ElementRef, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators, FormGroup, FormArray, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DocumentsService } from 'src/app/documents.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastServiceService } from 'src/app/toast-service.service';
import { SupportedFileTypes } from 'src/app/file-supported';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { finalize, pipe, Subscription } from 'rxjs';
import { LookUpTypes } from 'src/app/lookup-type-enums';
import { Tag } from 'src/app/tags';
import { Resources } from 'src/app/resources';
import { observe } from '@progress/kendo-angular-grid/dist/es2015/utils';
import {   saveAs as importedSaveAs} from "file-saver"; 


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
  files: any[] = [];
  theFile: any=null;
  public messages!: string;
  resourceInfo:any[]=[];
  tagsInfo: any[]=[];
  categoryInfo: any[]=[];
  @ViewChild("fileDropRef") fileDropRef!:ElementRef;
  @ViewChild('resumeInput', {  static: true  }) resumeInput;  
  allSupportedFiles:any;
  supportedFileTypes: SupportedFileTypes = new SupportedFileTypes();
  tagsItems!: any[];
  fileUploadform!: FormGroup;
  dynamicItems!:FormArray;
  fileUploadValidation: any;
  categoryItems!: any[];
  customCategory: any;
  customTags: any;
  customDescription: any;
  categoryFormData: any[] = [];
  tagFormData: any[] = [];
  descriptionFormData: any[] = [];
  submitted!: boolean;
  selectedFile: File = null as any; 
  fileToUpload: File = null as any;
  saveFileForm: any;  
  category: string = '';
  description: string = '';
  tags: string = '';
  resultText: any[]=[];
  value!: string;
  count: number=0;

  



  constructor(private http: HttpClient,
    public activeModal: NgbActiveModal,
    public toastService: ToastServiceService,
    public formBuilder: FormBuilder,
    public docService: DocumentsService,
    public spinner: NgxSpinnerService,){ }


  ngOnInit(): void {
    this.title = 'Upload Documents - ' + this.TitleName;
    this.getAllTags();
    this.getAllCategory();
    this.allSupportedFiles = this.supportedFileTypes.getallSupportedTypes();
    this.fileUploadValidation = {
      dynamicItems: this.formBuilder.array([])
    };
    //validation here
    this.fileUploadform = this.formBuilder.group(
    this.fileUploadValidation
    );
    this.saveFileForm= this.formBuilder.group({
      category: ['', Validators.required],
      description: ['', Validators.required],
      tags: ['', Validators.required]
    },this.fileUploadValidation)
    this.submitted = false;
  }

  








  clearDocuments(){
    if (this.files.length == 0){
      this.toastService.warning("No File Selected");
    }else{
      this.files = [];
      this.toastService.success("Files Cleared");
    }
  }

  deleteFile(fileIndex: number){
    this.files.splice(fileIndex, 1);
    this.dynamicItems.removeAt(fileIndex);
    this.toastService.success('File Removed Successfull');
  }

  openFile(){
    this.fileDropRef.nativeElement.click();
  }

  fileBrowserHandler(files: any) {
    this.dynamicItems = this.fileUploadform.get('dynamicItems') as FormArray;
    for (const item of files) {
      let fileExt = item.name.split('.').pop();
      let separatedList = this.allSupportedFiles[0].extension.split(',');
      let findExt = separatedList.filter((x: any) => x == fileExt.toLowerCase());
      if (findExt.length > 0) {
        item.progress = 0;
        this.files.push(item);
        let itm = this.formBuilder.group({
          category: ['', null],
          tags: ['', null],
          description: ['', null]
        });
        this.dynamicItems.push(itm);
      } else {
        this.toastService.error(item.name + ' ' + 'this is not supported file');
      }
    }
    this.uploadFilesSimulator(0);
  }
  formatBytes(x) {
    const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    let l = 0, n = parseInt(x, 10) || 0;
    while(n >= 1024 && ++l){
        n = n/1024;
    }
    return(n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l]);
  }
  uploadFilesSimulator(index: number){
    setTimeout(() => {
      if (index === this.files.length){
        return;
      }
      else{
        const progressInterval = setInterval(() => {
          if (this.files[index].progress === 100) {
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
          } else {
            this.files[index].progress += 5;
          }
        }, 50);
      }
    }, 100);
  }

  validFileUploadSubmit(){
    this.submitted = true;
    if (!this.fileUploadform.valid){
      return;
    }
    else {
      const formData: any = new FormData();
      for (const item of this.files) {
        formData.append('FileUpload', item);
      }
      this.tagFormData.push(this.tags)
      formData.append('category', this.saveFileForm.value.category);
      formData.append('description', this.saveFileForm.value.description);
      formData.append('tags', this.saveFileForm.value.tags);

      this.spinner.show();
      this.docService.AddFileDetails(formData).subscribe(result =>{
          this.activeModal.dismiss();
          this.toastService.success("Documents uploaded successfully");
          this.spinner.hide();
          window.location.reload();
        });
      //this.docService.uploadDocument(this.Category, this.Description, this.Tags).subscribe(() =>{
        //alert("Successfully submitted");
      //})
    }
  }
  onChange(branchName: string, event){
    const tagFromArray=<FormArray>this.fileUploadform.controls['dynamicItems'];
    const checked = event.target.checked
    if (checked){
      tagFromArray.push(new FormControl(branchName))
    }else{
      let index = tagFromArray.controls.findIndex(x=>x.value==branchName)
      tagFromArray.removeAt(index);
    }
  }
  selectAll(){
      this.fileUploadform.get('tags')?.patchValue(this.tagsItems.map(x =>x.id,));
  }
  unselectAll() {
    this.fileUploadform.get('tags')!.patchValue([]);
  }
  toggleCheckAll(values: any) {
    if (values.currentTarget.checked) {
      this.selectAll();
    } else {
      this.unselectAll();
    }
  }
  get form(){
    return this.fileUploadform.controls;
  }
  getAllTags(){
    this.docService.getAllTags().subscribe((data: any)=>{
      this.tagsItems=data;
    })
  }
  getAllCategory(){
    this.docService.getAllCategory().subscribe((data: any) => {
      this.categoryItems=data;
    })
  }




}
