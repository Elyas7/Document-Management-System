import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { SidebarComponent, TreeViewComponent } from '@syncfusion/ej2-angular-navigations';
// For MDB Angular Free


@Component({
  selector: 'app-secondary-sidebar',
  templateUrl: './secondary-sidebar.component.html',
  styleUrls: ['./secondary-sidebar.component.scss']
})
export class SecondarySidebarComponent implements OnInit {
@ViewChild('dockBar')
public dockBar!: SidebarComponent;
public enableDock: boolean = true;
public width: string = '329px';
public dockSize: string = '66px'; 
public height:string='100%';

public position:string='Right'

div1:boolean=true;
div2:boolean=true;
div3:boolean=true;

div4:boolean=true;


isShowDiv=false;

isShowDisc=true;

isShowButton=true;

isShowDiscriptionButton=false;

displayVal='';

div1Function(){
  this.div1=true;
  this.div2=false;
  this.div3=true;
  this.div4=true;
}

div2Function(){
  this.div2=true;
  this.div1=false;
  this.div3=false;
  this.div4=false
}

div3Function(){
  this.div3=true;
  this.div2=false;
  this.div1=false;
}




toggleClick(){
  this.dockBar.toggle();
}

toggleDisplayDiv(){
  this.isShowDiv=!this.isShowDiv;
}

toggleDisplayDisc(){
  this.isShowDisc=!this.isShowDisc;
}

toggleDisplayButton(){
  this.isShowButton=!this.isShowButton;
}

toggleDisplayDiscriptionButton(){
  this.isShowDiscriptionButton=!this.isShowDiscriptionButton;
}


getValue(val:string){
  this.displayVal=val
}



  

  constructor() { }

    

  ngOnInit(): void {
  }

}
