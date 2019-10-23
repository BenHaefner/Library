import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Book } from './book';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  private libraryUrl = 'https://localhost:5001/api/LibraryData';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getLibrary (): Observable<Book[]>{
    return this.http.get<Book[]>(this.libraryUrl)
      .pipe(
        catchError(this.handleError<Book[]>('getLibrary', []))
      );
  }

  // TODO: See if there is any way to consolidate this with the function in google.service
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); 

      return of(result as T);
    };
  }
}
