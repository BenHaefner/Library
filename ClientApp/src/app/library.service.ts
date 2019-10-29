import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Book } from './models/book';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  /**
   * A string which contains the URL to access the Library data from
   */
  private libraryUrl = window.location.origin + '/api/LibraryData';

  /**
   * A wrapper to define specific options during HTTP requests
   */
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  // GET
  /**
   * A function to request the whole library from the database.
   */
  public getLibrary (): Observable<Book[]> {
    return this.http.get<Book[]>(this.libraryUrl)
      .pipe(
        catchError(this.handleError<Book[]>('getLibrary', []))
      );
  }

  // GET
  /**
   * A function to request a specific book from the library database.
   * 
   * @param id Integer if of the book being requested.
   */
  public getBook (id: number): Observable<Book> {
    const url = `${this.libraryUrl}/${id}`;
    return this.http.get<Book>(url).pipe(
      catchError(this.handleError<Book>(`getBook id=${id}`))
    );
  }

  // POST
  /**
   * A function to add a new book the the library database.
   * 
   * @param book The book to be added to the database.
   */
  public addBook (book: Book): Observable<Book> {
    return this.http.post<Book>(this.libraryUrl, book, this.httpOptions).pipe(
      catchError(this.handleError<Book>('addBook'))
    );
  }

  // DELETE
  /**
   * A function to remove a book from the library database.
   * 
   * @param book The book to be removed from the database.
   */
  public deleteBook (book: Book | number): Observable<Book> {
    const id = typeof book === 'number' ? book : book.bookId;
    const url = `${this.libraryUrl}/${id}`;

    return this.http.delete<Book>(url, this.httpOptions).pipe(
      catchError(this.handleError<Book>('deleteBook'))
    );
  }

  // PUT
  /**
   * A function to update a book in the library database.
   * 
   * @param book The book to be updated in the database.
   */
  public updateBook (book: Book): Observable<any> {
    const url = `${this.libraryUrl}/${book.bookId}`;
    return this.http.put(url, book, this.httpOptions).pipe(
      catchError(this.handleError<any>('updateBook'))
    )
  }

  // TODO: See if there is any way to consolidate this with the function in google.service
  /**
   * A function to handle errors durring HTTP operations.
   * 
   * @param operation The operation being performed when an error was thrown
   * @param result The result of the operation being performed.
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); 

      return of(result as T);
    };
  }
}
