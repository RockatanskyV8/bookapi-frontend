import {Component, OnInit} from '@angular/core';
import {Book} from './book';
import {BookService} from './book.service'

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit{

  books: Book[];
  book = new Book();
  constructor(private _bookService: BookService){}

  ngOnInit(): void{
    this.getBooks();
  }

  getBooks(): void{
    this._bookService.getAllBooks()
      .subscribe((bookData) =>{
        this.books = bookData,
        console.log(bookData)
    }
    ,(error) => {
      console.log(error);
    })
  }

  addBook(): void{
    this._bookService.addBook(this.book)
      .subscribe((response) => {
        console.log(response);
        this.reset();
        this.getBooks();
      }, (error) => {
        console.log(error);
      });
  }

  private reset(){
    this.book.id = null;
    this.book.title = null;
    this.book.author = null;
  }

  deleteBook(bookId: string){
    this._bookService.deleteBook(bookId).subscribe((response) => {
        console.log(response);
        this.getBooks();
      }, (error) =>{
        console.log(error);
      });
  }

  getBookById(bookId : string){
    this._bookService.getBookById(bookId)
      .subscribe((bookData) => {
        this.book = bookData;
        this.getBooks();
      }, (error) => {
        console.log(error);
      })
  }

}
