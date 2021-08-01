import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse, HttpParams  } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
 
@Injectable({
    providedIn: "root",
})
export class ApiService {
  constructor(private http: HttpClient) { }   
  get(url: string): Observable<any> {
    return this.http.get(url);
  } 
}