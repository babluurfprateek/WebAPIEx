import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {catchError , tap } from 'rxjs/operators';
import { Observable } from 'rxjs/observable';

import { Book } from './book';

@Injectable()
export class BookService {

  private bookUrl = './assets/books.json';


  constructor(private http: HttpClient) { }

  getBooks(): Observable<Book[]> {

    return this.http.get<Book[]>(this.bookUrl).pipe(tap(data => console.log('Data fetched:' + JSON.stringify(data))),
  catchError(this.handleError));

  }

private handleError(err: HttpErrorResponse) {
  // tslint:disable-next-line:prefer-const
  let errMsg: String = '';

  if (err.error instanceof Error) {
console.log('an error occured:', err.error.message);
errMsg = err.error.message;
} else {

    console.log('Backend returned code ${err.status}');
    errMsg = err.error.status;
  }
  return Observable.throw(errMsg);


}



}
