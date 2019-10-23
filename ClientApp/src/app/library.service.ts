import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Book } from './book';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  private libraryUrl = window.location.origin + '/api/LibraryData';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  // GET
  getLibrary (): Observable<Book[]>{
    return this.http.get<Book[]>(this.libraryUrl)
      .pipe(
        catchError(this.handleError<Book[]>('getLibrary', []))
      );
  }

  // POST
  addBook (book: Book): Observable<Book> {
    return this.http.post<Book>(this.libraryUrl, book, this.httpOptions).pipe(
      catchError(this.handleError<Book>('addBook'))
    );
  }

  // DELETE
  deleteBook (book: Book | number): Observable<Book> {
    const id = typeof book === 'number' ? book : book.id;
    const url = `${this.libraryUrl}/${id}`;

    return this.http.delete<Book>(url, this.httpOptions).pipe(
      catchError(this.handleError<Book>('deleteBook'))
    );
  }

  // PUT
  updateBook (book: Book): Observable<any> {
    return this.http.put(this.libraryUrl, book, this.httpOptions).pipe(
      catchError(this.handleError<any>('updateBook'))
    )
  }

  // TODO: See if there is any way to consolidate this with the function in google.service
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); 

      return of(result as T);
    };
  }
}
