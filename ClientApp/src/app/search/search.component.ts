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

  public addBook(toConvert: any): void {
    let book = this.convertToBook(toConvert);
    this.libraryService.addBook(book).subscribe();
  }

  private convertToBook(toConvert: any): Book {
    let book: Book = {
      title: toConvert.title ? toConvert.title : "Unknown",
      author: toConvert.authors ? toConvert.authors[0] : "Unknown",
      isbn: toConvert.industryIdentifiers ? toConvert.industryIdentifiers[0].identifier : "Unknown",
      thumbnail: toConvert.imageLinks ? toConvert.imageLinks.smallThumbnail : "Unknown",
      read: false,
    };

    return book;
  }
}
