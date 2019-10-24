import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Book } from './book';

@Injectable({
  providedIn: 'root'
})
export class GoogleService {

  constructor(public http: HttpClient) { }

  getSearched(searchTerms: String): Observable<Object[]> {
    let url = 'https://www.googleapis.com/books/v1/volumes?q=' + searchTerms + '&maxResults=40';
    if (!searchTerms.trim()) {
      return of([]);
    }
    return this.http.get<Book[]>(url).pipe(
      catchError(this.handleError<Object[]>('searchHeroes', []))
    );
  }

  // TODO: Consolidate with the error handling in library.service, so there is less repeating data.
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); 

      return of(result as T);
    };
  }
}
