import { Component, OnInit, ElementRef, HostListener, Renderer2, ViewChild} from '@angular/core';
import { animate } from '@angular/animations';
import { GridComponent, GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { SortDescriptor, orderBy } from '@progress/kendo-data-query';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { DocumentsService } from 'src/app/documents.service';
import { ToastServiceService } from 'src/app/toast-service.service';
import { CheckableSettings, CheckedState } from '@progress/kendo-angular-treeview';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import {MatDialog} from'@angular/material/dialog';
import { PopupModule } from '@progress/kendo-angular-popup';
import {UploadDocumentsComponent} from 'src/app/features/shared/upload-documents/upload-documents.component';
declare var require:any
const FileSaver=require('file-saver');
@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit {
  title!: string;
  viewTitle:string="Document Summary";
  gridItems!:Observable<GridDataResult>;
  data:any[]=[];
  multiple=true;
  sortDescriptor:SortDescriptor[]=[];
  show=true;
  showFiller=false;
  

  filtervalue = "";
  statuscheckedKeys: any[] = [];
  checkMode: any = "multiple";
  selectionMode: any = "single";
  duration = 250;
  animationType = "slide";
  direction = "down";

  allowUnsort = false;
  sort: SortDescriptor[] = [];
  showGridFilter: boolean = false;

  type = 'numeric';
  buttonCount = 3;
  info = true;
  pageSizes = [25, 50, 75, 100];
  previousNext = true;
  pageSize = 50;
  amShow: boolean = false;

  skip = 0;
  pageNumber: number = 1;
  totalPages: number = 1;
  statusShow: boolean = false;
  stageShow: boolean = false;

  selectedKeys = [];

  enableCheck = true;
  checkChildren = true;
  checkParents = true;
  checkOnClick = true;

  tagsFilter: string = "";
  tagsKey: string = "id";
  categoryKey: string = "id";
  tagsShow: boolean = false;
  categoryShow: boolean = false;
  tagsCheckedKeys: any[] = [];
  categoryCheckedKeys: any[] = [];
  tagsLookUpData: any[] = [];
  categoryLookUpData: any[] = [];
  categoreyUpdateLookupData: any[] = [];
  documentStatusLookupData: any[] = [];
  requestId: any;
  requesttype: any;
  pageRequestType!: string;
  address: string = "";
  categoryItems!: any[];
  selectedTagsItems: any[] = [4];
  selectedDocumentId!: string;
  
  @ViewChild("tagsAnchor") public tagsAnchor!: ElementRef;
  @ViewChild("categoryAnchor") public categoryAnchor!: ElementRef;
  @ViewChild("tagsPopUp", { read: ElementRef }) public tagsPopUp!: ElementRef;
  @ViewChild("categoryPopUp", { read: ElementRef }) public categoryPopUp!: ElementRef;

  showNotesPanel: boolean = false;
  showTaskPanel: boolean = false;
  showDocumentUploadPanel: boolean = false;
  showDocumentsReffPanel: boolean = false;
  @ViewChild("notesPanelbutton") public notesPanelbutton!: ElementRef;
  @ViewChild("taskPanelButton") public taskPanelButton!: ElementRef;
  @ViewChild("documentUploadButton") public documentUploadButton!: ElementRef;
  @ViewChild("documentRefPanelbutton") public documentRefPanelbutton!: ElementRef
  @ViewChild("documentGrid") documentGrid!: GridComponent

  documentURL!: string;
  resetFileEdit: boolean = false;
  isActionDisabled: boolean = false;
  resetBulkDownloads: boolean = false;
  bulkDownloads: string[] = [];
  fileExtension!: string;
  isFileNameValid: boolean = true;

  currentDocsStatusId!: number;
  public formGroup!: FormGroup;
  private editedRowIndex!: number;
  constructor(public spinner:NgxSpinnerService,
    private _Activatedroute:ActivatedRoute,
    private docService: DocumentsService,
    public toastService: ToastServiceService,
    private sanitizer: DomSanitizer,
    public modalService: NgbModal,
    private renderer: Renderer2,
    public dialog:MatDialog
    ) {
     }


  

  ngOnInit(): void {
    this.title='Documents Lists - Elyas Fekrat';
    this.getTagsData();

  }
  onTagsToggle() {
    this.categoryShow = false;
    this.tagsShow = !this.tagsShow;

  }
  onCategoryToggle() {
    this.tagsShow = false;
    this.categoryShow = !this.categoryShow;
  }


  loadGridItems(): void {
    let tagid = "";
    let i = 0;
    this.tagsCheckedKeys.forEach((element) => {
      tagid += element;
      if (i < this.tagsCheckedKeys.length - 1) {
        tagid += ',';
      }
      i++;
    });
    let categoryid = "";
    if (this.requesttype === 'wire') {
      //categoryid = '5';
      if (this.categoryCheckedKeys.includes(5) == false) {
        this.categoryCheckedKeys.push(5);
      }
      this.requesttype = '';
    }
    let j = 0;
    this.categoryCheckedKeys.forEach((element) => {
      categoryid += element;
      if (i < this.categoryCheckedKeys.length - 1) {
        categoryid += ',';
      }
      j++;
    });


  }

  public toggle(show?: boolean): void{
    this.tagsShow = show !== undefined ? show : !this.tagsShow;
  }



  uploadDocument(){
    const modalRef = this.modalService.open(UploadDocumentsComponent, {size: 'xl', backdrop: 'static'});
    modalRef.componentInstance.TitleName = this.address;
  }

  getTagsData(){
    this.docService.getAllTags().subscribe((res) =>{
      this.tagsLookUpData=res.data;

    });
  }

  selectAll(){
    this.formGroup.get('tags')?.patchValue(this.tagsLookUpData.map(x=>x.id));
  }

  unselectAll(){
    this.formGroup.get('tags')?.patchValue([]);
  }

  toggleCheckAll(values: any){
    if (values.currentTarget.chceked){
      this.selectAll();
    }else {
      this.unselectAll();
    }
  }

  isTagsChecked = (dataItem: any, index: string): CheckedState =>{
    if (this.containsTagsItem(dataItem)){
      if (dataItem.isChecked == undefined){
        dataItem.isChecked = "Checked";
      }else{
        dataItem.isChecked = "Checked";
      }
      return "checked";
    }
    if (this.isTagsIndeterminate(dataItem.items)){
      return "indeterminate";
    }
    dataItem.isChecked = "none";
    return "none";
  };

  containsTagsItem(item: any): boolean{
    return this.tagsCheckedKeys.indexOf(item[this.tagsKey]) > -1;
  }

  isTagsIndeterminate(items: any[] =[]): boolean{
    let idx = 0;
    let item;

    while ((item = items[idx])){
      if (this.isTagsIndeterminate(item.items) || this.containsTagsItem(item)){
        return true;
      }
      idx +=1;
    }
    return false;
  }

  getTagsId(dataItems: { id: any; }){
    this.selectedTagsItems =[];
    let docData = this.data.filter(x => x.id == dataItems.id);
    if (docData[docData.length -1].tags != null){
      let tags = docData[docData.length - 1].tags.split(',');
      let tagsList: any[] = [];
      tags.forEach((element: string) => {
        tagsList.push(element.trim())
      });
      tagsList.forEach(tagelemnt => {
        this.tagsLookUpData.filter(x => x.tagName == tagelemnt).forEach(element => {
          this.selectedTagsItems.push(element)
        })
      })

    }
  }

}


