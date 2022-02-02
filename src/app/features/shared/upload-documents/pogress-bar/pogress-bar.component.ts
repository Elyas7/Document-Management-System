import { Component, OnInit, Input } from '@angular/core';
import { inputs } from '@syncfusion/ej2-angular-navigations/src/accordion/accordion.component';

@Component({
  selector: 'app-pogress-bar',
  templateUrl: './pogress-bar.component.html',
  styleUrls: ['./pogress-bar.component.scss']
})
export class PogressBarComponent implements OnInit {
  @Input() progress = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
