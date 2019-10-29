import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Book } from './models/book';

@Injectable({
  providedIn: 'root'
})
export class GoogleService {

  constructor(public http: HttpClient) { }

  /**
   * A function to retrieve data from the Google Books API based upon
   * typed search terms.
   * 
   * @param searchTerms A string which contains the types search terms
   * to query Google Books for.
   */
  public getSearched(searchTerms: String): Observable<Object[]> {
    let url = 'https://www.googleapis.com/books/v1/volumes?q=' + searchTerms + '&maxResults=40';
    if (!searchTerms.trim()) {
      return of([]);
    }
    return this.http.get<Book[]>(url).pipe(
      catchError(this.handleError<Object[]>('searchHeroes', []))
    );
  }

  // TODO: Consolidate with the error handling in library.service, so there is less repeating data.
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
