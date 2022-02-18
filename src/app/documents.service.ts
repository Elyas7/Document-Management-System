import { Injectable } from '@angular/core';
import {Observable} from 'rxjs'
import { Document } from './document';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Tag } from './tags';
import { Category } from './category';
import { Resources } from './resources';

@Injectable({
  providedIn: 'root'
})


export class DocumentsService {
  url='https://localhost:44329/API/Demo';
  document!: Document;
  resources!: Resources;
  
  constructor(
    private http:HttpClient,
  ) { }

  AddFileDetails(data: FormData): Observable<any>{
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    const httpOptions = {
      headers: headers
    };
    return this.http.post<Document>(this.url + '/AddFileDetails/', data, httpOptions);
  }

  uploadDocument(Category: string,  Description: string, Tags: string): Observable<Document>{
    return this.http.post<Document>('https://localhost:44329/API/Demo/AddFileDetails',{
      "Category": Category,
      "Description": Description,
      "Tags": Tags,
    });
  }

  public downloadFile(Title: string):Observable<Blob>{
    return this.http.get(this.url + '/GetFile?Title=' + Title, {
      responseType: 'blob'
    })
  }

  apiUrl='https://localhost:44329/API/Demo';

  deletedocument(Document_ID: number[]){
    const httpOptions1 = {  
      headers: new HttpHeaders({  
        'Accept': 'application/json',
				'Content-Type': 'application/json'  
      }), 
      responseType: 'text' as 'json'
    };
    const data = {'Document_ID' : Document_ID};  
    return this.http.delete<any>(`https://localhost:44329/api/Documents/${Document_ID}`);
  }

  editDocumentByID(Document_ID: number, Category: string, Description: string, Tags: string){
    return this.http.put<Document>(`https://localhost:44329/api/Documents/${Document_ID}`, {
      "Document_ID": Document_ID,
      "Category": Category,
      "Description": Description,
      "Tags": Tags,
    })
  }

  

 

  getDocuments(document_id: number): Observable<Document>{
    return this.http.get<Document>(`https://localhost:44329/api/Documents/${document_id}`);
  }

  getDocumentsByID(): Observable<any[]>{
    return this.http.get<any[]>('https://localhost:44329/api/Documents');
  }


  getDocummentByTitle(Title: string): Observable<Document>{
    return this.http.get<Document>(`https://localhost:44370/api/Documents/${Title}`);
  }

  getAllTags():Observable<any>{
    return this.http.get('https://localhost:44365/api/Tags');
  }

  getAllCategory(): Observable<any>{
    return this.http.get<any>('https://localhost:44365/api/Categories');
  }

  

  getAlltagsByName(TagName: string): Observable<Tag>{
    return this.http.get<Tag>(`https://localhost:44365/api/Tags/${TagName}`);
  }





}
