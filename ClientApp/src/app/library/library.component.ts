import { Component, OnInit } from '@angular/core';
import { LibraryService } from '../library.service';
import { Book } from '../book';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {

  public books: Book[]
  
  constructor(private libraryService: LibraryService) { }

  public ngOnInit() {
    this.getLibrary()
  }

  private getLibrary(): void {
    this.libraryService.getLibrary().subscribe(books => this.books = books);
  }

  public removeBook(book: Book): void {
    this.books = this.books.filter(b=> b !== book);
  }
}
