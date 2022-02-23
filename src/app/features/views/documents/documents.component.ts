import { Component, OnInit, ElementRef, HostListener, Renderer2, ViewChild} from '@angular/core';
import { animate } from '@angular/animations';
import { GridComponent, GridDataResult, PageChangeEvent, GridModule, DataBindingDirective, AddEvent, EditEvent, CellClickEvent } from '@progress/kendo-angular-grid';
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
import {LookUpTypes} from 'src/app/lookup-type-enums';
import {LookUpData} from 'src/app/lookup-data';
import {DatePipe} from '@angular/common';
import { Document } from 'src/app/document';
import { BrowserModule } from '@angular/platform-browser'
import { saveAs as importedSaveAs } from "file-saver"; 
import { Size } from '@progress/kendo-drawing/dist/npm/geometry';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { groupBy, GroupDescriptor } from "@progress/kendo-data-query";
import { CommonModule } from '@angular/common';  
import { DragDropUploadComponent } from '../../shared/drag-drop-upload/drag-drop-upload.component';
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

  document: Document[]=[];
  public gridView!: any[];
  public mySelection: string[] = [];
  

  filtervalue = "";
  statuscheckedKeys: any[] = [];
  checkMode: any = "multiple";
  selectionMode: any = "single";
  duration = 250;
  animationType = "slide";
  direction = "down";

  acusitionManagerLookUpData: LookUpData[] = [];
  allowUnsort = false;
  sort: SortDescriptor[] = [];
  columns!: any[];
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
  @ViewChild(DataBindingDirective) dataBinding!: DataBindingDirective;

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
  public formGroup: FormGroup | undefined;
  private editedRowIndex!: any;
  cacheService: any;
  gridHeaderColumns: any;

  selectedRow!: Number;
  checkboxes!: boolean[];

  file: any;
  form!:FormGroup;
  isSelected= true;
  isCategorySelected= false;


  constructor(public spinner:NgxSpinnerService,
    private _Activatedroute:ActivatedRoute,
    private docService: DocumentsService,
    public toastService: ToastServiceService,
    private sanitizer: DomSanitizer,
    public modalService: NgbModal,
    private renderer: Renderer2,
    public dialog:MatDialog,
    public datepipe: DatePipe,
    private router: Router
    ) {
      this.datepipe=new DatePipe('en-US');
     }

  listFilwDetails: any;
  public get isInEditingMode(): boolean {
    return this.editedRowIndex !== undefined || this.isNew;
  }


  

  ngOnInit(): void {
    this.title='Documents Lists - Elyas Fekrat';
    this.ReciveData();
    this.onChange();
    this.checkedIDs();
    this.getAllTags();
    this.getAllCategory();
  }

  toggleSelect(){
    this.isSelected = !this.isSelected;
    this.isCategorySelected = !this.isCategorySelected;
  }

  ReciveData(){
    this.gridView=this.listFilwDetails;
    this.docService.getDocumentsByID().subscribe(document => this.document=document);

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
      this.docService.deletedocument(selectedDoc as number[]).subscribe(res => {
        alert("Sucessfully deleted");
        window.location.reload();
      }, err =>{
        alert("Something went wrong");
      });
    }else{
      alert("You must select at least one document");
    }
  }


  resultText:any[]=[];
  checkedID: any[]=[];


  onChange(){
    this.resultText = this.document.filter((value, index)=>{
      return value.checked
    });
  }

  changeSelection(){
    this.onChange();
  }

  checkedIDs(){
    this.checkedID = []
    this.document.forEach((value, index)=>{
      if (value.checked){
        this.checkedID.push(value.Document_ID);
      }
    });
  }


  downloadFile(data){
    const FileName = data.Title;
    var Title=FileName;
    this.docService.downloadFile(Title).subscribe((data)=>{
      importedSaveAs(data, Title)
    });
  }


  iconList=[{type: "xlsx", icon:"fa fa-file-excel-o"},
            {type: "pdf", icon:"k-icon k-i-file-pdf"},
            {type: "docx", icon:"fa fa-file-word-o"}
          ];

  getFileExtension(dataItem){
    let ext = dataItem.split(".").pop();
    let obj = this.iconList.filter(row =>{
      if (row.type === ext){
        return true;
      }
    });
    if (obj.length > 0){
      let icon = obj[0].icon
      return icon;
    }else{
      return "";
    }
  }
  

  onTagsToggle() {
    this.categoryShow = false;
    this.tagsShow = !this.tagsShow;

  }
  onCategoryToggle() {
    this.tagsShow = false;
    this.categoryShow = !this.categoryShow;
  }

  showfilter(){
    if (this.showGridFilter == false){
      this.showGridFilter = true;
    }
    else{
      this.showGridFilter = false;
    }
  }

  refresh(){
    this.showGridFilter = false;
    this.ReciveData();
    
  }

  sortChange(sort: SortDescriptor[]): void{
    this.sort=sort;
  }

  detectPermissionChange(){

  }


  getFileName(dataItem): string {
    let splitted: any = dataItem.fileName.split(".");
    splitted.splice(-1, 1);
    let _fileName: string = "";
    for (var i = 0; i < splitted.length; i++) {
      if (i !== splitted.length - 1) {
        _fileName += splitted[i] + ".";
      } else {
        _fileName += splitted[i];
      }
    }

    return _fileName;
  }
  public toggle(show?: boolean): void{
    this.tagsShow = show !== undefined ? show : !this.tagsShow;
  }

  createFormGroup = (dataItem)=> new FormGroup({
    Document_ID: new FormControl(dataItem.Document_ID),
    Title: new FormControl(dataItem.Title),
    Category: new FormControl(dataItem.Category),
    Description: new FormControl(dataItem.Description),
    Tags: new FormControl(dataItem.Tags),
    
  });

 
  @ViewChild('grid') private grid!: GridComponent;
  private isNew!: boolean;
  

  public addHandler({sender}: AddEvent): void{
    this.closeEditor(sender);

    this.formGroup = this.createFormGroup({
      Document_ID: false,
      Title: "",
      Category: "",
      Description: "",
      Tags: "",
    });
    this.isNew = true;
    this.grid.addRow(this.formGroup);
  }

  public editHandler({sender,columnIndex, dataItem, rowIndex}: CellClickEvent): void {
    if (this.formGroup && !this.formGroup.valid) {
      return;
    }
    this.selectedDocumentId ='';
    this.closeEditor(sender);
    this.formGroup = this.createFormGroup(dataItem);
    this.selectedDocumentId = dataItem.Document_ID;
    this.editedRowIndex = rowIndex;
    
    sender.editRow(rowIndex, this.formGroup, {columnIndex });
  }

  public cancelHandler({sender, rowIndex}){
    this.closeEditor(sender, rowIndex);
  }


  private closeEditor(grid, rowIndex= this.editedRowIndex){
    this.isNew = false;
    grid.closeRow(rowIndex);
    this.editedRowIndex = undefined;
    this.formGroup=undefined;
  }



  

  





  uploadDocument(){
    const modalRef = this.modalService.open(UploadDocumentsComponent, {size: 'xl', backdrop: 'static',});
    modalRef.componentInstance.TitleName = this.address;
  }
  Document_ID!: number;
  Title!: string;
  Category!: string;
  Description!: string;
  Tags!: string;
  files:any[]=[];



  open(allFiles: File[]): void{
    console.log('evt: ', allFiles);
    
    const filesAmount = allFiles.length;
    for (let i=0; i< filesAmount; i++){
      const file = allFiles[i];
      this.files.push(file);
      const modalRef = this.modalService.open(DragDropUploadComponent, {size: 'xl', backdrop: 'static'});
      modalRef.componentInstance.files=this.files;
    }

  }


  getTagsData(){
    this.docService.getAllTags().subscribe((res) =>{
    this.tagsLookUpData=res.data;

    });
  }

  selectAll(){
    this.formGroup?.get('tags')?.patchValue(this.tagsLookUpData.map(x=>x.id));
  }

  unselectAll(){
    this.formGroup?.get('tags')?.patchValue([]);
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
  tagsItems!: any[];

  getAllTags(){
    this.docService.getAllTags().subscribe((data: any)=>{
      this.tagsItems=data;
    })
  }
  CategoryItems!: any[];

  getAllCategory(){
    this.docService.getAllCategory().subscribe((data1: any) => {
      this.CategoryItems=data1;
    })
  }
 

  

}


