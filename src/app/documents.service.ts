import { Injectable } from '@angular/core';
import {Observable} from 'rxjs'
import {Document, Tag} from './document'
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DocumentsService {
  document!: Document;
  tag!:Tag
  constructor(
    private http:HttpClient,
  ) { }

  uploadDocument(Title: string):Observable<Document>{
    return this.http.post<Document>(`https://localhost:44370/api/Documents`,
    {
      "Title": Title
    });
  }

  

 

  getDocuments(): Observable<Document[]>{
    return this.http.get<Document[]>('https://localhost:44370/api/Documents');
  }

  getDocumentsByID(DocumentId: number): Observable<Document>{
    return this.http.get<Document>(`https://localhost:44370/api/Documents/${DocumentId}`);
  }


  getDocummentByTitle(Title: string): Observable<Document>{
    return this.http.get<Document>(`https://localhost:44370/api/Documents/${Title}`);
  }

  getAllTags(): Observable<Tag>{
    return this.http.get<Tag>(`https://localhost:44365/api/Tags`);
  }

}
