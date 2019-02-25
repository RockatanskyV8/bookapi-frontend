import { Injectable } from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';//import 'rxjs/add/operator/map'; //"~6.3.3",
//import { catchError } from 'rxjs/operators';
//import 'rxjs/add/operator/catch';
import { Book } from './book';

@Injectable()
export class BookService{

  constructor(private _httpService: Http){}

  getAllBooks(): Observable<Book[]>{
    return this._httpService.get("http://localhost:8080/bookapi/api/book")
    .pipe(map((response: any) => response.json()), catchError(error => {
        return throwError(error);
      }));
  }

  private handleError(error: Response){
    return throwError(error);
  }

  addBook(book : Book){
    let body = JSON.stringify(book);
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    if(book.id){
        return this._httpService.put("http://localhost:8080/bookapi/api/book/" + book.id, body, options);
    } else {
        return this._httpService.post("http://localhost:8080/bookapi/api/book", body, options);
    }
  }

  deleteBook(bookId : string){
    return this._httpService.delete("http://localhost:8080/bookapi/api/book/"+bookId);
  }

  getBookById(bookId : string){
    return this._httpService.get("http://localhost:8080/bookapi/api/book/"+bookId)
    .pipe(map((response: any) => response.json()), catchError(error => {
        return throwError(error);
      }));
  }
}


// getAllBooks(): Observable<Book[]>{
  //   return this._httpService.get("http://localhost:8080/bookapi/api/book")
  //   .pipe(map((response: any) => response.json()))
  //   .pipe(catchError(this.handleError));
  //   //catchError(this.handleError);
  // }

// getAllBooks(): Observable<Book[]>{
//   return this._httpService.get("http://localhost:8080/bookapi/api/book")
//   .pipe(map((response: any) => response.json()))
//   .catch(this.handleError);
// }
