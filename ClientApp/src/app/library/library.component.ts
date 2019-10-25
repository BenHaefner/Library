import { Component, OnInit } from '@angular/core';
import { LibraryService } from '../library.service';
import { Book } from '../book';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {

  public Books: Book[]
  
  constructor(private libraryService: LibraryService) { }

  public ngOnInit() {
    this.getLibrary()
  }

  private getLibrary(): void {
    this.libraryService.getLibrary().subscribe(books => this.Books = books);
  }

  public removeBook(book: Book): void {
    //this.libraryService.deleteBook(book).subscribe();
    this.Books = this.Books.filter(b=> b !== book);
  }
}
