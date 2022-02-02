import { NgModule } from '@angular/core';
import { BrowserModule , Title } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExcelModule,GridModule } from '@progress/kendo-angular-grid';
import {TreeViewModule} from '@progress/kendo-angular-treeview'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NgxSpinnerModule} from 'ngx-spinner';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {SidebarModule} from '@syncfusion/ej2-angular-navigations';
import { TopNavComponent } from './features/shared/top-nav/top-nav.component';
import { SideBarComponent } from './features/shared/side-bar/side-bar.component';
import { DocumentsComponent } from './features/views/documents/documents.component';
import { DropDownsModule, DropDownListModule } from '@progress/kendo-angular-dropdowns';
import { DocumentListComponent } from './features/shared/document-list/document-list.component';
import { MatIconModule} from '@angular/material/icon';
import { SecondarySidebarComponent } from './features/shared/secondary-sidebar/secondary-sidebar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { UploadDocumentsComponent } from './features/shared/upload-documents/upload-documents.component';
import { PogressBarComponent } from './features/shared/upload-documents/pogress-bar/pogress-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PopupModule } from '@progress/kendo-angular-popup';





@NgModule({
  declarations: [
    AppComponent,
    TopNavComponent,
    SideBarComponent,
    DocumentsComponent,
    DocumentListComponent,
    SecondarySidebarComponent,
    UploadDocumentsComponent,
    PogressBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GridModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    NgbModule,
    AppRoutingModule,
    SidebarModule,
    TreeViewModule,
    DropDownsModule,
    MatIconModule,
    MatSidenavModule,
    MatButtonModule,
    MatDialogModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    PopupModule,
    DropDownListModule,
    ExcelModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
