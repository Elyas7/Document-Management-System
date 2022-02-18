import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentSummaryBulkDownloadComponent } from './document-summary-bulk-download.component';

describe('DocumentSummaryBulkDownloadComponent', () => {
  let component: DocumentSummaryBulkDownloadComponent;
  let fixture: ComponentFixture<DocumentSummaryBulkDownloadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentSummaryBulkDownloadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentSummaryBulkDownloadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
