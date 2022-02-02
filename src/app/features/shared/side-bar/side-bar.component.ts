import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-SideBar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
isCollapsed: boolean = true;

  constructor() { }

  ngOnInit() {
  }

  toggleCollapse(isCollapsed: boolean) : void {
    this.isCollapsed = isCollapsed;
  }

}
