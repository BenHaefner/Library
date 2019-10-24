import { Component, OnInit } from '@angular/core';
import { GoogleService } from '../google.service';
import { LibraryService } from '../library.service';
import { Book } from '../book';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  public searched: Object[];
  
  constructor(
    private googleService: GoogleService, 
    private libraryService: LibraryService) { }

  ngOnInit() {
  }

  public getSearched(searchTerms:string): void {
    this.googleService.getSearched(searchTerms).subscribe(searched => this.searched = searched);
  }

  private addBook(book: Book): void {
    this.libraryService.addBook(book).subscribe();
  }

  public convertToBook(toConvert: any): void {
    let book: Book = {
      title: toConvert.title,
      author: toConvert.authors[0],
      isbn: toConvert.industryIdentifiers[0].identifier,
      thumbnail: toConvert.imageLinks.smallThumbnail,
      read: false,
    };

    this.addBook(book);
  }
}
