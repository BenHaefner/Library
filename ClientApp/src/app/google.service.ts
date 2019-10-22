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
    let url = 'https://www.googleapis.com/books/v1/volumes?q=' + searchTerms + '&maxResults=40';
    return this.http.get(url).pipe(
      map((res) => {return res;}),
      catchError(this.handleError<Object>('getSearched', []))
    )
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
