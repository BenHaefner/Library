import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { Book } from './models/book';

@Injectable({
  providedIn: 'root'
})
export class GoogleService {

  /**
   * A string that represents the input to the search box.
   */
  private searchTerms = '';

  /**
   * An event emitter to signal to the child component that search terms have been
   * updated and the search component should search.
   */
  public searchTermsBehavior = new EventEmitter();

  constructor(public http: HttpClient) { }

  /**
   * A function to save the value of the search box, and tell the child component to
   * update.
   *
   * @param terms A string representing the value of the search box.
   */
  public setSearchTerms(terms: string): void {
    this.searchTerms = terms;
    this.searchTermsBehavior.emit();
  }

  /**
   * A function to retrieve data from the Google Books API based upon
   * typed search terms.
   *
   * @param searchTerms A string which contains the types search terms
   * to query Google Books for.
   */
  public getSearched(): Observable<Object[]> {
    const url = 'https://www.googleapis.com/books/v1/volumes?q=' + this.searchTerms + '&maxResults=40';
    if (!this.searchTerms.trim()) {
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
