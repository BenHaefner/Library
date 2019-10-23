import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoogleService {

  constructor(public http: HttpClient) { }

  getSearched(searchTerms: String): Observable<Object> {
    // TODO: Change this to be more uniform with the rest the other service
    let url = 'https://www.googleapis.com/books/v1/volumes?q=' + searchTerms + '&maxResults=40';
    return this.http.get(url).pipe(
      map((res) => {return res;}),
      catchError(this.handleError<Object>('getSearched', []))
    )
  }

  // TODO: Consolidate with the error handling in library.service, so there is less repeating data.
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); 

      return of(result as T);
    };
  }
}
